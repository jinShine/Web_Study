import { MESSAGE_API_PROMISE } from ".";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export const useDeviceSetting = () => {
  const fetchApp = ({ query }: { query: string }) => {
    const result = new Promise((resolve) => {
      MESSAGE_API_PROMISE[query] = resolve;

      window.ReactNativeWebView.postMessage(JSON.stringify({ query }));
    });

    return result;
  };

  return {
    fetchApp,
  };
};
