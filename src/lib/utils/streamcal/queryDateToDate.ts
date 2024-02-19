import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const queryDateToDate = (queryDate: string) => {
  const nowDate = dayjs();
  const targetDate = queryDate || nowDate.startOf('day').toISOString();
  return dayjs(targetDate);
};

export default queryDateToDate;
