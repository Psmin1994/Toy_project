const axios = require("axios");

const pharmacyData = async (data, callback) => {
  const url = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?";

  var params = {
    serviceKey: process.env.DATA_GO_API_DECODE_KEY,
    Q0: data.Q0,
    Q1: data.Q1,
    QT: data.QT,
    QN: data.QN,
    ORD: data.ORD,
    pageNo: data.pageNo,
    numOfRows: data.numOfRows,
  };

  try {
    const response = await axios.get(url, { params });
    let pharmacyList = response.data.response.body.items;
    callback(pharmacyList);
  } catch (err) {
    console.log(err);
  }
};

module.exports = pharmacyData;
