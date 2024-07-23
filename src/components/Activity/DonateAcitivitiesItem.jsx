import { CloseOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useHospital } from "../Hospital/useGetHospital";
import { useBookingActivity } from "./useBookingActivity";
import { useDeleteDonateActivity } from "./useDeleteDonateActivity";
import { useSearchActivities } from "./useSearchActivities";
function DonateAcitivitiesItem({
  onOpen,
  id,
  hospitalId,
  dateActivity,
  numberIsRegistration,
  quantity,
  operatingHour,
  type,
}) {
  const { hospital: hospitalData, isLoading } = useHospital(hospitalId);
  const { userId, isAuthenticated } = useSelector((store) => store.user);
  const { bookActivity, isPending: loadingBooking } = useBookingActivity({
    activityId: id,
  });
  const { startDay, endDay } = useSelector((store) => store.user);
  const { searchActivities, isPending: isSearching } = useSearchActivities();
  const navigate = useNavigate();
  const { deleteDonateActivity, isPending } = useDeleteDonateActivity();

  if (isLoading)
    return (
      <Skeleton
        className="rounded-lg p-8 shadow-xl max-w-md md:max-w-2xl px-2 lg:basis-[49%] md:basis-3/4 mb-6"
        active
      />
    );

  function handleDelete() {
    deleteDonateActivity(id);
  }

  function handleBookingFromUser() {
    if (!isAuthenticated) {
      navigate("/authenticate");
    } else {
      bookActivity({ donorId: userId, activityId: id, status: 0 });
      searchActivities({ startDay, endDay, status: 0 });
    }
  }

  return (
    <>
      <div className="max-w-md md:max-w-2xl px-2 lg:basis-[49%] md:basis-3/4 relative">
        {type !== "user" && type !== "processing" && (
          <button
            disabled={isPending}
            onClick={handleDelete}
            className="absolute right-6 top-4 hover:cursor-pointer hover:text-red-500 transition-all duration-200"
          >
            <CloseOutlined />
          </button>
        )}

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
                    <span className=" text-gray-900 f">Địa chỉ: </span>
                    {hospitalData?.address}
                  </div>
                  <div className="text-left text-md text-gray-700">
                    <span className="text-gray-900 f">Ngày diễn ra: </span>
                    {format(new Date(dateActivity), "dd/MM/yyyy")}
                  </div>
                  <div className=" text-left text-md text-gray-700 ">
                    <span className="text-gray-900 f">Thời gian: </span>
                    {operatingHour}
                  </div>
                </div>
                <div className="flex flex-col gap-4 max-lg:mt-4">
                  {type !== "user" && type !== "processing" && (
                    <Button
                      onClick={() =>
                        onOpen({
                          id,
                          quantity,
                          operatingHour,
                          dateActivity,
                        })
                      }
                      disabled={isPending}
                    >
                      Chỉnh sửa
                    </Button>
                  )}

                  {type !== "user" && (
                    <div className="w-full">
                      <Link
                        to={`/hospital/activities/${
                          type === "processing" ? "processing" : "donate"
                        }/${id}`}
                      >
                        <Button
                          loading={isPending}
                          disabled={isPending}
                          type="primary"
                          className="w-full"
                        >
                          Chi tiết
                        </Button>
                      </Link>
                    </div>
                  )}
                  {type === "user" && (
                    <Button
                      loading={loadingBooking}
                      disabled={loadingBooking}
                      type="primary"
                      className="w-full"
                      onClick={handleBookingFromUser}
                    >
                      Đăng ký
                    </Button>
                  )}
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

export default DonateAcitivitiesItem;
