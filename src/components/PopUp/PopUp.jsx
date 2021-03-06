import { useRef } from "react";
import "./PopUp.scss";

const PopUp = ({
  handlePopUp,
  title,
  children,
  height,
  width,
  simpleStyle,
  fixedButtons,
  buttons,
}) => {
  const modal = useRef(null);

  window.onclick = (event) => {
    if (event.target === modal.current) {
      handlePopUp();
    }
  };

  return (
    <div ref={modal} className="PopUp__overlay">
      <div
        style={{ height: height, width: width }}
        className="PopUp__overlay__container"
      >
        <div
          className={
            simpleStyle
              ? "PopUp__overlay__container--titleBannerSimple"
              : "PopUp__overlay__container--titleBanner"
          }
        >
          <h4>{title}</h4>
          <button
            className={
              simpleStyle
                ? "PopUp__overlay__container--titleBannerSimple__closeSimple"
                : "PopUp__overlay__container--titleBanner__close"
            }
            onClick={() => handlePopUp()}
          >
            X
          </button>
        </div>

        <div
          className={
            fixedButtons
              ? "PopUp__overlay__container--contentButtons"
              : "PopUp__overlay__container--content"
          }
        >
          {children}
        </div>

        {fixedButtons && (
          <div className="PopUp__overlay__container--fixedButtons">
            {buttons}
          </div>
        )}
      </div>
    </div>
  );
};

PopUp.defaultProps = {
  height: "50%",
  width: "50%",
  simpleStyle: false,
  title: "Include a title prop please",
  fixedButtons: false,
};

export default PopUp;
