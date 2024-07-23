import { Empty, Result, Skeleton, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { PAGE_SIZE } from "../../utils/constant";
import HistoryTableRow from "./HistoryTableRow";
import { useGetDonateHistory } from "./useGetDonateHistory";

const columns = [
  {
    title: "Tên bệnh viện",
    dataIndex: "name",
    width: 1,
  },
  {
    title: "Ngày hiến máu",
    dataIndex: "bloodType",
    width: 1,
  },
  {
    title: "Số lượng",
    dataIndex: "phone",
    width: 1,
  },
];

function HistoryTable() {
  const { userId } = useSelector((store) => store.user);
  const { histories, isLoading, error } = useGetDonateHistory(userId);

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

  if (histories.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  console.log(histories);

  return (
    <>
      <Table
        bordered
        className="shadow-lg mt-10"
        columns={columns}
        dataSource={histories.map((item) => {
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
            row: (props) => <HistoryTableRow props={props} />,
          },
        }}
      />
    </>
  );
}

export default HistoryTable;
