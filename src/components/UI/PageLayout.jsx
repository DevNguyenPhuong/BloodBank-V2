import { Avatar, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  FaHandHoldingMedical,
  FaHome,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { hospitalMenu, userMenu } from "../../utils/menu";
import { useLogout } from "../Auth/useLogout";

const { Header, Content, Sider } = Layout;

function PageLayout() {
  const { roleId } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useLogout();
  const menu = roleId === 0 ? userMenu : hospitalMenu;
  const layoutConfig = {
    true: "ml-[80px] transition-ml duration-300 ",
    false: "ml-[200px] transition-ml duration-300 ",
  };
  const smallWidth = "ml-[80px] transition-ml duration-300 ";
  const bigWidth = "ml-[200px] transition-ml duration-300 ";

  return (
    <Layout hasSider>
      <Sider
        className="!overflow-auto !h-screen !fixed !left-0 !top-0  !bottom-0 z-20"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className=" h-16 flex items-center justify-center font-bold [&_svg]:text-2xl text-slate-300">
          <FaHandHoldingMedical />
        </div>
        <Menu
          className="font-bold"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={menu[0].path}
          items={menu}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>

      <Layout className={`${layoutConfig[collapsed]}  `}>
        <Header className="fixed w-full top-0 left-0 z-10 flex items-center  font-bold ">
          <Menu
            className="flex-1 min-w-0  justify-end"
            theme="dark"
            mode="horizontal"
            selectedKeys={["2"]}
            onClick={({ key }) => {
              if (key === "/logout") logout();
              if (key === "/") navigate("/");
            }}
            items={[
              {
                label: (
                  <div className="flex justify-center items-center gap-3">
                    <Avatar
                      className="bg-zinc-300"
                      size={32}
                      icon={<FaUser />}
                    />
                    <span>Anonymous</span>
                  </div>
                ),
                key: "avatar",
              },
              {
                key: "/",
                label: "Ngân hàng máu",
                icon: <FaHome />,
              },
              {
                label: "Đăng xuất",
                key: "/logout",
                icon: <FaSignOutAlt />,
              },
            ]}
          />
        </Header>

        <Content className="m-6 mx-4">
          <div className="mt-16 p-6 text-center bg-gray-50 rounded-lg min-h-screen">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
