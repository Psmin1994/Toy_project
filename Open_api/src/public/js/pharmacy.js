$(document).ready(async () => {
  let xy = await getLocation();

  var mapDiv = document.getElementById("map"),
    mapOptions = {
      center: new naver.maps.LatLng(xy.lat, xy.lng),
      zoom: 15,
      mapTypeControl: true,
    },
    map = new naver.maps.Map(mapDiv, mapOptions);

  await naver.maps.Service.reverseGeocode(
    {
      coords: new naver.maps.LatLng(xy.lat, xy.lng),
    },
    (status, res) => {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("Something wrong!");
      }
      var result = res.v2;
      let address = result.address.jibunAddress;
      let sido_arr = address.split(" ", 2);

      $.ajax({
        url: "/pharmacy/data",
        type: "GET",
        cache: false,
        dataType: "json",
        data: {
          Q0: sido_arr[0],
          Q1: sido_arr[1],
          QT: "",
          QN: "",
          ORD: "",
          pageNo: "1",
          numOfRows: "100",
        },
        success: (data) => {
          console.log(data);

          data.item.forEach((item, index) => {
            let name = item.dutyName,
              addr = item.dutyAddr,
              tel = item.dutyTel1,
              time = "";
            if (item.dutyTime1s && item.dutyTime1c) {
              time += "월요일: " + item.dutyTime1s + " ~ " + item.dutyTime1c + "<br/>";
            }
            if (item.dutyTime2s && item.dutyTime2c) {
              time += "화요일: " + item.dutyTime2s + " ~ " + item.dutyTime2c + "<br/>";
            }
            if (item.dutyTime3s && item.dutyTime3c) {
              time += "수요일: " + item.dutyTime3s + " ~ " + item.dutyTime3c + "<br/>";
            }
            if (item.dutyTime4s && item.dutyTime4c) {
              time += "목요일: " + item.dutyTime4s + " ~ " + item.dutyTime4c + "<br/>";
            }
            if (item.dutyTime5s && item.dutyTime5c) {
              time += "금요일: " + item.dutyTime5s + " ~ " + item.dutyTime5c + "<br/>";
            }
            if (item.dutyTime6s && item.dutyTime6c) {
              time += "토요일: " + item.dutyTime6s + " ~ " + item.dutyTime6c + "<br/>";
            }
            if (item.dutyTime7s && item.dutyTime7c) {
              time += "일요일: " + item.dutyTime7s + " ~ " + item.dutyTime7c + "<br/>";
            }
            if (item.dutyTime8s && item.dutyTime8c) {
              time += "공휴일: " + item.dutyTime8s + " ~ " + item.dutyTime8c + "<br/>";
            }

            let pharmacyLocation = new naver.maps.LatLng(item.wgs84Lat, item.wgs84Lon);
            let marker = new naver.maps.Marker({
              map: map,
              position: pharmacyLocation,
            });

            var contentString = [
              '<div class="iw_inner">',
              `   <h3>${name}</h3>`,
              `   <p>${addr}`,
              `   <button onclick="window.open('https://map.kakao.com/link/to/${name},${item.wgs84Lat},${item.wgs84Lon}')">카카오맵 연결</button><br/> `,
              `       ${tel} <br />`,
              `       ${time}`,
              "   </p>",
              "</div>",
            ].join("");

            var infowindow = new naver.maps.InfoWindow({
              content: contentString,
              maxWidth: 340,
              backgroundColor: "#eee",
              borderColor: "#2db400",
              borderWidth: 3,
              anchorSize: new naver.maps.Size(30, 30),
              anchorSkew: true,
              anchorColor: "#eee",
              pixelOffset: new naver.maps.Point(20, -20),
            });

            naver.maps.Event.addListener(marker, "click", function (e) {
              if (infowindow.getMap()) {
                infowindow.close();
              } else {
                infowindow.open(map, marker);
              }
            });
          });
        },
        error: (req, status, err) => {
          console.log(err);
        },
      });
    }
  );
});

const getLocation = async () => {
  let xy = new Object();
  if (navigator.geolocation) {
    let promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    });

    let position = await promise;

    xy.lat = position.coords.latitude; // 위도
    xy.lng = position.coords.longitude; // 경도

    return xy;
  }
};
