const Patient = ({patient, setPatient, deletePatient}) => {

    const {name, owner, email, date, description, id} = patient;

    const deleteHandler = () => {
        const response = confirm('Are you sure to delete this item?');
        
        if (response) {
            deletePatient(id);
        }else {
            return;
        }
    }

    return (
        <div className="mx-5 my-3 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold mb-3 text-gray-700">Pet Name: {''}
            <span className="font-normal">{name}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700">Owner: {''}
            <span className="font-normal">{owner}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700">Email: {''}
            <span className="font-normal">{email}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700">Date: {''}
            <span className="font-normal">{date}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700">Description: {''}
            <span className="font-normal">{description}</span>
        </p>
        <div className="flex justify-between mt-10">
            <button type="button" 
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg"
                    onClick={() => setPatient(patient)}
            >Edit</button>
            <button type="button" 
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg" 
                    onClick={ deleteHandler }
            >Delete</button>
        </div>
    </div>
    )
}

export default Patient;