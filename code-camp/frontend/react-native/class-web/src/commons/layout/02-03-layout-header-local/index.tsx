import HeaderGlobal from "./header";

export default function LayoutGlobalAndLocal({
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
