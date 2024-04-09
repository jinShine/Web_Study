"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import IconButton from "./IconButton";

const Logo = () => {
  const { push } = useRouter();

  const onClickLogo = () => {
    // go to home
    push("/");
  };

  const onClickMenu = () => {};

  return (
    <section className="flex flex-row items-center gap-3">
      <IconButton
        icon={<RxHamburgerMenu size={24} />}
        onClickIcon={onClickMenu}
      />
      <div className="cursor-pointer" onClick={onClickLogo}>
        <Image src={"/main-logo.svg"} alt="main-logo" width={100} height={30} />
      </div>
    </section>
  );
};

export default Logo;
