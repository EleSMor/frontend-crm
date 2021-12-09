import React, { useState } from "react";
import { DefaultImage } from "../../../icons";

const ImagesAds = ({ formProps, othersImg, setOthersImg }) => {
  const [mainPreview, setMainPreview] = useState("");
  const [blueprintPreview, setBlueprintPreview] = useState("");
  const [othersPreview, setOthersPreview] = useState([]);

  console.log("otras", othersPreview);
  console.log("array de otras:", othersImg);

  const handleChangeFile = (e, setter) => {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(e);
  };

  const handleChangeFiles = (images) => {
    if (images) {
      const imageArray = Array.from(images).map((image) => URL.createObjectURL(image));
      setOthersPreview((prevImages) => prevImages.concat(imageArray));
      Array.from(images).map((image) => URL.revokeObjectURL(image));
    }
  };

  const renderOthers = (source) => {
    return source.map((photo, index) => {
      return (
        <div key={`${photo}-${index}`}>
          <img src={photo} width="5%" />
          <span
            onClick={() => {
              const delIndex = source.indexOf(photo);
              const newFileList = Array.from(othersImg).filter((file, index) => index !== delIndex);
              setOthersImg(newFileList);

              const newPreviews = othersPreview.filter((other) => other !== photo);
              setOthersPreview(newPreviews);
            }}
          >
            Eliminar
          </span>
        </div>
      );
    });
  };

  return (
    <div>
      <h3>Imagen principal</h3>
      <hr />
      <div>
        {mainPreview ? <img src={mainPreview} alt="main" width="5%" /> : <DefaultImage />}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            formProps.setFieldValue("main", e.target.files[0]);
            handleChangeFile(e.target.files[0], setMainPreview);
          }}
        />
      </div>
      <h3>Planos</h3>
      <hr />
      <div>
        {blueprintPreview ? <img src={blueprintPreview} alt="blueprint" width="5%" /> : <DefaultImage />}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            formProps.setFieldValue("blueprint", e.target.files[0]);
            handleChangeFile(e.target.files[0], setBlueprintPreview);
          }}
        />
      </div>
      <h3>Otras imágenes</h3>
      <hr />
      <div>
        {othersPreview.length !== 0 ? renderOthers(othersPreview) : <DefaultImage />}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(ev) => {
            console.log(ev);
            setOthersImg(ev.target.files);
            handleChangeFiles(ev.target.files);
          }}
        />
      </div>
    </div>
  );
};

export default ImagesAds;
