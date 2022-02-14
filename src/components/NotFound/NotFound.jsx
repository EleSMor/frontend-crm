import { RiFindReplaceLine } from "react-icons/ri";
import "./NotFound.scss"

const NotFound = () => {
  return (
    <div className="NotFound">
      <p style={{ lineHeight: 4}}>No se han encontrado resultados para su búsqueda  </p>
      <RiFindReplaceLine fontSize="2.5em"/>
    </div>
  )
}

export default NotFound
