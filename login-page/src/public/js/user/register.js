"use strict";

const id = document.querySelector("#id"),
  nickName = document.querySelector("#nickName"),
  password = document.querySelector("#password"),
  confirmPassword = document.querySelector("#confirm-password"),
  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

async function register() {
  // 메세지 생성 함수
  const createMsg = (message) => {
    var p = document.createElement("p");
    var text = document.createTextNode(message);

    p.append(text);
    p.className = "validationMsg";

    return p;
  };

  // 아이디 검사 함수
  const validateId = () => {
    var msg = "";

    if (!id.value) {
      msg = "아이디를 입력해주세요.";
    } else if (id.value.length < 4 || id.value.length > 12) {
      msg = "아이디는 4글자 이상 12글자 미만이어야합니다.";
    } else {
      let checkRegExp = /^[A-Za-z0-9]*$/;

      if (checkRegExp.test(id.value) == false) {
        msg = "아이디는 영어 대소문자, 숫자로 구성됩니다.";
      }
    }

    if (msg) {
      if (id.nextElementSibling.className !== "validationMsg") {
        const p = createMsg(msg);

        id.after(p);
      } else {
        id.nextElementSibling.innerHTML = msg;
      }

      return false;
    } else {
      const validationMsg = id.nextElementSibling;

      if (validationMsg.className == "validationMsg") validationMsg.remove();

      return true;
    }
  };

  // 비밀번호 검사 함수
  const validatePassword = () => {
    var msg = "";

    if (!password.value) {
      msg = "비밀번호를 입력해주세요.";
    } else {
      if (password.value.length < 8 || password.value.length > 15) {
        msg = "비밀번호는 8글자 이상 15글자 미만이어야합니다.";
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

  // 비밀번호 확인 검사 함수
  const validateConfirmPassword = () => {
    var msg = "";

    if (validatePassword() && password.value !== confirmPassword.value) {
      msg = "비밀번호가 일치하지않습니다.";
    }

    if (msg) {
      if (confirmPassword.nextElementSibling.className !== "validationMsg") {
        const p = createMsg(msg);

        confirmPassword.after(p);
      }

      return false;
    } else {
      const validationMsg = confirmPassword.nextElementSibling;

      if (validationMsg.className == "validationMsg") validationMsg.remove();

      return true;
    }
  };

  // 닉네임 검사 함수
  const validatenickName = () => {
    var msg = "";

    // 공백 확인
    if (!nickName.value) {
      msg = "닉네임을 입력해주세요.";
    } else if (nickName.value.length < 3 || nickName.value.length > 10) {
      msg = "닉네임는 3글자 이상 10글자 미만이어야합니다.";
    } else {
      // 구성 확인
      let checkRegExp = /^[가-힣A-Za-z0-9]+$/;

      if (checkRegExp.test(nickName.value) == false) {
        msg = "닉네임은 한글로 구성됩니다.";
      }
    }

    if (msg) {
      if (nickName.nextElementSibling.className !== "validationMsg") {
        const p = createMsg(msg);

        nickName.after(p);
      } else {
        nickName.nextElementSibling.innerHTML = msg;
      }

      return false;
    } else {
      const validationMsg = nickName.nextElementSibling;

      if (validationMsg.className == "validationMsg") validationMsg.remove();

      return true;
    }
  };

  if (validateId() & validatePassword() & validatenickName() & validateConfirmPassword()) {
    const req = {
      id: id.value,
      password: password.value,
      nickName: nickName.value,
      confirmPassword: confirmPassword.value,
    };

    try {
      const res = await axios({
        url: "/user/register",
        method: "post",
        data: req,
      });

      const data = res.data;

      if (data.success) {
        location.href = "/user/login";
      } else if (data.msg) {
        alert(data.msg);
      }

      if (data.errors) {
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
        } else {
          const validationMsg = id.nextElementSibling;

          if (validationMsg.className == "validationMsg") validationMsg.remove();
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
        } else {
          const validationMsg = password.nextElementSibling;

          if (validationMsg.className == "validationMsg") validationMsg.remove();

          if (data.errors.confirmPassword) {
            if (confirmPassword.nextElementSibling.className !== "validationMsg") {
              // 먼저 출력된 경고 메세지가 없을 때
              const p = createMsg(data.errors.confirmPassword);

              confirmPassword.after(p);
            } else {
              // 먼저 출력된 경고 메세지가 있을 때
              confirmPassword.nextElementSibling.innerHTML = data.errors.confirmPassword;
            }
          } else {
            const validationMsg = confirmPassword.nextElementSibling;

            if (validationMsg.className == "validationMsg") validationMsg.remove();
          }
        }

        if (data.errors.nickName) {
          // 사용자가 입력한 아이디가 조건에 맞지 않을 떄
          if (nickName.nextElementSibling.className !== "validationMsg") {
            // 먼저 출력된 경고 메세지가 없을 때
            const p = createMsg(data.errors.nickName);

            nickName.after(p);
          } else {
            // 먼저 출력된 경고 메세지가 있을 때
            nickName.nextElementSibling.innerHTML = data.errors.nickName;
          }
        } else {
          const validationMsg = nickName.nextElementSibling;

          if (validationMsg.className == "validationMsg") validationMsg.remove();
        }
      }
    } catch (err) {
      console.log(err);
      // 에러 처리
    }
  }
}
