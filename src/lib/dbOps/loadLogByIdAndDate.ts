import channelModelsGlobal from 'src/global/channelModels';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const loadLogByIdAndDate = async (channelId: string, date: string) => {
  const response = {
    statusCode: null,
    message: null,
    data: null,
  };
  try {
    const targetDate = date || dayjs().startOf('day').toISOString();
    console.log(targetDate);
    const channelModelObjById = channelModelsGlobal.channelModelsArray.find(
      (obj) => obj.channelId === channelId,
    );
    const targetDateObj = dayjs(targetDate);

    const channelLogByDate = await channelModelObjById.channelModel.find({
      timestamp: {
        $gte: targetDateObj.valueOf(),
        $lt: targetDateObj.valueOf() + 24 * 60 * 60000,
      },
    });
    const message =
      channelLogByDate.length > 0 ? null : '해당 일자의 데이터가 없습니다.';
    response.statusCode = 200;
    response.message = message;
    response.data = channelLogByDate;
    return response;
  } catch (err) {
    console.log(`BAD REQUEST: ${err}`);
    response.statusCode = 400;
    response.message = '잘못된 요청입니다.';
    return response;
  }
};

export default loadLogByIdAndDate;
