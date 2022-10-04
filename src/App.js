import {BiCalendar, BiTrash} from 'react-icons/bi'
import Search from "./component/Search";
import AddAppointment from "./component/AddAppointment"
import appointmentList from "./data.json"

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="tex-5xl mb-3">
          <BiCalendar className="inline-block text-red-400 align-top" />Your Appointment</h1>
        <AddAppointment />
        <Search />
      <ul className= "divide-y divide-gray-200">
          {appointmentList.map(app =>
              <li className="px-3 py-3 flex items-start">
                  <button type="button"
                          className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <BiTrash /></button>
                  <div className="flex-grow">
                      <div className="flex items-center">
                          <span className="flex-none font-medium text-2xl text-blue-500">{app.petName}</span>
                          <span className="flex-grow text-right">{app.aptDate}</span>
                      </div>
                      <div><b className="font-bold text-blue-500">Owner:</b> {app.ownerName}</div>
                      <div className="leading-tight">{app.aptNotes}</div>
                  </div>
              </li>
          )}
      </ul>
    </div>
  );
}

export default App;
