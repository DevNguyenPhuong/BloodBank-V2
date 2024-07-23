import React from "react";
import { Modal, Form, Select, InputNumber } from "antd";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useRequireBlood } from "./useRequiredBlood";

const { Option } = Select;
function RequestBloodModal({ open, onClose }) {
  const { userId } = useSelector((store) => store.user);
  const { requireBlood, isPending } = useRequireBlood(onClose);
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    requireBlood({ ...values, hospitalId: userId });
  };

  return createPortal(
    <Modal
      maskClosable={!isPending}
      className="text-center"
      title="Yêu cầu máu"
      cancelText="Huỷ"
      okText="Yêu cầu"
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
          labelCol={{ span: 5 }}
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
        label="Đơn vị máu"
        className="pb-4"
        name="quantity"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số đơn vị máu!",
          },
        ]}
      >
        <InputNumber
          disabled={isPending}
          min={100}
          max={500}
          className="w-full"
          placeholder="Vui lòng nhập số đơn vị máu"
        />
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default RequestBloodModal;
