import { Empty, Result, Spin } from "antd";
import BloodRequestItem from "./BloodRequestItem";
import { useGetBloodRequest } from "./useGetBloodRequest";

function BloodRequestList() {
  const { requestBloods, isLoading, error } = useGetBloodRequest({
    status: 0,
    page: 1,
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

  if (requestBloods.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-4">
        {requestBloods?.map((item) => {
          return <BloodRequestItem {...item} key={item.id} />;
        })}
      </div>
    </>
  );
}

export default BloodRequestList;
