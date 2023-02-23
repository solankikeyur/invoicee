import React from 'react'
import "../../../css/loader.css";

const Loader = ({show=false}) => {
  return (
    show && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

export default Loader
