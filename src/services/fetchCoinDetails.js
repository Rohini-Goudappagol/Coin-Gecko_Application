import axiosInstance from "../helpers/axiosInstance";

export async function fetchCoinDetails(id) {

    try{
        const response = axiosInstance.get(`/coins/${id}`);
        return response    }
    catch (error){
        console.log(error);
        return null

    }
    
}
