import PulseLoader from "react-spinners/PulseLoader";
import "./Spinner.scss";

const Spinner = () => (
  <div className="Spinner">
    <p><small style={{ lineHeight: 4}}>Cargando contenido</small></p>
    <PulseLoader size="12" color="#2B363D" />
  </div>
);

export default Spinner;
