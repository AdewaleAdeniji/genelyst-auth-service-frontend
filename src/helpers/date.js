import moment from "moment";

export function formatRelativeTime(dateString) {
  const now = moment();
  const inputDate = moment(dateString);

  const diffMinutes = now.diff(inputDate, 'minutes');
  const diffHours = now.diff(inputDate, 'hours');
  const diffDays = now.diff(inputDate, 'days');

  if (diffMinutes < 1) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return inputDate.format('YYYY-MM-DD HH:mm:ss');
  }
}