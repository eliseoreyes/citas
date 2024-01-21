import {useState, useEffect} from 'react';
import Error from './Error';
import Patient from './Patient';

const Form = ({patients, setPatients, patient, setPatient }) => {

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [err, setErr] = useState(false);


    useEffect( () => {
       
        if( Object.keys(patient).length > 0 ) {
           setName(patient.name);
           setOwner(patient.owner);
           setEmail(patient.email);
           setDate(patient.date);
           setDescription(patient.description);
        }
    }, [patient])

    const getId = () => {
        const random = Math.random().toString(36).substring(2);
        const date = Date.now().toString(36);
        
        return random + date;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if ([name, owner, email, date, description].includes('')){
            setErr(true);
            return;
        }

        setErr(false);

        //Patient object
        const PatientObject = {
            name, 
            owner, 
            email,
            date,
            description
        }

        if (patient.id){ // si existe Id,entonces actualiza formulario
            PatientObject.id = patient.id;
            const updatedPatient = patients.map((patientState) => patientState.id === patient.id ? PatientObject : patientState);
            setPatients(updatedPatient);
            setPatient({});
        }else { // Si no existe Id, crea un nuevo registro
            PatientObject.id = getId();
            setPatients([...patients, PatientObject]);
        }

        //Reset form
        setName('');
        setOwner('');
        setEmail('');
        setDate('');
        setDescription('');
    }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Add Patient and {''} <span className="text-indigo-600 font-bold">Admin</span>
      </p>
      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>
        
        {err && <Error message="All fields are mandatory"/>
        }

        <div className="mb-5">
            <label htmlFor="pet" className="block text-gray-700 font-bold">Pet Name</label>
            <input id="pet" 
                   type="text" 
                   placeholder="Pet Name" 
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                   value={name}
                   onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className="mb-5">
            <label htmlFor="owner" className="block text-gray-700 font-bold">Pet Name</label>
            <input id="owner" 
                   type="text" 
                   placeholder="Owner Name" 
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                   value={owner}
                   onChange={(e) => setOwner(e.target.value)}></input>
        </div>
        <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
            <input id="email" 
                   type="email" 
                   placeholder="Email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"></input>
        </div>
        <div className="mb-5">
            <label htmlFor="date" className="block text-gray-700 font-bold">Date</label>
            <input id="date" 
                   type="date" 
                   value={date}
                   onChange={(e) => setDate(e.target.value) }
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"></input>
        </div>
        <div className="mb-5">
            <label htmlFor="description" className="block text-gray-700 font-bold">Description</label>
            <textarea id="description" 
                   placeholder="Description" 
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"></textarea>
        </div>
        <input type="submit" 
               className="bg-indigo-600 w-full p-3 text-white font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-lg" 
               value={patient.id ? 'Update Patient' : 'Add Patient'}></input>
      </form>
    </div>
  )
}

export default Form
