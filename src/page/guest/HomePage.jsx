import { Button, DatePicker, Form, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  FaHandHoldingMedical,
  FaHome,
  FaHospital,
  FaInfo,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import background from "../../assets/freepik-export-20240518235644yHzw.png";
import SearchActivityForm from "../../components/User/SearchActivityForm";
import DonateUserActivityList from "../../components/Activity/DonateUserActivityList";

const { Header, Content, Footer } = Layout;
function HomePage() {
  const [select, setSelect] = useState([""]);
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

  return (
    <Layout>
      <Header className="flex items-center ">
        <div className="demo-logo text-gray-50 flex items-center justify-center gap-4 text-md font-bold opacity-80 hover:opacity-100 transition-all duration-300 hover:cursor-pointer">
          <FaHandHoldingMedical />
          <span>Ngân hàng máu</span>
        </div>
        <Menu
          className="flex flex-1 min-w-0 justify-end  text-md font-bold "
          theme="dark"
          mode="horizontal"
          selectedKeys={select}
          onClick={({ key }) => {
            if (key === "/user" || key === "/hospital") {
              setSelect([""]);
              navigate(key);
            } else {
              setSelect([`${key}`]);
              navigate(key);
            }
          }}
          items={[
            {
              key: "/",
              label: "Trang chủ",
              icon: <FaHome />,
            },
            {
              key: "/information",
              label: "Giới thiệu",
              icon: <FaInfo />,
            },
            {
              key: "/user",
              label: "Người dùng",
              icon: <FaUser />,
            },
            {
              key: "/hospital",
              label: "Bệnh viện",
              icon: <FaHospital />,
            },
          ]}
        />
      </Header>
      <Content>
        <div className="bg-zinc-200 w-full h-[500px] flex items-center pt-12">
          <div className="flex-[2] flex flex-col gap-4 justify-center items-center">
            <div className="font-bold text-4xl uppercase text-slate-700">
              Ngân hàng máu trung ương
            </div>
            <div className="text-3xl text-slate-500">
              - Quyên góp <span>máu</span> để cứu hàng triệu sinh mạng -
            </div>
          </div>
          <img className=" w-72 h-auto object-cover" src={background} alt="" />
        </div>
        <div className="mt-16 mx-12">
          <SearchActivityForm />
          <DonateUserActivityList />
        </div>
      </Content>
      <Footer className="text-center mt-12 bg-zinc-200 font-bold text-slate-400">
        Ngân hàng máu ©{new Date().getFullYear()} tạo bởi P-H
      </Footer>
    </Layout>
  );
}

export default HomePage;
