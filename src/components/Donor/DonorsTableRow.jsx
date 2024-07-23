import { Button, Skeleton } from "antd";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useGetDonorInfoById } from "./useGetDonorInfoById";
import { useRejectDonor } from "./useRejectDonor";

const DonorsTableRow = ({ props, type, onOpen }) => {
  const donorId = props?.children[0]?.props?.record?.donorId;
  const sessionId = props?.children[0]?.props?.record?.id;
  const { donor, isLoading } = useGetDonorInfoById(donorId);
  const { rejectDonor, isPending } = useRejectDonor();

  function handleCancel() {
    rejectDonor(sessionId);
  }

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
        {type === "processing" ? (
          <td>
            <div className="flex gap-4 flex-wrap">
              <Button
                disabled={true}
                onClick={handleCancel}
                danger
                icon={<FaTimes />}
              >
                <p className="md:inline hidden">Huỷ</p>
              </Button>
              <Button
                disabled={true}
                onClick={() => onOpen()}
                type="primary"
                icon={<FaCheck />}
              >
                <p className="md:inline hidden ">Chấp nhận</p>
              </Button>
            </div>
          </td>
        ) : null}
      </tr>
    );

  const { bloodType, phone, fullName } = donor;
  return (
    <tr>
      <td>{fullName}</td>
      <td>{bloodType}</td>
      <td>{phone}</td>
      {type === "processing" ? (
        <td>
          <div className="flex gap-4 flex-wrap">
            <Button
              loading={isPending}
              disabled={isPending}
              onClick={handleCancel}
              danger
              icon={<FaTimes />}
            >
              <p className="md:inline hidden">Huỷ</p>
            </Button>
            <Button
              disabled={isPending}
              onClick={() => onOpen({ donorId, sessionId })}
              type="primary"
              icon={<FaCheck />}
            >
              <p className="md:inline hidden ">Chấp nhận</p>
            </Button>
          </div>
        </td>
      ) : null}
    </tr>
  );
};

export default DonorsTableRow;
