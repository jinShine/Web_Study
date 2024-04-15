"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import IconButton from "./IconButton";
import { IoCloseOutline } from "react-icons/io5";

const Logo = ({
  isInDrawer = false,
  onClickClose,
}: {
  isInDrawer: boolean;
  onClickClose: () => void;
}) => {
  const { push } = useRouter();

  const onClickLogo = () => {
    // go to home
    push("/");
  };

  const onClickMenu = () => {};

  return (
    <section className="flex flex-row items-center gap-3">
      {isInDrawer ? (
        <IconButton
          icon={<IoCloseOutline size={30} />}
          onClickIcon={onClickClose}
        />
      ) : (
        <IconButton
          icon={<RxHamburgerMenu size={24} />}
          onClickIcon={onClickMenu}
        />
      )}
      <div className="cursor-pointer" onClick={onClickLogo}>
        <Image src={"/main-logo.svg"} alt="main-logo" width={100} height={30} />
      </div>
    </section>
  );
};

export default Logo;
