import Head from "next/head";
import { useEffect } from "react";

const KAKAO_MAP_KEY = "0fa8f702fd7e13ee596673be29777b83";

// window는 kakao를 알수 없기 떄문에 declare해줘야 한다.
declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  useEffect(() => {
    /* <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0fa8f702fd7e13ee596673be29777b83"
        ></script>
      </Head> */
    const script = document.createElement("script"); // <script></script>
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0fa8f702fd7e13ee596673be29777b83";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        console.log(map);

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        );

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };
  }, []);
  return (
    <>
      {/* <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0fa8f702fd7e13ee596673be29777b83"
        ></script>
      </Head> */}
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </>
  );
}
