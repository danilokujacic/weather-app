import { FC, useEffect, useMemo, useState } from 'react';
import QueryClient from '../../api/queryClient';
import { formatWeather, getWeatherStatus } from '../../utils/formatWeather';
import WeatherDescription from './Description';
import Weather from './Weather';

export interface IWeatherWidget {
    city: string;
    country?: string;
    state?: string;
}

const WeatherWidget: FC<IWeatherWidget> = ({ city, country, state }) => {
    const [currentWeather, setCurrentWeather] = useState<any>();

    useEffect(() => {
        (async () => {
            const queryClient = new QueryClient();

            if (city) {
                const weather = await queryClient.getWeather(
                    city,
                    country,
                    state,
                );
                setCurrentWeather(formatWeather(weather));
            }
        })();
    }, [city, country, state]);
    const weatherStatus = useMemo(
        () =>
            currentWeather
                ? getWeatherStatus(currentWeather.temperature)
                : null,
        [currentWeather],
    );

    if (currentWeather === null) {
        console.error("Error: Couldn't load weather for " + city);
        return <></>;
    }
    if (!weatherStatus || typeof currentWeather === 'undefined') {
        return <>Loading...</>;
    }

    return (
        <div className='flex w-full md:w-96 justify-between '>
            <Weather weather={{ ...weatherStatus, ...currentWeather }} />
            <WeatherDescription
                weatherText={weatherStatus.text}
                city={city}
                country={country}
            />
        </div>
    );
};

export default WeatherWidget;
