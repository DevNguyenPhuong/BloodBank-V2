import React from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import LoginForm from "../../components/Auth/LoginForm";

import SignupForm from "../../components/Auth/SignupForm";
import { useNavigate } from "react-router-dom";

function Authencicate() {
  const navigate = useNavigate();
  return (
    <div className="  min-h-screen flex justify-center items-center">
      <Tabs
        animated={{ inkBar: true, tabPane: true }}
        centered
        className="shadow-2xl  h-1/2"
        defaultActiveKey="2"
        onTabClick={(key) => {
          if (key === "/") navigate("/");
        }}
        items={[
          {
            key: "login",
            label: `Đăng nhập`,
            children: <LoginForm />,
            icon: <LoginOutlined />,
          },
          {
            key: "signup",
            label: `Đăng ký`,
            children: <SignupForm />,
            icon: <UserAddOutlined />,
          },
          {
            key: "/",
            label: `Trang chủ`,
            icon: <HomeOutlined />,
          },
        ]}
      />
    </div>
  );
}

export default Authencicate;
