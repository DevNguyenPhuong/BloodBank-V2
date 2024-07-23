import React, { useState } from "react";

import RequestBloodModal from "../../components/Hospital/RequestBloodModal";
import { Button } from "antd";
import { FaPaperPlane } from "react-icons/fa";
import BloodRequestList from "../../components/Hospital/BloodRequestList";

// có chức năng yêu cầu máu
function BloodRequest() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        className="flex "
        onClick={() => setOpen(!open)}
        icon={<FaPaperPlane />}
      >
        Gửi yêu cầu
      </Button>
      <BloodRequestList />
      <RequestBloodModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default BloodRequest;
