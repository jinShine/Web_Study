import HeaderGlobal from "./header";

export default function LayoutFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          minHeight: "100vh",
          backgroundColor: "green",
        }}
      >
        <HeaderGlobal />
        <>{children}</>
      </div>
    </>
  );
}
