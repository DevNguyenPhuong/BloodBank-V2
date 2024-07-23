import { useSelector } from "react-redux";
import { useGetBloodsByHospitalId } from "../../components/Hospital/useGetBloodsByHospitalId";
import { Empty, Result, Spin } from "antd";

function Home() {
  const { userId } = useSelector((store) => store.user);
  const { bloods, isLoading, error } = useGetBloodsByHospitalId({
    id: userId,
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

  if (bloods.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  return (
    <div className="bg-gray-200 rounded-lg  p-8 ">
      <div className="grid gap-4 lg:gap-8 md:grid-cols-3 ">
        {bloods.map((item, index) => {
          return (
            <div
              key={item.bloodType}
              className="relative p-6 rounded-2xl bg-white shadow "
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 ">
                  <span>Nhóm máu</span>
                </div>
                <div className="text-3xl ">{item.bloodType}</div>
                <div className="flex items-center space-2x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                  <span>Số lượng: {item.totalBloodQuantity}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
