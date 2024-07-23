import { Button, Skeleton } from "antd";
import { useHospital } from "./useGetHospital";
import { useAcceptRequestBlood } from "./useAcceptRequestBlood";
import { useSelector } from "react-redux";

function BloodRequestItem({ id, bloodType, hospitalId, quantity }) {
  const { userId } = useSelector((store) => store.user);
  console.log(hospitalId);
  const { hospital: hospitalData, isLoading } = useHospital(hospitalId);
  const { acceptRequestBlood, isPending } = useAcceptRequestBlood();

  function handleAccept() {
    acceptRequestBlood({ requestedId: id, hospitalAccept: userId });
  }

  if (isLoading)
    return (
      <Skeleton
        className="rounded-lg p-8 shadow-xl max-w-md md:max-w-2xl px-2 lg:basis-[49%] md:basis-3/4 mb-6"
        active
      />
    );

  return (
    <div className="max-w-md md:max-w-2xl px-2 lg:basis-[49%] md:basis-3/4 relative">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
        <div className="flex items-center justify-center bg-transparent text-center p-5">
          <img
            className="w-32"
            width="50%"
            src={"https://static.giotmauvang.org.vn/ihpstatic/LOGO/CTD.png"}
            alt="CTD"
          />
        </div>

        <div className="flex-1">
          <div className="p-4 md:p-5">
            <p className="font-bold text-xl md:text-lg text-left">
              {hospitalData?.fullName}
            </p>
          </div>
          <div className="p-4 md:p-5 bg-gray-100 w-full ">
            <div className="sm:flex sm:justify-between sm:items-center">
              <div className="flex flex-col gap-1 ">
                <div className=" text-left text-md text-gray-700">
                  <span className=" text-gray-900 f">
                    Địa chỉ: {hospitalData?.address}
                  </span>
                </div>
                <div className="text-left text-md text-gray-700">
                  <span className="text-gray-900 f">Nhóm máu: {bloodType}</span>
                </div>
                <div className=" text-left text-md text-gray-700 ">
                  <span className="text-gray-900 f">
                    Số lượng: {quantity} ml
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 max-lg:mt-4">
                <div className="w-full">
                  <Button
                    disabled={hospitalId === userId || isPending}
                    onClick={handleAccept}
                    type="primary"
                    className="w-full"
                  >
                    Chấp nhận
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodRequestItem;
