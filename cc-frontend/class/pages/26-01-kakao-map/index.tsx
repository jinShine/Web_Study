import Head from "next/head";
import { useEffect } from "react";

const KAKAO_MAP_KEY = "0fa8f702fd7e13ee596673be29777b83";

// window는 kakao를 알수 없기 떄문에 declare해줘야 한다.
declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
  }, []);
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0fa8f702fd7e13ee596673be29777b83"
        ></script>
      </Head>
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </>
  );
}
