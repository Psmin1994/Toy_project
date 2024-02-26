const axios = require("axios");

const airData = (stationName, callback) => {
  const url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

  var queryParams = encodeURIComponent("ServiceKey") + "=" + process.env.DATA_GO_API_KEY;
  queryParams += "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("json");
  queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1");
  queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
  queryParams += "&" + encodeURIComponent("stationName") + "=" + encodeURIComponent(stationName);
  queryParams += "&" + encodeURIComponent("dataTerm") + "=" + encodeURIComponent("DAILY");
  queryParams += "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.3");

  const fullUrl = url + queryParams;

  axios.get(fullUrl).then((res) => {
    const air = res.data.response.body.items[0];
    console.log(air);
    callback(air);
  });
};

module.exports = airData;
