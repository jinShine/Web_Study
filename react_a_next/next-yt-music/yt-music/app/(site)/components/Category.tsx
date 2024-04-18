"use client";

import React from "react";

import useUIState from "@/hooks/useUIState";
import { homeCategoryList } from "@/lib/dummyData";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import Rabbit from "./Rabbit.json";
import Rabbit_1 from "./Rabbit test_1.json";
import Robot from "./Robot.json";

const Category = () => {
  const { homeCategory, setHomeCategory, setHeaderImageSrc } = useUIState();

  const onClickCategory = (item) => {
    if (homeCategory === item.label) {
      setHeaderImageSrc("");
      setHomeCategory("");
    } else {
      setHeaderImageSrc(item.src);
      setHomeCategory(item.label);
    }
  };

  return (
    <>
      <div className="w-[300px] h-[300px]">
        <Lottie animationData={Rabbit_1} loop={true} width={10} height={10} />
        {/* <Lottie animationData={Robot} loop={true} width={10} height={10} /> */}
      </div>
      {/* <ul className="max-w-full overflow-x-auto flex flex-row gap-4">
        {homeCategoryList.map((item) => (
          <li
            key={item.label}
            className={cn(
              "h-[38px] min-w-fit px-3 flex justify-center items-center border-transparent rounded-lg bg-[rgba(144,144,144,0.45)] cursor-pointer",
              item.label === homeCategory &&
                "bg-white text-black  hover:bg-white"
            )}
            onClick={() => onClickCategory(item)}
          >
            {item.label}
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default Category;
