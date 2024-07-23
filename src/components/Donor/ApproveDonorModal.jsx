import React from "react";
import { Modal, Form, Select, InputNumber } from "antd";
import { createPortal } from "react-dom";

import { useSelector } from "react-redux";
import { useApproveDonor } from "./useApproveDonor";

const { Option } = Select;
function ApproveDonorModal({ open, onClose, donorId, sessionId }) {
  const { userId, fullName } = useSelector((store) => store.user);
  const { approveDonor, isPending } = useApproveDonor(onClose);

  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    approveDonor({
      ...values,
      donorId,
      sessionId,
      hospitalId: userId,
      hospitalName: fullName,
    });
    form.resetFields();
  };
  return createPortal(
    <Modal
      maskClosable={!isPending}
      className="text-center"
      title="Xác nhận hiến máu"
      cancelText="Huỷ"
      okText="Xác nhận"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      open={open}
      confirmLoading={isPending}
      onCancel={onClose}
      modalRender={(dom) => (
        <Form
          layout="horizontal"
          form={form}
          name="basic"
          clearOnDestroy
          onFinish={(values) => handleSubmit(values)}
          wrapperCol={{ span: 19 }}
          labelCol={{ span: 6 }}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        className="mt-8"
        name="bloodType"
        label="Nhóm máu"
        rules={[{ required: true, message: "Xin vui lòng chọn nhóm máu!" }]}
      >
        <Select
          disabled={isPending}
          className="text-left"
          placeholder="Chọn nhóm máu"
        >
          <Option value="A+">
            A <sup>+</sup>
          </Option>
          <Option value="A-">
            A <sup>-</sup>
          </Option>
          <Option value="B+">
            B <sup>+</sup>
          </Option>
          <Option value="B-">
            B <sup>-</sup>
          </Option>
          <Option value="O+">
            O <sup>+</sup>
          </Option>
          <Option value="O-">
            O <sup>-</sup>
          </Option>
          <Option value="AB+">
            AB <sup>+</sup>
          </Option>
          <Option value="AB-">
            AB <sup>-</sup>
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Số lượng"
        className="pb-4"
        name="quantity"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số lượng!",
          },
        ]}
      >
        <InputNumber
          disabled={isPending}
          min={1}
          max={100}
          className="w-full"
        />
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default ApproveDonorModal;
