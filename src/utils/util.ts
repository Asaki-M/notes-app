export const isCurrentYear = (d: Date): boolean => {
  const date1 = new Date(d), date2 = new Date()
  if (isNaN(date1.getTime())) return false;
  return date1.getFullYear() === date2.getFullYear()
}

export const formatDate = (dateStr: string, format: string = 'DD MMM YYYY HH:mm'): string => {
  if (!dateStr) return '';

  const date = new Date(dateStr);

  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  // only consider English
  const monthShort = date.toLocaleString('en-US', { month: 'short' })
  const month = date.getMonth() + 1
  const year = date.getFullYear();

  let formattedDate = format
    .replace('mm', minute.toString().padStart(2, '0'))
    .replace('HH', hour.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('D', day.toString())
    .replace('MMM', monthShort)
    .replace('MM', month.toString());

  if (isCurrentYear(date)) {
    formattedDate = formattedDate.replace('YYYY', '').trim(); // 去掉年份并修正多余的空格
  } else {
    formattedDate = formattedDate.replace('YYYY', year.toString());
  }

  return formattedDate;
};