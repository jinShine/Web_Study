"use client";

import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import UserIcon from "./UserIcon";
import PagePadding from "./PagePadding";
import { FaChromecast } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Logo from "./elements/Logo";
import Navigator from "./elements/Navigator";
import { cn } from "@/lib/utils";
import useUIState from "@/hooks/useUIState";

const HeaderDrawer = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="w-[240px] h-full">
        {/* 로고 */}
        {/* 네비게이션 + 재생목록 */}
        <div className="py-3">
          <div className="px-3">
            <Logo
              isInDrawer={true}
              onClickClose={() => {
                setIsOpen(false);
              }}
            />
          </div>
          <Navigator />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  const { headerImageSrc } = useUIState();

  const [isScrolled, setIsScrolled] = useState(false);

  const headRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = headRef.current?.scrollTop;
      console.log(scrollValue);
      setIsScrolled(scrollValue !== 0);
    };

    const element = headRef.current;
    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header ref={headRef} className="relative overflow-y-auto w-full h-full">
      {/* bg section */}
      <section className="absolute top-0 w-full">
        <div className=" relative h-[400px] w-full">
          <Image
            fill
            src={
              headerImageSrc ||
              "https://images.unsplash.com/photo-1712971404210-658cb22c84fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="bg-image"
            className="object-cover"
            priority
          />
          <div className="absolute h-[400px] top-0 bg-black opacity-40 w-full "></div>
          <div className="absolute h-[400px] top-0 bg-gradient-to-t from-black w-full "></div>
        </div>
      </section>
      {/* search section */}
      <section
        className={cn("sticky top-0 left-0 z-10", isScrolled && "bg-black")}
      >
        <PagePadding>
          <div className="flex flex-row justify-between items-center h-[64px]">
            <article className="hidden lg:flex flex-row items-center bg-[rgba(0,0,0,0.14)] h-[42px] min-w-[480px] rounded-2xl px-[16px] gap-[16px] border border-neutral-500">
              <div>
                <FiSearch size={24} />
              </div>
              <input
                className="h-full w-full bg-transparent"
                type="text"
                placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
              />
            </article>
            <HeaderDrawer>
              <article className="lg:hidden">
                <Logo />
              </article>
            </HeaderDrawer>
            <article className="flex flex-row gap-6 items-center">
              <FaChromecast size={26} />
              <UserIcon />
            </article>
          </div>
        </PagePadding>
      </section>
      <section className="relative">{children}</section>
    </header>
  );
};

export default Header;
