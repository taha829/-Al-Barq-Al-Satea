import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FixedContactButtons from "./FixedContactButtons";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FixedContactButtons />
    </div>
  );
};

export default Layout;
