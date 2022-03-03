import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { DefaultImage } from "../../icons";
import { uploadImage, deleteImage } from "../../api/ads.api";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./ImagesAds.scss";

const ImagesAds = ({ id, adById }) => {
  const [mainPreview, setMainPreview] = useState("");
  const [blueprintPreview, setBlueprintPreview] = useState([]);
  const [othersPreview, setOthersPreview] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (adById) {
      setMainPreview(adById.images.main);
      setBlueprintPreview(adById.images.blueprint);
      setOthersPreview(adById.images.others);
    }
  }, [id]);

  const upload = (e) => {
    let data = new FormData();
    if (e.options.props.name === "others" | e.options.props.name === "blueprint") {
      for (let file of e.files) {
        data.append(e.options.props.name, file);
      }
    } else {
      data.append(e.options.props.name, e.files[0]);
    }

    uploadImage(id, data, e.options.props.name)
      .then((res) => {
        alert(`Imagen subida al anuncio ${res.title}`);
        if (e.options.props.name === "main") setMainPreview(res.images.main);
        if (e.options.props.name === "blueprint") setBlueprintPreview(res.images.blueprint);
        if (e.options.props.name === "others") setOthersPreview(res.images.others);
      })
      .then(e.options.clear());
  };

  const deleteImg = (url, from) => {
    let data = { toDelete: url };

    deleteImage(id, data, from).then((res) => {
      alert(`Imagen borrada del anuncio ${res.title}`);
    });
  };

  const handleChangeFile = (e, setter) => {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(e);
  };

  const handleChangeFiles = (images, previewField, setter) => {
    if (images) {
      
      for (let image of images) {
        previewField.push(image.objectURL);
      }
      setter(previewField);
    }
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton } = options;

    return (
      <div className={className} style={{ backgroundColor: "transparent", display: "flex", justifyContent: "right" }}>
        {chooseButton}
        {uploadButton}
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="p-d-flex p-ai-left p-flex-wrap p-order-6">
        <div
          style={{
            border: "1px solid lightgrey",
            padding: "45px",
            width: "176px",
            height: "154px",
            margin: "0.5%",
            marginTop: "2.5%",
          }}
        >
          <DefaultImage />
        </div>
      </div>
    );
  };

  const renderMultiple = (source, setter, origin) => {
    return (
      <div className="p-d-flex p-ai-left p-flex-wrap p-order-6">
        {source.map((imgURL, index) => {
          return (
            <div key={`${imgURL}-${index}`} className="preview">
              <img
                src={imgURL}
                alt="Otras imágenes"
                width={200}
                height={200}
                onClick={() => {
                  setIsOpen(true);
                  setImages(source);
                }}
              />
              <Button
                type="button"
                icon="pi pi-trash p-ml-auto"
                style={{
                  width: "100%",
                  background: "#2b363d",
                  border: "none",
                  borderRadius: "0",
                  paddingRight: "5%",
                  marginTop: "1%",
                }}
                onClick={() => {
                  const delIndex = source.indexOf(imgURL);
                  const newFileList = Array.from(source).filter((file, index) => index !== delIndex);
                  setter(newFileList);

                  const newPreviews = source.filter((other) => other !== imgURL);
                  setter(newPreviews);

                  deleteImg(imgURL, origin);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        main: mainPreview ? mainPreview : "",
        blueprint: blueprintPreview.length !== 0 ? blueprintPreview : [],
        others: othersPreview.length !== 0 ? othersPreview : [],
      }}
    >
      {(formProps) => (
        <Form>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Previsualización de las imágenes */}
            {isOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
              />
            )}
            <h4 style={{ textAlign: "start", margin: "10px 0px", marginTop: "20px", color: "black" }}>
              Imagen Principal
            </h4>
            <div>
              <FileUpload
                name="main"
                chooseLabel="Cargar imagen principal"
                uploadHandler={upload}
                customUpload={true}
                accept="image/*"
                maxFileSize={20971520}
                onRemove={() => setMainPreview(adById ? adById.images.main : "")}
                onSelect={(e) => {
                  formProps.setFieldValue("main", e.files[0]);
                  handleChangeFile(e.files[0], setMainPreview);
                }}
                headerTemplate={headerTemplate}
              />
              {mainPreview ? (
                <div className="preview">
                  <img
                    src={mainPreview}
                    alt="Imagen principal"
                    width={284}
                    height={246}
                    onClick={() => {
                      setIsOpen(true);
                      setImages([mainPreview]);
                    }}
                  />
                  <Button
                    type="button"
                    icon="pi pi-trash p-ml-auto"
                    style={{
                      width: "100%",
                      background: "#2b363d",
                      border: "none",
                      borderRadius: "0",
                      paddingRight: "5%",
                      marginTop: "1%",
                    }}
                    onClick={() => {
                      setMainPreview("");
                      deleteImg(mainPreview, "main");
                    }}
                  />
                </div>
              ) : (
                emptyTemplate()
              )}
            </div>

            <h4 style={{ textAlign: "start", margin: "10px 0px", marginTop: "20px", color: "black" }}>
              Otras imágenes
            </h4>
            <div>
              <FileUpload
                multiple
                name="others"
                chooseLabel="Cargar imágenes"
                uploadHandler={upload}
                customUpload={true}
                onUpload={(props) => props.onClear()}
                className="p-fileupload"
                onRemove={(ev) => {
                  const newPreview = othersPreview.filter((preview) => preview !== ev.file.objectURL);
                  setOthersPreview(newPreview.length === 0 ? (adById ? adById.images.others : []) : newPreview);
                }}
                onSelect={(ev) => {
                  formProps.setFieldValue("others", ev.files);
                  handleChangeFiles(ev.files, othersPreview, setOthersPreview);
                }}
                accept="image/*"
                maxFileSize={20971520}
                headerTemplate={headerTemplate}
              />
              {othersPreview.length !== 0 ? renderMultiple(othersPreview, setOthersPreview, "others") : emptyTemplate()}
            </div>
            <hr />
            <h4 style={{ textAlign: "start", margin: "10px 0px", marginTop: "20px", color: "black" }}>Planos</h4>
            <div>
              <FileUpload
                multiple
                name="blueprint"
                className="p-fileupload"
                chooseLabel="Cargar plano"
                uploadHandler={upload}
                customUpload={true}
                onUpload={(props) => props.onClear()}
                accept="image/*"
                maxFileSize={20971520}
                onRemove={(ev) => {
                  const newPreview = blueprintPreview.filter((preview) => preview !== ev.file.objectURL);
                  setBlueprintPreview(newPreview.length === 0 ? (adById ? adById.images.blueprint : []) : newPreview);
                }}
                onSelect={(ev) => {
                  formProps.setFieldValue("blueprint", ev.files);
                  handleChangeFiles(ev.files, blueprintPreview, setBlueprintPreview);
                }}
                headerTemplate={headerTemplate}
              />
              {console.log(blueprintPreview.length)}
              {console.log(blueprintPreview)}
              {blueprintPreview.length !== 0 ? renderMultiple(blueprintPreview, setBlueprintPreview, "blueprint") : emptyTemplate()}
              {/* <div className="preview">
                  <img
                    src={blueprintPreview}
                    alt="Planos"
                    width={200}
                    height={200}
                    onClick={() => {
                      setIsOpen(true);
                      setImages([blueprintPreview]);
                    }}
                  />
                  <Button
                    type="button"
                    icon="pi pi-trash p-ml-auto"
                    style={{
                      width: "100%",
                      background: "#2b363d",
                      border: "none",
                      borderRadius: "0",
                      paddingRight: "5%",
                      marginTop: "1%",
                    }}
                    onClick={() => {
                      setBlueprintPreview("");
                      deleteImg(blueprintPreview, "blueprint");
                    }}
                  />
                </div> */}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ImagesAds;
