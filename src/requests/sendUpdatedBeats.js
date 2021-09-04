import axios from 'axios';

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}

const sendUpdatedBeats = async (data, dispatch) => {
    let dataToSend = {
        data: JSON.stringify(data)
    }

    try {
        const response = await axios.patch(
            '<host>/api/v1/progress',
            axiosConfig,
            dataToSend
        )
        dispatch();
        
        return response;
    } catch (error) {
        console.log("Napotkaliśmy błąd przy aktualizowaniu stanu gry. \n", error);
    }
}

export default sendUpdatedBeats;
