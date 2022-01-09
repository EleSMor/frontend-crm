import React from "react";
import "./Layout.scss"
import { Navbar, SubHeader } from "../../components";
import Footer from "../../components/Footer/Footer";

const Layout = ({
  children,
  subTitle,
  subList,
  subLocation,
  subSetter,
  subBreadcrumbs,
  subUndertitle,
  footContent,
}) => {
  return (
    <div className="Layout">
      <SubHeader
        title={subTitle}
        list={subList}
        location={subLocation}
        setter={subSetter}
        titleBreadcrumb={subBreadcrumbs}
        underTitle={subUndertitle}
      />
      <Navbar title={subTitle}/>
      
      
      {footContent && <Footer>{footContent}</Footer>}

      <div className={footContent ? "Layout__content plusFooter" : "Layout__content"}>
        {children}
      </div>

    </div>
  );
};

export default Layout;
