import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import "./Spinner.scss"

const Spinner = () => {
  return (
    <div className="Spinner"><BounceLoader size='55' color="#2B363D" /></div>

  )
}

export default Spinner
