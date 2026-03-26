export const formatVnd = (value: number) => {
  const formatter = new Intl.NumberFormat('vi-VN');
  return `${formatter.format(Math.round(value))}đ`;
};

