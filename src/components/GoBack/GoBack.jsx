import { useHistory } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import "./GoBack.scss";

const GoBack = () => {
  let history = useHistory();

  return (
    <button className="GoBack" onClick={() => history.goBack()}>
      <AiOutlineLeft fontSize={"0.8em"} style={{ marginRight: 5, color: "#5C5C5C"}} />
      Volver
    </button>
  );
};

export default GoBack;
