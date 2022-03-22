import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../components/Context/AuthUser";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";

const Schedule = () => {
  const { user } = useContext(UserContext);
  const _ownerData = [{ OwnerText: user.fullName, Id: user._id, OwnerColor: "#ffaa00" }];
  const [ownerData, setOwnerData] = useState(_ownerData);
  const [data, setData] = useState([]);

  return (
    <div>
      <ScheduleComponent
        width="100%"
        height="550px"
        currentView="Week"
        selectedDate={new Date()}
        eventSettings={{
          dataSource: data,
          fields: {
            subject: { title: "Subject", name: "Subject" },
            location: { title: "Location", name: "Location" },
            note: { title: "Note", name: "Description" },
            startTime: { title: "Departure Time", name: "StartTime" },
            endTime: { title: "Arrival Time", name: "EndTime" },
          },
          allowAdding: true,
          enableTooltip: true,
        }}
        // firstDayOfWeek={1}
        // group={{
        //   byDate: false,
        //   resources: ["Owners"],
        //   enableCompactView: false,
        // }}
        // currentView="WorkWeek"
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  );
};

export default Schedule;
