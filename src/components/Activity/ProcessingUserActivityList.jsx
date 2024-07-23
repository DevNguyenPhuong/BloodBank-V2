import { Empty, Result, Spin } from "antd";
import { useSelector } from "react-redux";

import { useGetDonateActivitiesByUserId } from "./useGetDonateActivitiesByUserId";
import ProcessingUserActivityItem from "./ProcessingUserActivityItem";

function ProcessingUserActivityList() {
  const { userId } = useSelector((store) => store.user);
  const { activities, isLoading, error } =
    useGetDonateActivitiesByUserId(userId);
  console.log(activities?.data);

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

  if (activities?.data.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  return (
    <div className="mt-12 flex flex-wrap gap-4">
      {activities?.data.map((item, index) => {
        return <ProcessingUserActivityItem key={item.id} {...item} />;
      })}
    </div>
  );
}

export default ProcessingUserActivityList;
