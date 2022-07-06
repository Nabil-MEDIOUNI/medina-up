const months = [
  '-',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getFullDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

export const formatDateLong = (date) => {
  const d = new Date(date);
  return `${months[d.getMonth() + 1]} ${d.getDate()}, ${d.getFullYear()}`;
};

export const getSignUPDate = (ep) => `${new Date(parseInt(ep.createdAt, 10)).getDate()} ${months[(new Date(parseInt(ep.createdAt, 10)).getMonth()) + 1]}`;

export const PostedAt = (date) => {
  const now = new Date();
  const posted_at = new Date(parseInt(date, 10));

  const getHour = Math.abs(now.getHours() - posted_at.getHours());
  const getMinutes = Math.abs(now.getMinutes() - posted_at.getMinutes());
  const getSeconds = Math.abs(now.getSeconds() - posted_at.getSeconds());

  const getDay = Math.abs(now.getDate() - posted_at.getDate());
  const getMonth = Math.abs(now.getMonth() - posted_at.getMonth());
  const getFullYear = Math.abs(now.getFullYear() - posted_at.getFullYear());

  if (getSeconds < 60 && getMinutes === 0 && getDay === 0 && getMonth === 0 && getFullYear === 0) return 'Just now';
  if (getMinutes < 60 && getHour < 1 && getDay === 0 && getMonth === 0 && getFullYear === 0) return `${getMinutes} min ago`;
  if (getHour === 0 && (getDay > 0 || getMonth > 0 || getFullYear > 0)) return `${getDay}d`;

  if (getDay === 1 && getMonth === 0 && getFullYear === 0) {
    return `Yesterday at ${posted_at.getHours()}:${posted_at.getMinutes()}`;
  }

  if (getDay > 1 || getMonth > 0) {
    if (getFullYear > 0) {
      return `${
        months[posted_at.getMonth() + 1]
      } ${posted_at.getDate()}, ${posted_at.getFullYear()} at ${posted_at.getHours()}:${posted_at.getMinutes()} `;
    }
    return `${
      months[posted_at.getMonth() + 1]
    } ${posted_at.getDate()} at ${posted_at.getHours()}:${posted_at.getMinutes()}`;
  }

  return `${getHour}h`;
};

export const CommenteddAt = (date) => {
  const now = new Date();
  const posted_at = new Date(parseInt(date, 10));

  const getHour = Math.abs(now.getHours() - posted_at.getHours());
  const getMinutes = Math.abs(now.getMinutes() - posted_at.getMinutes());
  const getSeconds = Math.abs(now.getSeconds() - posted_at.getSeconds());

  const getDay = Math.abs(now.getDate() - posted_at.getDate());
  const getMonth = Math.abs(now.getMonth() - posted_at.getMonth());
  const getFullYear = Math.abs(now.getFullYear() - posted_at.getFullYear());

  if (getSeconds < 60 && getMinutes === 0 && getDay === 0 && getMonth === 0 && getFullYear === 0) return `${getSeconds}sec`;
  if (getMinutes < 60 && getHour < 1 && getDay === 0 && getMonth === 0 && getFullYear === 0) return `${getMinutes}m`;
  if (getFullYear > 0) return `${getFullYear}year`;
  if (getMonth > 0) return `${getMonth}mo`;
  if (getDay > 0) return `${getDay}d`;

  return `${getHour}h`;
};
