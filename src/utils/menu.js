export const hospitalMenu = [
  {
    label: "Trang chủ",
    key: "/hospital/home",
  },
  {
    label: "Hoạt động",
    key: "/hospital/activities",
    children: [
      {
        label: "Đang chờ đăng ký",
        key: `/hospital/activities/donate`,
      },
      {
        label: "Đang diễn ra",
        key: `/hospital/activities/processing`,
      },
    ],
  },
  {
    label: "Quản lý máu",
    key: "/hospital/blood",
    children: [
      {
        label: "Yêu cầu máu",
        key: `/hospital/blood/request`,
      },
      {
        label: "Lịch sử",
        key: "/hospital/histories",
      },
    ],
  },
];

export const userMenu = [
  {
    label: "Trang chủ",
    key: "/user/home",
  },
  {
    label: "Hoạt động",
    key: "/user/activity",
    children: [
      {
        label: "Đang đăng ký",
        key: "/user/activities",
      },
      {
        label: "Lịch sử hiến máu",
        key: "/user/histories",
      },
    ],
  },
];
