import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { DefaultImage } from "../../icons";
import { uploadImage, deleteImage } from "../../api/ads.api";
import "./ImagesAds.scss";

const ImagesAds = ({ id, adById }) => {
  const [mainPreview, setMainPreview] = useState("");
  const [blueprintPreview, setBlueprintPreview] = useState("");
  const [othersPreview, setOthersPreview] = useState([]);

  useEffect(() => {
    if (adById) {
      setMainPreview(adById.images.main);
      setBlueprintPreview(adById.images.blueprint);
      setOthersPreview(adById.images.others);
    }
  }, [id]);

  const upload = (e) => {
    let data = new FormData();
    if (e.options.props.name === "others") {
      for (let file of e.files) {
        data.append("others", file);
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
    console.log("archivo:", url);
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

  const handleChangeFiles = (images) => {
    if (images) {
      const preview = []
      for (let image of images) {
        console.log("imagen: ", image.name)
        preview.push(image.objectURL)
      }
      setOthersPreview(preview);
      // const imageArray = Array.from(images).map((image) => URL.createObjectURL(image));
      // setOthersPreview((prevImages) => prevImages.concat(imageArray));
      // Array.from(images).map((image) => URL.revokeObjectURL(image));
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
        <div style={{ border: "1px solid lightgrey", padding: "3%", margin: "0.5%", marginTop: "2.5%" }}>
          <DefaultImage />
        </div>
      </div>
    );
  };

  const renderOthers = (source) => {
    return (
      <div className="p-d-flex p-ai-left p-flex-wrap p-order-6">
        {source.map((imgURL, index) => {
          return (
            <div key={`${imgURL}-${index}`} style={{ margin: "0.5%", marginTop: "2.5%", width: 200, height: 200 }}>
              <img src={imgURL} width={200} height={200} />
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
                  const newFileList = Array.from(othersPreview).filter((file, index) => index !== delIndex);
                  setOthersPreview(newFileList);

                  const newPreviews = othersPreview.filter((other) => other !== imgURL);
                  setOthersPreview(newPreviews);

                  deleteImg(imgURL, "others");
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
        blueprint: blueprintPreview ? blueprintPreview : "",
        others: othersPreview.length !== 0 ? othersPreview : [],
      }}
    >
      {(formProps) => (
        <Form>
          <div>
            <h5>Imagen Principal</h5>
            <FileUpload
              name="main"
              chooseLabel="Cargar imagen principal"
              uploadHandler={upload}
              customUpload={true}
              accept="image/*"
              maxFileSize={6000000}
              onRemove={() => setMainPreview("")}
              onSelect={(e) => {
                formProps.setFieldValue("main", e.files[0]);
                handleChangeFile(e.files[0], setMainPreview);
              }}
              // itemTemplate={itemTemplate}
              headerTemplate={headerTemplate}
              // emptyTemplate={emptyTemplate}
            />
            {mainPreview ? (
              <div style={{ margin: "0.5%", marginTop: "2.5%", width: 200, height: 200 }}>
                <img src={mainPreview} width={200} height={200} />
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

            <h5>Planos</h5>
            <FileUpload
              name="blueprint"
              chooseLabel="Cargar plano"
              uploadHandler={upload}
              customUpload={true}
              accept="image/*"
              maxFileSize={6000000}
              onRemove={() => setBlueprintPreview("")}
              onSelect={(e) => {
                formProps.setFieldValue("blueprint", e.files[0]);
                handleChangeFile(e.files[0], setBlueprintPreview);
              }}
              // itemTemplate={<img src={blueprintPreview.objectURL} alt="blueprint" width={266} height={232} />}
              headerTemplate={headerTemplate}
              // emptyTemplate={emptyTemplate}
            />
            {blueprintPreview ? (
              <div style={{ margin: "0.5%", marginTop: "2.5%", width: 200, height: 200 }}>
                <img src={blueprintPreview} width={200} height={200} />
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
              </div>
            ) : (
              emptyTemplate()
            )}

            <h5>Otras imágenes</h5>
            <FileUpload
              name="others"
              chooseLabel="Cargar imágenes"
              uploadHandler={upload}
              customUpload={true}
              onUpload={(props) => props.onClear()}
              className="p-fileupload"
              multiple
              onRemove={(ev) => {
                const newPreview = othersPreview.filter((preview) => preview !== ev.file.objectURL);
                console.log(ev.file);
                console.log(newPreview);
                setOthersPreview(newPreview);
              }}
              onSelect={(ev) => {
                console.log("archivos seleccionados", ev);
                formProps.setFieldValue("others", ev.files);
                handleChangeFiles(ev.files);
              }}
              accept="image/*"
              maxFileSize={6000000}
              // itemTemplate={<span></span>}
              headerTemplate={headerTemplate}
              // emptyTemplate={emptyTemplate}
            />
            {othersPreview.length !== 0 ? renderOthers(othersPreview) : emptyTemplate()}
            <hr />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ImagesAds;
