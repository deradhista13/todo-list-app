import React, { FC } from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col overflow-auto ">
      <Header />
      <div className="h-full w-full overflow-auto p-3">{children}</div>
    </div>
  );
};

export default Layout;
