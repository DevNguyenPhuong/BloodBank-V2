import {
  Button,
  DatePicker,
  Drawer,
  Form,
  InputNumber,
  Select,
  Space,
} from "antd";

import React from "react";
import { useSelector } from "react-redux";
import { useUpdateDonateActivity } from "./useUpdateDonateAcitivity";
import { format } from "date-fns";
const { Option } = Select;

function UpdateDonateActivityDrawer({
  id,
  open,
  onClose,
  dateActivity,
  quantity,
  operatingHour,
}) {
  const [form] = Form.useForm();
  const { updateActivity, isPending } = useUpdateDonateActivity(onClose);
  const { userId } = useSelector((store) => store.user);

  const handleSubmit = (values) => {
    updateActivity({
      data: {
        ...values,
        dateActivity: format(values?.dateActivity?.$d, "yyyy-MM-dd'T'00:00:00"),
        hospitalId: userId,
      },
      id,
    });
  };
  const handeReset = () => {};

  return (
    <>
      <Drawer
        title="Cập nhập hoạt động hiến máu"
        width={540}
        onClose={onClose}
        open={open}
        form={form}
        loading={isPending}
        maskClosable={!isPending}
        className="[&_body]:pb-20"
        extra={
          <Space>
            <Button disabled={isPending} onClick={() => handeReset()}>
              Huỷ
            </Button>
            <Button
              disabled={isPending}
              type="primary"
              htmlType="submit"
              form="update-form"
            >
              Cập nhập
            </Button>
          </Space>
        }
      >
        <div className="flex  flex-col">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            name="update-form"
            clearOnDestroy
            initialValues={{ quantity: quantity }}
            onFinish={(values) => handleSubmit(values)}
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
                placeholder="Chọn ngày diễn ra"
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
              <InputNumber value={1233} min={1} max={1000} className="w-full" />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
}

export default UpdateDonateActivityDrawer;
