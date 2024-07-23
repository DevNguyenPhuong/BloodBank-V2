import { Button } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DonorsTable from "../../components/Donor/DonorsTable";

function DonateActivity() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        className="flex"
        type="primary"
        icon={<FaArrowLeft />}
      >
        Trở lại
      </Button>

      <DonorsTable />
    </div>
  );
}

export default DonateActivity;
