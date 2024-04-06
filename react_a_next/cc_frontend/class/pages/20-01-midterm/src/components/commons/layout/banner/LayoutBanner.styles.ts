import styled from "@emotion/styled";

export const Wrapper = styled.div`
  border-radius: 10px;
  height: 240px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  padding: 4px;

  .slick-list {
    border-radius: 10px;
  }

  .slick-dots {
    margin-bottom: 40px;
    .slick-active {
      button::before {
        color: rgba(255, 255, 255, 1);
      }
    }
    button::before {
      color: rgba(255, 255, 255, 0.4);
    }
  }
`;

export const BannerItem = styled.div`
  height: 240px;
  background: linear-gradient(90deg, #6400ff 0%, #e3d1ff 100%, #d0b1ff 100%);
`;

export const BannerItem_Title = styled.p`
  color: white;
  font-size: 50px;
  font-weight: 800;
  text-align: center;
  margin-top: 90px;
`;
