"use strict";

const id = document.querySelector("#id"),
  psw = document.querySelector("#psw"),
  loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
  if (!id.value) return alert("아이디를 입력해주세요.");
  if (!psw.value) return alert("비밀번호를 입력해주세요.");

  const req = {
    id: id.value,
    psw: psw.value,
  };

  fetch("/login", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
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
