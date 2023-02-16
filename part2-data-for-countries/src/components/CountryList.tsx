import { Country } from "../App";

const CountryList = ({ countries }: { countries: Country[] }) => {
    return (
        <ul>
            {countries.map((country) => (
                <li key={country.cca2}>{country.name.common}</li>
            ))}
        </ul>
    );
};

export default CountryList;
