window.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".loginBtn");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(loginButton);

    const email = document.querySelector("#login__email");
    const password = document.querySelector("#login__password");

    console.log(email);
    console.log(password);

    if (email.value.length === 0 || password.value.length === 0) {
      return alert("이메일 또는 비밀번호를 입력해주세요.");
    }

    window.location.href = "./home.html";

    email.value = "";
    password.value = "";
  });
});
