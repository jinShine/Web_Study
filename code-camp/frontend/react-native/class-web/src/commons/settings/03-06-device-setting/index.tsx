"use client";
import { useEffect } from "react";

export const MESSAGE_API_PROMISE = {};

export default function DeviceSetting({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.addEventListener("message", (message) => {
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0];
      const resolve = MESSAGE_API_PROMISE[query];
      resolve({ data: response });
      delete MESSAGE_API_PROMISE[query];
    });

    window.addEventListener("message", (message) => {
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0];
      const resolve = MESSAGE_API_PROMISE[query];
      resolve({ data: response });
      delete MESSAGE_API_PROMISE[query];
    });
  }, []);

  return <div>{children}</div>;
}
