import { Rate } from "antd";
import { DatePicker, Space } from "antd";
import ReactPlayer from "react-player/youtube";
import { useState } from "react";

export default function ExAntDesignPage() {
  const [rateValue, setRateValue] = useState(0);
  const [dateValue, setDateValue] = useState("");
  const [monthValue, setMonthValue] = useState("");

  const onChangeRate = (value: number) => {
    setRateValue(value);

    if (value === 3) {
      alert("3점 입니다.");
    }
  };

  const onChangeDatePicker = (date: any, dateString: string) => {
    setDateValue(dateString);
    setMonthValue(date.$M + 1 + "월");
  };

  return (
    <>
      <>
        <Rate onChange={onChangeRate} />
        <p>{rateValue}점</p>
      </>
      <>
        <Space direction="vertical" size={12}>
          <DatePicker bordered={false} onChange={onChangeDatePicker} />
          <p>{dateValue}</p>
          <p>{monthValue}</p>
        </Space>
      </>
      <>
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=opH7dIA9-iU"}
          width={"800px"}
          height={"600px"}
          playing={false}
          light={true}
          muted={true}
        />
      </>
    </>
  );
}
