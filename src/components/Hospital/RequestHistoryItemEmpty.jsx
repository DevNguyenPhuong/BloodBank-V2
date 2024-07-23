function RequestHistoryItemEmpty({ bloodType, quantity }) {
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
                Tên bệnh viện gửi: Chưa có
              </p>
            </div>
            <div className="p-4 md:p-5 bg-gray-100 w-full ">
              <div className="sm:flex sm:justify-between sm:items-center">
                <div className="flex flex-col gap-1 ">
                  <div className=" text-left text-md text-gray-700">
                    Địa chỉ: chưa có
                  </div>
                  <div className="text-left text-md text-gray-700">
                    <span className="text-gray-900 f">
                      Nhóm máu: {bloodType}
                    </span>
                  </div>
                  <div className=" text-left text-md text-gray-700 ">
                    <span className="text-gray-900 f">
                      Số lượng: {quantity}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 max-lg:mt-4">
                  <div className="w-full">
                    Trạng thái: <span className="text-red-600">đang chờ</span>
                  </div>
                </div>
              </div>
              <div className="text-left mt-3 text-gray-600 text-sm md:text-base"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestHistoryItemEmpty;
