"use client";

import PagePadding from "@/components/PagePadding";
import Category from "./components/Category";
import PlayListCarousel from "@/components/PlayListCarousel";
import { dummyPlaylistArray } from "@/lib/dummyData";
import { Playlist } from "@/types";
import UserIcon from "@/components/UserIcon";

export default function Home() {
  const dummyPlaylistArray1 = [...dummyPlaylistArray];

  return (
    <PagePadding>
      <main className="min-h-[600px]">
        <div className="mt-9"></div>
        <Category />
        <div className="mt-12"></div>
        {/* carousel */}
        <PlayListCarousel
          palylistArray={[...dummyPlaylistArray1]}
          thumbnail={
            <div className="w-[56px] h-[56px]">
              <UserIcon />
            </div>
          }
          title="다시 듣기"
          subTitle="도도"
        />
      </main>
    </PagePadding>
  );
}
