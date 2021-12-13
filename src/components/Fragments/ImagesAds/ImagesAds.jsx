import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { DefaultImage } from "../../../icons";

const ImagesAds = ({ formProps, mainImg, setMainImg, blueprintImg, setBlueprintImg, othersImg, setOthersImg }) => {
  const [mainPreview, setMainPreview] = useState("");
  const [blueprintPreview, setBlueprintPreview] = useState("");
  const [othersPreview, setOthersPreview] = useState([]);

  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

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

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : "0 B";

    return (
      <div className={className} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
        {chooseButton}
        {uploadButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{ width: "300px", height: "20px", marginLeft: "auto" }}
        ></ProgressBar>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="p-d-flex p-flex-column p-ai-center p-flex-wrap">
        <div className="p-d-flex p-ai-center" style={{ width: "40%" }}>
          <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
        </div>
        <Button
          type="button"
          icon="pi pi-trash"
          // className="p-button-outlined p-button-rounded p-button-danger p-ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const onUpload = () => {
    toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
  };

  return (
    <div>
      <h5>Imagen Principal</h5>
      <FileUpload
        ref={fileUploadRef}
        name="main"
        chooseLabel="Cargar imagen"
        // url="https://primefaces.org/primereact/showcase/upload.php"
        onUpload={onUpload}
        multiple
        itemTemplate={itemTemplate}
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={<DefaultImage />}
      />
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
            setOthersImg(ev.target.files);
            handleChangeFiles(ev.target.files);
          }}
        />
      </div>
    </div>
  );
};

export default ImagesAds;
