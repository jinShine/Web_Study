import HeaderGlobal from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderGlobal />
      {children}
    </div>
  );
}
