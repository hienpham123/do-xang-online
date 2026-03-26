export const formatDateTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

