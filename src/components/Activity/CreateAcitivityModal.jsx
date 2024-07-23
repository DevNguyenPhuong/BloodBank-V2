import React from "react";
import { Modal, Form, Select, DatePicker, InputNumber } from "antd";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useCreateActivity } from "./useCreateDonateActivity";

const { Option } = Select;
function CreateActivityModal({ open, onClose }) {
  const { userId } = useSelector((store) => store.user);
  const { createActivity, isPending } = useCreateActivity(onClose);
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    createActivity({
      ...values,
      dateActivity: format(values?.dateActivity?.$d, "yyyy-MM-dd'T'00:00:00"),
      hospitalId: userId,
    });
    form.resetFields();
  };
  return createPortal(
    <Modal
      maskClosable={!isPending}
      className="text-center"
      title="Thêm hoạt động hiến máu"
      cancelText="Huỷ"
      okText="Thêm"
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
          labelCol={{ span: 7 }}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        className="mt-8"
        label="Ngày diễn ra"
        name="dateActivity"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn ngày diễn ra!",
          },
        ]}
      >
        <DatePicker
          disabled={isPending}
          format={"DD/MM/YYYY"}
          className="w-full "
        />
      </Form.Item>

      <Form.Item
        name="operatingHour"
        label="Thời gian diễn ra"
        rules={[
          {
            required: true,
            message: "Xin vui lòng xác nhận thời gian diễn ra!",
          },
        ]}
      >
        <Select
          disabled={isPending}
          placeholder="Chọn khung giờ thích hợp"
          className="text-left"
        >
          <Option value="8:00 - 9:00">8:00 - 9:00</Option>
          <Option value="9:00 - 11:00">9:00 - 11:00</Option>
          <Option value="11:00 - 13:00">11:00 - 13:00</Option>
          <Option value="13:00 - 15:00">13:00 - 15:00</Option>
          <Option value="15:00 - 17:00">15:00 - 17:00</Option>
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
          max={1000}
          className="w-full"
        />
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default CreateActivityModal;
