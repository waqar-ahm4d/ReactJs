export const coupons = {
  SAVE10: {
    code: "SAVE10",
    type: "percentage",
    value: 10,
  },

  SAVE20: {
    code: "SAVE20",
    type: "percentage",
    value: 20,
  },

  FREESHIP: {
    code: "FREESHIP",
    type: "shipping",
    value: 100,
  },

  WELCOME500: {
    code: "WELCOME500",
    type: "fixed",
    value: 500,
  },
};

export function getCoupon(code) {
  return coupons[code.trim().toUpperCase()] ?? null
}