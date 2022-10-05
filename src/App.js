import {BiCalendar} from 'react-icons/bi'
import Search from "./component/Search";
import AddAppointment from "./component/AddAppointment"
import AppointmentInfo from "./component/AppointmentInfo";
import {useCallback, useEffect, useState} from "react";

function App() {
    let[appointmentList, setAppointmentList] = useState([]);
    // Typical way of retrieving data from server
    const fetchData = useCallback(() => {
        fetch('./data.json')
            .then(response => response.json())
            .then(data => {
                setAppointmentList(data)
            })
    }, [])
    useEffect(() => {
        fetchData()
    }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="tex-5xl mb-3">
          <BiCalendar className="inline-block text-red-400 align-top" />Your Appointment</h1>
        <AddAppointment />
        <Search />
      <ul className= "divide-y divide-gray-200">
          {appointmentList.map(app => (
              <AppointmentInfo key={app.id}
                 app ={app}
                 onDeleteAppointment={
                  appId => {
                      setAppointmentList(appointmentList.filter(app =>
                      app.id !== appId
                      ))
                  }
                 }
              />
              ))
          }
      </ul>
    </div>
  );
}

export default App;
