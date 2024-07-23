import { Button, Skeleton } from "antd";
import { format } from "date-fns";
import { useCancelUserActivity } from "./useCancelUserActivity";
import { useGetDetailActivity } from "./useGetDetailActivity";

function ProcessingUserActivityItem({ id: sessionId, activityId }) {
  const { activityInfo, isLoading } = useGetDetailActivity({
    id: activityId,
    status: 0,
  });
  const { cancelActivity, isPending } = useCancelUserActivity();

  if (isLoading)
    return (
      <Skeleton
        className="rounded-lg p-8 shadow-xl max-w-md md:max-w-2xl px-2 lg:basis-[49%] md:basis-3/4 mb-6"
        active
      />
    );

  const { dateActivity, numberIsRegistration, quantity, operatingHour } =
    activityInfo;
  const hospitalData = activityInfo.data;

  function handleCancel() {
    cancelActivity(sessionId);
  }

  return (
    <>
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
                    <span className="text-gray-900 f">
                      Ngày diễn ra:{" "}
                      {format(new Date(dateActivity), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <div className=" text-left text-md text-gray-700 ">
                    <span className="text-gray-900 f">
                      Thời gian: {operatingHour}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 max-lg:mt-4">
                  <Button
                    loading={isPending}
                    disabled={isPending}
                    onClick={handleCancel}
                    type="primary"
                    className="w-full"
                    danger
                  >
                    Huỷ
                  </Button>
                </div>
              </div>
              <div className="text-left mt-3 text-gray-600 text-sm md:text-base">
                <strong>
                  {numberIsRegistration}/{quantity}
                </strong>{" "}
                người đã đăng kí hoạt động này
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProcessingUserActivityItem;
