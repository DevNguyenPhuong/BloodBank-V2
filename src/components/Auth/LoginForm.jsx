import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Button } from "antd";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [form] = Form.useForm();
  const [, setFormValues] = useState();
  const { login, isPending } = useLogin();

  useEffect(() => {
    form.setFieldsValue({
      role: "0",
    });
  }, [form]);

  const handleLogin = (values) => {
    console.log({
      ...values,
      role: Number(values.role),
    });
    login({
      ...values,
      role: Number(values.role),
    });
    setFormValues({
      userName: "",
      password: "",
      role: 0,
    });
  };

  return (
    <Form
      wrapperCol={{ span: 20 }}
      className="w-[600px] px-16"
      layout="horizontal"
      form={form}
      name="login"
      clearOnDestroy
      onFinish={(values) => handleLogin(values)}
    >
      <Form.Item
        className="mb-8 mt-8 "
        label="Tài khoản"
        name="userName"
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
        name="role"
        className="collection-create-form_last-form-item text-left"
        wrapperCol={{
          offset: 4,
        }}
        rules={[
          {
            required: true,
            message: "Vui lòng xác định người dùng!",
          },
        ]}
      >
        <Radio.Group disabled={isPending}>
          <Radio value="0">Người nguyên góp</Radio>
          <Radio value="1">Bệnh viện</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        className=" collection-create-form_last-form-item "
        wrapperCol={{
          offset: 15,
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
            Đăng nhập
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
