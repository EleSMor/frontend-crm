import PulseLoader from "react-spinners/PulseLoader";
import "./Spinner.scss";

const Spinner = () => (
  <div className="Spinner">
    <p><small>Cargando contenido</small></p>
    <PulseLoader size="16" color="#2B363D" />
  </div>
);

export default Spinner;
