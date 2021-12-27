import React from "react";
import "./Layout.scss"
import { Navbar, SubHeader } from "../../components";
import Footer from "../../components/Footer/Footer";

const Layout = ({
  children,
  subTitle,
  subList,
  subLocation,
  subBreadcrumbs,
  subUndertitle,
  subSetter,
  footContent,
}) => {
  return (
    <div className="Layout">
      <Navbar />
      <SubHeader
        title={subTitle}
        list={subList}
        location={subLocation}
        setter={subSetter}
        titleBreadcrumb={subBreadcrumbs}
        underTitle={subUndertitle}
      />
      
      {footContent && <Footer>{footContent}</Footer>}

      <div className={footContent ? "Layout__content plusFooter" : "Layout__content"}>
        {children}
      </div>

    </div>
  );
};

export default Layout;
