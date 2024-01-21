import { useState, useEffect} from "react"
import Header from "./components/Header"
import Form from "./components/Form"
import Patients from "./components/Patients"


function App() {

  // Al parecer en las ultimas version de REACT ya no es necesario crear un useEffect para obtener el valor del localStorage. Sino asignarlo directamente al useState.
  const [patients, setPatients] = useState(JSON.parse(localStorage.getItem('patients')) ?? []); 
  const [patient, setPatient] = useState({});

  //Cuando se pasa un arreglo vario, quiere decir que solo se va a ejecutar una sola vez cuando el componente este listo
  // IMPORTANTE: El orden en el que se definan los useEffect, es el mismo orden en el que se ejecutan
  // Se pueden crear multiples usseEffect
  /*useEffect(() => {
    const getLocalStorage = () => {
      const patientLS = JSON.parse(localStorage.getItem('patients')) ?? []; // Si no hay nada en localStorage, entonces agrega un arreglo vacio
      setPatients(patientLS);
    }
    getLocalStorage();
  },[]);
*/
  const deletePatient = (id) => {
    const updatedPatient = patients.filter(patient => patient.id !== id);
    setPatients(updatedPatient);
  }

  // Es bueno usar useEffect para ver cuando un componente haya sufrido cambios
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]); // Sincroniza el state con lo que haya en paciente

  return (
      <div className="container mx-auto mt-20">
        <Header />

        <div className="mt-12 md:flex">
          <Form patients={patients}
                setPatients={setPatients}
                patient={patient}
                setPatient={setPatient}
          />
          <Patients patients={patients}
                    setPatient={setPatient}
                    patient={patient}
                    deletePatient={deletePatient}
          />
        </div>
      </div>
  )
}

export default App
