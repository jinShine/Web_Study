import HeaderGlobal from "./header";

export default function LayoutTransparent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderGlobal />
      {children}
    </div>
  );
}
