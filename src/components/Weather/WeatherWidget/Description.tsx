import { FC } from 'react';
import { IWeatherWidget } from './WeatherWidget';

const dayNames: { [key: number]: string } = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    0: 'Sunday',
};

const WeatherDescription: FC<{ weatherText: string } & IWeatherWidget> = ({
    weatherText,
    city,
    country,
}) => {
    const date = new Date();
    return (
        <div className='flex flex-col mt-3'>
            <span className='text-blue-400 text-base'>
                {city} | {country}
            </span>
            <span className='text-blue-400 text-base'>
                {dayNames[date.getDay()]}, {date.getHours()}:{date.getMinutes()}
            </span>
            <span className='text-blue-400 text-base'>{weatherText}</span>
        </div>
    );
};

export default WeatherDescription;
