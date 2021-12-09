import { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { TabView, TabPanel } from "primereact/tabview";
import { useHistory } from "react-router-dom";
import { DetailsAds, ImagesAds, Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";
import { createAd, getAllAds } from "../../api/ads.api.js";
import "./AdForm.scss";

const AdForm = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [ads, setAds] = useState([]);
  const [othersImg, setOthersImg] = useState([]);

  useEffect(() => getAllAds().then((res) => setAds(res)), []);

  const [selectedOwner, setSelectedOwner] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState([]);
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);
  const [selectedBuildingType, setSelectedBuildingType] = useState([]);
  const [selectedAdType, setSelectedAdType] = useState([]);

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Anuncios" list={ads} />
      <Formik
        initialValues={{
          title: "",
          adReference: "",
          showOnWeb: false,
          featuredOnMain: false,
          street: "",
          directionNumber: 0,
          directionFloor: "",
          postalCode: 0,
          city: "Madrid",
          country: "España",
          adType: [],
          gvOperationClose: [],
          owner: [],
          consultant: [],
          adBuildingType: [],
          residential: [],
          patrimonial: [],
          department: "",
          webSubtitle: "",
          buildSurface: 0,
          plotSurface: 0,
          floor: "",
          disponibility: "",
          surfaceFloor: "",
          surfaceUse: "",
          metersAvailables: "",
          meterPrice: "",
          surfaceDisponibility: "",
          saleValue: 0,
          saleShowOnWeb: false,
          rentValue: 0,
          rentShowOnWeb: false,
          monthlyRent: 0,
          expenses: 0,
          expensesIncluded: 0,
          expensesValue: 0,
          expensesShowOnWeb: false,
          ibiValue: 0,
          ibiShowOnWeb: false,
          buildingYear: "",
          bedrooms: 0,
          bathrooms: 0,
          parking: 0,
          indoorPool: 0,
          outdoorPool: 0,
          jobPositions: 0,
          subway: "",
          bus: "",
          lift: false,
          dumbwaiter: false,
          liftTruck: false,
          airConditioning: false,
          centralHeating: false,
          subfloorHeating: false,
          indoorAlarm: false,
          outdoorAlarm: false,
          fullHoursSecurity: false,
          gunRack: false,
          strongBox: false,
          well: false,
          homeAutomation: false,
          centralVacuum: false,
          padelCourt: false,
          tennisCourt: false,
          terrace: false,
          storage: false,
          swimmingPool: false,
          garage: false,
          falseCeiling: false,
          qualityBathrooms: false,
          freeHeight: false,
          smokeOutlet: false,
          accesControl: false,
          web: "",
          emailPDF: "",
          distribution: "",
        }}
        onSubmit={(data) => {
          data.owner = selectedOwner;
          data.consultant = selectedConsultant;
          data.residential = residentialSelectedZones;
          data.patrimonial = patrimonialSelectedZones;
          data.adType = selectedAdType;
          data.adBuildingType = selectedBuildingType;

          console.log(data);
          createAd(data);
          // history.push("/ads");
        }}
      >
        {(formProps) => (
          <Form>
            <TabView>
              <TabPanel header="Detalles">
                <DetailsAds
                  formProps={formProps}
                  owner={selectedOwner}
                  buildingType={selectedBuildingType}
                  setBuildingType={setSelectedBuildingType}
                  adType={selectedAdType}
                  setAdType={setSelectedAdType}
                  setOwner={setSelectedOwner}
                  consultant={selectedConsultant}
                  setConsultant={setSelectedConsultant}
                  residentialZones={residentialSelectedZones}
                  setResidentialZones={setResidentialSelectedZones}
                  patrimonialZones={patrimonialSelectedZones}
                  setPatrimonialZones={setPatrimonialSelectedZones}
                />
              </TabPanel>
              <TabPanel header="Imágenes">
                <ImagesAds formProps={formProps} othersImg={othersImg} setOthersImg={setOthersImg} />
              </TabPanel>
              <TabPanel header="Matching"></TabPanel>
            </TabView>
            <button type="submit">Guardar</button>
            <button onClick={() => history.push("/ads")}>Cancelar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdForm;
