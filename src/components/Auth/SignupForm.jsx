import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";

import { useSignup } from "./useSignup";

const { Option } = Select;

function SignupForm() {
  const [form] = Form.useForm();
  const { signup, isPending } = useSignup();

  useEffect(() => {
    form.setFieldsValue({
      prefix: "84",
    });
  }, [form]);

  const handleSignup = (values) => {
    signup(values);
    form.resetFields();
  };

  return (
    <Form
      wrapperCol={{ span: 20 }}
      labelCol={{ span: 7 }}
      className="w-[600px] px-16 mt-8"
      layout="horizontal"
      form={form}
      name="signup"
      clearOnDestroy
      onFinish={(values) => handleSignup(values)}
    >
      <Form.Item
        label="Họ và tên"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ và tên!",
          },
        ]}
      >
        <Input disabled={isPending} />
      </Form.Item>

      <Form.Item
        label="Tài khoản"
        name="username"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên người dùng!",
          },
        ]}
      >
        <Input disabled={isPending} />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
        ]}
      >
        <Input.Password disabled={isPending} />
      </Form.Item>

      <Form.Item
        label="Xác nhận mật khẩu"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu không khớp!"));
            },
          }),
        ]}
      >
        <Input.Password disabled={isPending} />
      </Form.Item>

      <Form.Item
        name="bloodType"
        label="Nhóm máu"
        rules={[{ required: true, message: "Xin vui lòng chọn nhóm máu!" }]}
      >
        <Select placeholder="Chọn nhóm máu của bạn" disabled={isPending}>
          <Option value="none">không biết</Option>
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
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input
          addonBefore={
            <Form.Item name="prefix" noStyle>
              <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
                <Option value="85">+85</Option>
              </Select>
            </Form.Item>
          }
          style={{ width: "100%" }}
          disabled={isPending}
        />
      </Form.Item>

      <Form.Item
        className="collection-create-form_last-form-item "
        wrapperCol={{
          offset: 16,
        }}
      >
        <div className="flex gap-3">
          <Button
            htmlType="button"
            onClick={() => form.resetFields()}
            disabled={isPending}
          >
            Huỷ
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="middle"
            loading={isPending}
          >
            Đăng ký
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default SignupForm;
