import { Button, DatePicker, Form, Tooltip } from "antd";
import { format } from "date-fns";
import { FaSearch } from "react-icons/fa";
import { useSearchActivities } from "../Activity/useSearchActivities";
import { useDispatch } from "react-redux";
import { setSearchDay } from "../Auth/userSlice";
const { RangePicker } = DatePicker;

function SearchActivityForm() {
  const [form] = Form.useForm();
  const { searchActivities, isPending } = useSearchActivities();
  const dispatch = useDispatch();
  async function handleSubmit({ rangeDate }) {
    dispatch(
      setSearchDay({
        startDay: format(rangeDate[0].$d, "yyyy-MM-dd"),
        endDay: format(rangeDate[1].$d, "yyyy-MM-dd"),
      })
    );
    searchActivities({
      startDay: format(rangeDate[0].$d, "yyyy-MM-dd"),
      endDay: format(rangeDate[1].$d, "yyyy-MM-dd"),
    });
  }

  return (
    <Form
      size="large"
      form={form}
      layout="horizontal"
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 28,
      }}
      name="search"
      className="flex flex-col items-center max-w-[40rem] m-auto bg-slate-200 p-4 rounded-lg text-2xl"
      onFinish={(values) => handleSubmit(values)}
    >
      <div className="py-8 text-slate-500 font-bold">
        Bạn cần đặt lịch vào thời gian nào ?
      </div>

      <Form.Item
        name="rangeDate"
        label={
          <p className="text-xl text-zinc-600 font-bold">Thời gian diễn ra</p>
        }
        rules={[
          {
            required: true,
            message: "Vui lòng xác định khoảng thời gian!",
          },
        ]}
      >
        <RangePicker
          disabled={isPending}
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          format={"DD/MM/YYYY"}
        />
      </Form.Item>

      <Form.Item className="mt-8">
        <Tooltip title="Tìm kiếm" color={"#108ee9"}>
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            loading={isPending}
            className="font-bold"
            icon={<FaSearch />}
          >
            Tìm kiếm
          </Button>
        </Tooltip>
      </Form.Item>
    </Form>
  );
}

export default SearchActivityForm;
