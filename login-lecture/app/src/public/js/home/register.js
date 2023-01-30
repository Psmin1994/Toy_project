"use strict";

const id = document.querySelector("#id"),
  name = document.querySelector("#name"),
  psw = document.querySelector("#psw"),
  confirmPsw = document.querySelector("#confirm-psw"),
  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
  if (!id.value) return alert("아이디를 입력해주세요.");
  if (psw.value !== confirmPsw.value)
    return alert("비밀번호가 일치하지 않습니다.");

  const req = {
    id: id.value,
    name: name.value,
    psw: psw.value,
  };

  fetch("/register", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        if (res.err) return alert(res.err);
        else alert(res.msg);
      }
    })
    .catch((err) => {
      // 에러 처리
      console.error(new Error("로그인 중 에러 발생"));
    });
}
