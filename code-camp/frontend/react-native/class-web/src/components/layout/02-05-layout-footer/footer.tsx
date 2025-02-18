export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ flex: 1 }} />
      <footer
        style={{
          width: "100vw",
          height: "3.125rem",
          backgroundColor: "skyblue",
        }}
      >
        {children}
      </footer>
    </>
  );
}
