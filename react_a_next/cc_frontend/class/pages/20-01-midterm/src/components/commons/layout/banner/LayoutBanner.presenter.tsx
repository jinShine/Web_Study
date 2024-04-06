import { BannerItem, BannerItem_Title, Wrapper } from "./LayoutBanner.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AppBannerPageUI() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <BannerItem>
          <BannerItem_Title>Carousel 🚀</BannerItem_Title>
        </BannerItem>
        <BannerItem>
          <BannerItem_Title>Carousel 🚀</BannerItem_Title>
        </BannerItem>
        <BannerItem>
          <BannerItem_Title>Carousel 🚀</BannerItem_Title>
        </BannerItem>
      </Slider>
    </Wrapper>
  );
}
