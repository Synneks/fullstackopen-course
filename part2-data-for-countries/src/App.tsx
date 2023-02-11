import { useEffect, useState } from "react";
import axios from "redaxios";
import "./App.css";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

interface Currency {
    name: string;
    symbol: string;
}

export interface Country {
    name: { common: string };
    cioc: string;
    flag: string;
    capital: string[];
    languages: { [index: string]: string };
    currencies: { [index: string]: Currency };
}

function App() {
    const [searchField, setSearchField] = useState("");
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        console.log("effect triggered");
        if (!searchField) {
            return;
        }
        axios
            .get(`https://restcountries.com/v3.1/name/${searchField}`)
            .then((res) => {
                setCountries(res.data);
                return;
            })
            .catch((err) => {
                console.log(err);
            });
    }, [searchField]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(event.target.value);
    };

    return (
        <div className="App">
            <h1>Search countries</h1>
            <input name="country" onChange={handleChange} />
            {countries.length <= 10 && countries.length > 1 && (
                <CountryList countries={countries} />
            )}
            {countries.length > 10 && <p>Too many matches</p>}
            {countries.length === 1 && (
                <CountryDetails country={countries[0]} />
            )}
        </div>
    );
}

export default App;
