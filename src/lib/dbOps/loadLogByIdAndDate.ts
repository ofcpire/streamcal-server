import channelModelsGlobal from 'src/global/channelModels';

const loadLogByIdAndDate = async (channelId: string, date: string) => {
  const response = {
    statusCode: null,
    message: null,
    data: null,
  };
  try {
    const nowDate = new Date();
    if (Number.isNaN(nowDate.getFullYear())) {
      throw new Error(`Invalid date format(${nowDate})`);
    }
    const nowDateString = `${nowDate.getFullYear()}-${
      nowDate.getMonth() + 1
    }-${nowDate.getDate()}`;
    const targetDate = date || nowDateString;
    const channelModelObjById = channelModelsGlobal.channelModelsArray.find(
      (obj) => obj.channelId === channelId,
    );
    const targetDateObj = new Date(targetDate);

    const channelLogByDate = await channelModelObjById.channelModel.find({
      timestamp: {
        $gte: targetDateObj.getTime(),
        $lt: targetDateObj.getTime() + 24 * 60 * 60000,
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
