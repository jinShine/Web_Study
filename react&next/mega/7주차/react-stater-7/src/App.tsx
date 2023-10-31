import { ReactElement, ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

const pages: Record<string, React.FC> = {
  "/": HomePage,
  "/about": AboutPage,
};

export default function App() {
  const path = window.location.pathname;

  const Page = pages[path];

  return (
    <div>
      <Header />
      <main>
        <Page />
      </main>
      <Footer />
    </div>
  );
}
