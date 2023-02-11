import { Country } from "../App";

const CountryDetails = ({ country }: { country: Country }) => {
    return (
        <div>
            <h2>
                {country.flag}
                {country.name.common}
            </h2>
            <p>Capital: {country.capital}</p>
            <p>
                Languages:{" "}
                {Object.keys(country.languages).map(
                    (key) => country.languages[key]
                )}
            </p>
            <p>
                Currencies:{" "}
                {Object.keys(country.currencies).map(
                    (key) =>
                        `${country.currencies[key].name} - ${country.currencies[key].symbol}`
                )}
            </p>
        </div>
    );
};

export default CountryDetails;
