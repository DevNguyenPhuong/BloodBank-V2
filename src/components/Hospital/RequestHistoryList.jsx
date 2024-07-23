import { Empty, Result, Spin } from "antd";
import { useSelector } from "react-redux";
import { useGetRequestHistories } from "./useGetRequestHistories";
import RequestHistoryItem from "./RequestHistoryItem";
import RequestHistoryItemEmpty from "./RequestHistoryItemEmpty";

function RequestHistoryList() {
  const { userId } = useSelector((store) => store.user);
  const { requestHistories, isLoading, error } = useGetRequestHistories({
    hospitalId: userId,
  });

  if (isLoading)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Spin tip="Đang tải dữ liệu" size="large">
          <div></div>
        </Spin>
      </div>
    );

  if (error)
    return (
      <Result
        className="mt-8"
        status="error"
        title="Tải dữ liệu không thành công"
        subTitle="Xin vui lòng kiểm tra lại tình trạng Internet của bạn."
      ></Result>
    );

  if (requestHistories.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-4">
        {requestHistories?.map((item) => {
          if (!item.hospitalAccept)
            return <RequestHistoryItemEmpty {...item} />;
          else return <RequestHistoryItem {...item} key={item.id} />;
        })}
      </div>
    </>
  );
}

export default RequestHistoryList;
