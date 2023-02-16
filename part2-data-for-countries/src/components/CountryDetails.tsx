import { useEffect, useState } from "react";
import { Country } from "../App";
import getWeatherInfo, { WeatherData } from "../services/weather";

const CountryDetails = ({ country }: { country: Country }) => {
    const [weatherInfo, setWeatherInfo] = useState<WeatherData>();
    useEffect(() => {
        if (!country) {
            return;
        }
        getWeatherInfo(country.capital[0])
            .then((res) => {
                setWeatherInfo(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [country]);

    const getLanguages = () =>
        Object.keys(country.languages)
            .map((key) => country.languages[key])
            .join(", ");

    const getCurrencies = () =>
        Object.keys(country.currencies)
            .map(
                (key) =>
                    `${country.currencies[key].name} - ${country.currencies[key].symbol}`
            )
            .join(", ");

    return (
        <div>
            <h2>
                {country.flag}
                {country.name.common}
            </h2>
            <p>Capital: {country.capital}</p>
            <p>Languages: {getLanguages()}</p>
            <p>Currencies: {getCurrencies()}</p>
            {weatherInfo && (
                <div>
                    <h3>Weather</h3>
                    <img
                        src={`http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`}
                        alt={weatherInfo.weather[0].description}
                    ></img>
                    <p>
                        {weatherInfo.weather[0].main} -{" "}
                        {weatherInfo.weather[0].description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CountryDetails;
