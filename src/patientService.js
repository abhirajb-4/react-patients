
const API_URL = "http://localhost:3000";

export const getPatients = async () => {
    //  get all patients using fetch call to json server
    const res = await fetch(`${API_URL}/patients`);
    if(!res.ok) throw new Error("Cant fetch");
    return res.json();
};

export const addPatient = async (newPatient) => {
    //   add new patient by posting data to json server

    return fetch(`${API_URL}/patients`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPatient)
        }).then(res => res.json());
};
