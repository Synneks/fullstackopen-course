import axios from "redaxios";
import { Country } from "../App";

const getCountries = (searchTerm: string) => {
    return axios
        .get(`https://restcountries.com/v3.1/name/${searchTerm}`)
        .then((res) => {
            return res.data;
        }) as Promise<Country[]>;
};

export default getCountries;
