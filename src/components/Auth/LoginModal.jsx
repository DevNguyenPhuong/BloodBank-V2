import React, { useState } from "react";
import { Modal, Form, Input, Radio } from "antd";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal } from "./userSlice";
import { useLogin } from "./useLogin";

function LoginModal({ visible }) {
  const { isOpenModal } = useSelector((store) => store.user);
  const [open] = useState(visible);
  const [form] = Form.useForm();
  const [, setFormValues] = useState();
  const { login, isPending } = useLogin();
  const dispatch = useDispatch();

  const handleLogin = (values) => {
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

  return createPortal(
    <Modal
      className="text-center"
      title="ĐĂNG NHẬP"
      cancelText="Huỷ"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      open={isOpenModal || open}
      confirmLoading={isPending}
      onCancel={() => dispatch(closeLoginModal())}
      modalRender={(dom) => (
        <Form
          initialvalues={{
            role: "user",
          }}
          layout="horizontal"
          form={form}
          name="basic"
          clearOnDestroy
          onFinish={(values) => handleLogin(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        className="mb-8 mt-8"
        label="Tài khoản"
        name="userName"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên người dùng!",
          },
        ]}
      >
        <Input />
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
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        className="collection-create-form_last-form-item text-left"
        wrapperCol={{
          offset: 4,
        }}
      >
        <Radio.Group>
          <Radio value="0">Người nguyên góp</Radio>
          <Radio value="1">Bệnh viện</Radio>
        </Radio.Group>
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default LoginModal;
