import { Empty, Result, Skeleton, Table } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";
import { useGetDonorByAcitivities } from "./useGetDonorByActivityId";
import DonorsTableRow from "./DonorsTableRow";
import ApproveDonorModal from "./ApproveDonorModal";

const columns = [
  {
    title: "Họ và tên",
    dataIndex: "name",
    width: 1,
  },
  {
    title: "Nhóm máu",
    dataIndex: "bloodType",
    width: 1,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    width: 1,
  },
];

const colHasAction = [
  {
    title: "Họ và tên",
    dataIndex: "name",
    width: 1,
  },
  {
    title: "Nhóm máu",
    dataIndex: "bloodType",
    width: 1,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    width: 1,
  },
  {
    title: "Hành động",
    key: "action",
    width: 1,
  },
];

function DonorsTable({ type }) {
  const { id } = useParams();
  const { donors, isLoading, error } = useGetDonorByAcitivities(id);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  function handleAccept(data) {
    setFormData({ ...data });
    setOpen(true);
  }

  if (isLoading) return <Skeleton active className="shadow-lg mt-10 p-8" />;

  if (error)
    return (
      <Result
        className="mt-8"
        status="error"
        title="Tải dữ liệu không thành công"
        subTitle="Xin vui lòng kiểm tra lại tình trạng Internet của bạn."
      ></Result>
    );

  if (donors?.data.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  return (
    <>
      <Table
        bordered
        className="shadow-lg mt-10"
        columns={type === "processing" ? colHasAction : columns}
        dataSource={donors?.data.map((item) => {
          return { ...item, key: item.donorId };
        })}
        pagination={{
          pageSize: PAGE_SIZE,
        }}
        scroll={{
          y: 480,
        }}
        components={{
          body: {
            row: (props) => (
              <DonorsTableRow props={props} type={type} onOpen={handleAccept} />
            ),
          },
        }}
      />
      <ApproveDonorModal
        {...formData}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default DonorsTable;
