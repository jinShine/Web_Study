import { Playlist } from "@/types";
import React, { ReactNode } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PlayListCarouselProps {
  title: string;
  subTitle?: string;
  thumbnail: ReactNode;
  palylistArray?: Playlist[];
}

const PlayListCarousel = ({
  title,
  subTitle,
  thumbnail,
  palylistArray,
}: PlayListCarouselProps) => {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-row justify-between item-end my-2">
          <article></article>
          <div>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">Card</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PlayListCarousel;
