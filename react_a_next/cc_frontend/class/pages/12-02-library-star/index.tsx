import { Star } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Rate } from "antd";

// const MyICon = styled(AppleOutlined)`
//   color: blue;
//   font-size: 26px;
// `;

const MyStar = styled(Rate)`
  color: orange;
  font-size: 50px;
`;
export default function LibraryIconPage() {
  return (
    <>
      <MyStar />
    </>
  );
}
