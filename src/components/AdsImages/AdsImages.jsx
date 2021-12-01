import React from "react";

const AdsImages = () => {
  return (
    <div>
      <label htmlFor="">Imagen principal</label>
      <hr />
      <div>
        <img src="" alt="" />
        <input type="file" />
      </div>
      <label htmlFor="">Plano</label>
      <hr />
      <div>
        <img src="" alt="" />
        <input type="file" />
      </div>
      <label htmlFor="">Otras imágenes</label>
      <hr />
      <div>
        <img src="" alt="" />
        <input type="file" multiple />
      </div>
    </div>
  );
};

export default AdsImages;
