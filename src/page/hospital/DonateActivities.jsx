import React, { useState } from "react";
import { Button } from "antd";
import CreateActivityModal from "../../components/Activity/CreateAcitivityModal";

import DonateActivitiesList from "../../components/Activity/DonateActivitiesList";
import { FaPlus } from "react-icons/fa";

function DonateActivities() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        type="primary"
        className="flex "
        onClick={() => setOpen(!open)}
        icon={<FaPlus />}
      >
        Thêm hoạt động
      </Button>

      <DonateActivitiesList />
      <CreateActivityModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default DonateActivities;
