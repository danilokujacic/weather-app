import { FC, useEffect, useMemo, useState } from 'react';
import QueryClient from '../../../api/queryClient';
import { formatWeather, getWeatherStatus } from '../../../utils/formatWeather';
import WeatherDescription from './Description';
import Weather from './Weather';
import LoaderComponent from '../../Loader/Loader';

export interface IWeatherWidget {
    city: string;
    country?: string;
    state?: string;
    onlyTemperature?: boolean;
    noDescription?: boolean;
    onError?: (message: string) => any;
}

const WeatherWidget: FC<IWeatherWidget> = ({
    city,
    country,
    state,
    onlyTemperature,
    noDescription,
    onError,
}) => {
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
                if (typeof weather !== 'string') {
                    setCurrentWeather(formatWeather(weather));
                } else {
                    if (onError) {
                        onError(weather);
                    }
                    setCurrentWeather(weather);
                }
            }
        })();
    }, [city, country, state, onError]);
    const weatherStatus = useMemo(
        () =>
            currentWeather
                ? getWeatherStatus(
                      currentWeather.temperature,
                      currentWeather.humidity,
                      currentWeather.wind,
                  )
                : null,
        [currentWeather],
    );
    if (currentWeather === null) {
        console.error("Error: Couldn't load weather for " + city);
        return <></>;
    }
    if (!weatherStatus || typeof currentWeather === 'undefined') {
        return <LoaderComponent />;
    }
    if (typeof currentWeather === 'string') {
        console.error(currentWeather);
        return <></>;
    }

    const classes = [
        noDescription
            ? 'inline pl-2 pr-4 py-3'
            : 'flex w-full md:w-96 justify-between pl-2 pr-4',
        'bg-white rounded-md pb-3 pt-2',
    ];

    return (
        <div className={classes.join(' ')}>
            <Weather
                weather={{ ...weatherStatus, ...currentWeather }}
                onlyTemperature={onlyTemperature}
            />
            {!noDescription && (
                <WeatherDescription
                    weatherText={weatherStatus.text}
                    city={city}
                    country={country}
                />
            )}
        </div>
    );
};

export default WeatherWidget;
