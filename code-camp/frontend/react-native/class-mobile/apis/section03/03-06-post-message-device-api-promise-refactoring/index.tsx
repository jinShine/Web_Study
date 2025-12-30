export const useApis = (webviewRef) => {
  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = (query) => {
    switch (query) {
      case "fetchDeviceSystemForAppSet": {
        onResponse({
          fetchDeviceSystemForAppSet: {
            appVersion: "v1.0",
          },
        });

        break;
      }

      case "fetchDeviceSystemForPlatformSet": {
        onResponse({
          fetchDeviceSystemForPlatformSet: {
            modelName: "iPhone 7 Plus",
          },
        });

        break;
      }

      case "fetchDeviceLocationInfoForLatLngSet": {
        onResponse({
          fetchDeviceLocationInfoForLatLngSet: {
            latitude: 37.498095,
            longitude: 126.854614,
          },
        });

        break;
      }
    }
  };

  return {
    onResponse,
    onRequest,
  };
};
