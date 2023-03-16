import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function MapPage1() {
  const mapURL = "//dapi.kakao.com/v2/maps/sdk.js?";
  const [lat, lng] = [33.450701, 126.570667];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${mapURL}autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}`;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const map = setupMap(lat, lng);
        const marker = setupMarker(lat, lng);
        marker.setMap(map);

        window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
          const latlng = mouseEvent.latLng;
          marker.setPosition(latlng);
        });
      });
    };
  });

  const setupMap = (lat: number, lng: number) => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    window.kakao.maps;

    return new window.kakao.maps.Map(container, options);
  };

  const setupMarker = (lat: number, lng: number) => {
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);

    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
    const imageSize = new window.kakao.maps.Size(64, 69);
    const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커를 생성합니다
    return new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
  };

  return (
    <>
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </>
  );
}
