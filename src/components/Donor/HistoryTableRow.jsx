import { Skeleton } from "antd";
import { format } from "date-fns";
import { useHospital } from "../Hospital/useGetHospital";

const HistoryTableRow = ({ props }) => {
  const donationDate = props?.children[0]?.props?.record?.donationDate;
  const quantity = props?.children[0]?.props?.record?.quantity;
  const hospitalId = props?.children[0]?.props?.record?.hospitalId;
  const { hospital, isLoading } = useHospital(hospitalId);

  if (isLoading)
    return (
      <tr>
        <td>
          <Skeleton.Input active />
        </td>
        <td>
          <Skeleton.Input active />
        </td>
        <td>
          <Skeleton.Input active />
        </td>
      </tr>
    );

  return (
    <tr>
      <td>{hospital?.fullName}</td>
      <td>{format(donationDate, "dd/MM/yyyy")}</td>
      <td>{quantity} ml</td>
    </tr>
  );
};

export default HistoryTableRow;
