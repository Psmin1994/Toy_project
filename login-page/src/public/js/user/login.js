"use strict";

const id = document.querySelector("#id"),
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("#button");

if (loginBtn) loginBtn.addEventListener("click", login);

async function login() {
  // 메세지 생성 함수
  const createMsg = (message) => {
    var p = document.createElement("p");
    var text = document.createTextNode(message);

    p.append(text);
    p.className = "validationMsg";

    return p;
  };

  // 아이디 검사 함수
  const validationId = () => {
    var msg = "";

    if (!id.value) {
      // 아이디 공백 확인
      msg = "아이디를 입력해주세요.";
    } else if (id.value.length < 4 || id.value.length > 12) {
      // 아이디가 공백이 아니라면 글자 수 확인
      msg = "아이디는 4글자 이상 12글자 미만입니다.";
    } else {
      // 아이디 구성 확인
      let checkRegExp = /^[A-Za-z0-9]*$/;

      if (checkRegExp.test(id.value) == false) {
        msg = "아이디는 영어 대소문자, 숫자로 구성됩니다.";
      }
    }

    if (msg) {
      // 사용자가 입력한 아이디가 조건에 맞지 않을 떄
      if (id.nextElementSibling.className !== "validationMsg") {
        // 먼저 출력된 경고 메세지가 없을 때
        const p = createMsg(msg);

        id.after(p);
      } else {
        // 먼저 출력된 경고 메세지가 있을 때
        id.nextElementSibling.innerHTML = msg;
      }

      return false;
    } else {
      // 사용자가 입력한 아이디가 조건에 맞을 떄
      const validationMsg = id.nextElementSibling;

      // 이전에 출력된 경고 메세지가 있을 때
      if (validationMsg.className == "validationMsg") validationMsg.remove();

      return true;
    }
  };

  // 비밀번호 검사 함수
  const validationPassword = () => {
    var msg = "";

    if (!password.value) {
      msg = "비밀번호를 입력해주세요.";
    } else {
      if (password.value.length < 8 || password.value.length > 15) {
        msg = "비밀번호는 8글자 이상 15글자 미만입니다.";
      }
    }

    if (msg) {
      if (password.nextElementSibling.className !== "validationMsg") {
        const p = createMsg(msg);

        password.after(p);
      } else {
        password.nextElementSibling.innerHTML = msg;
      }

      return false;
    } else {
      const validationMsg = password.nextElementSibling;

      if (validationMsg.className == "validationMsg") validationMsg.remove();

      return true;
    }
  };

  // 반환 값을 유효성 검사 통과시 true로 설정해 * 연산으로 서버에 요청

  if (validationId() & validationPassword()) {
    const req = {
      id: id.value,
      password: password.value,
    };

    try {
      const res = await axios({
        url: "/user/login",
        method: "post",
        data: req,
      });

      const data = res.data;

      console.log(data);
      // localStorage.setItem("jwt-access-token", res.headers.get("Authorization"));
      // localStorage.setItem("jwt-refresh-token", res.headers.get("Refresh"));

      if (data.success) {
        location.href = "/user/login";
      } else if (data.errors) {
        if (data.errors.id) {
          // 사용자가 입력한 아이디가 조건에 맞지 않을 떄
          if (id.nextElementSibling.className !== "validationMsg") {
            // 먼저 출력된 경고 메세지가 없을 때
            const p = createMsg(data.errors.id);

            id.after(p);
          } else {
            // 먼저 출력된 경고 메세지가 있을 때
            id.nextElementSibling.innerHTML = data.errors.id;
          }
        }

        if (data.errors.password) {
          // 사용자가 입력한 아이디가 조건에 맞지 않을 떄
          if (password.nextElementSibling.className !== "validationMsg") {
            // 먼저 출력된 경고 메세지가 없을 때
            const p = createMsg(data.errors.password);

            password.after(p);
          } else {
            // 먼저 출력된 경고 메세지가 있을 때
            password.nextElementSibling.innerHTML = data.errors.password;
          }
        }
      } else if (data.msg) {
        alert(data.msg);
      }
    } catch (err) {
      // 에러 처리
      console.log(err);
    }
  }
}
