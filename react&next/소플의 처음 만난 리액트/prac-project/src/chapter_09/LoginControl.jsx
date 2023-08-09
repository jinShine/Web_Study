import React, { useState } from "react";

function UserGreeting(props) {
  return <h1>다시 오셨군요!</h1>;
}

function GuestGreeting(props) {
  return <h1>회원가입을 해주세요.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  } else {
    return <GuestGreeting />;
  }
}

function LoginButton(props) {
  return <button onClick={props.onClick}>로그인</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>로그아웃</button>;
}

function LoginControl(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  let button = isLoggedIn ? (
    <LoginButton onClick={handleLoginClick} />
  ) : (
    <LogoutButton onClick={handleLogoutClick} />
  );

  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      {button}
    </div>
  );
}
