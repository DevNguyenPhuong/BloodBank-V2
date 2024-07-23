import { Empty } from "antd";
import { useSelector } from "react-redux";
import DonateActivitiesItem from "../Activity/DonateAcitivitiesItem";
function DonateUserActivityList() {
  const { searchActivities } = useSelector((store) => store.user);

  if (searchActivities?.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-4">
        {searchActivities.map((item, index) => {
          return <DonateActivitiesItem {...item} key={item.id} type="user" />;
        })}
      </div>
    </>
  );
}

export default DonateUserActivityList;
