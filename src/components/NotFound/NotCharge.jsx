import { VscSettingsGear, VscGear } from "react-icons/vsc";
import "./NotFound.scss"

const NotCharge = () => {
  return (
    <div className="NotFound">
      <p style={{ lineHeight: 4}}>No se ha podido cargar la página</p>
      <VscGear fontSize="1.2em" style={{marginRight: 5}} />
      <VscSettingsGear fontSize="2em"/>
    </div>
  )
}

export default NotCharge