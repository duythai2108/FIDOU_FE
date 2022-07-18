const ORDER_STATUS = {
  0: {
    title: "Đang tìm ứng cử viên",
    state: "success",
  },
  1: {
    title: "Đang tiến hành",
    state: "process",
  },
  2: {
    title: "Đã hoàn thành",
    state: "success",
  },
};

const TRANSACTION_TYPE = {
  0: "RECEIVE",
  1: "SEND",
  2: "DEPOSIT",
  3: "REFUNDED",
  4: "UNLOCK",
};

export { ORDER_STATUS, TRANSACTION_TYPE };
