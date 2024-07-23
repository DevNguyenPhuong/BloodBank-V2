import { Empty, Spin } from "antd";
import { useGetAcitivitiesByHospitalId } from "./useGetActivitiesByHospitalId";
import { useSelector } from "react-redux";
import DonateAcitivitiesItem from "./DonateAcitivitiesItem";
import { useState } from "react";
import UpdateDonateActivityDrawer from "./UpdateDonateActivityDrawer";

function DonateActivitiesList({ type }) {
  const { userId } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [curActivityData, setCurActicityData] = useState({});
  const { hospitalDonateActivities, isLoading } = useGetAcitivitiesByHospitalId(
    userId,
    0
  );

  function handleOpenDrawer(data) {
    setCurActicityData(data);
    setOpen(true);
  }

  if (isLoading)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Spin tip="Đang tải dữ liệu" size="large">
          <div></div>
        </Spin>
      </div>
    );

  if (hospitalDonateActivities?.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-4">
        {hospitalDonateActivities.map((item, index) => {
          return (
            <DonateAcitivitiesItem
              {...item}
              open={open}
              onOpen={handleOpenDrawer}
              key={item.id}
              type={type}
            />
          );
        })}
      </div>
      <UpdateDonateActivityDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        {...curActivityData}
      />
    </>
  );
}

export default DonateActivitiesList;
