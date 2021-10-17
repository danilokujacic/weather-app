import { FC } from 'react';

interface IWeatherProps {
    weather: {
        image: string;
        text: string;
        temperature: number;
        humidity: number;
        wind: number;
    };
    onlyTemperature?: boolean;
}

const Weather: FC<IWeatherProps> = ({ weather, onlyTemperature }) => {
    return (
        <div className='flex flex-col'>
            <div className='flex items-center'>
                <img src={weather.image} alt={weather.text} />
                <span className='text-pink-500 text-3xl font-semibold'>
                    {weather.temperature} &#x2103;
                </span>
            </div>
            {!onlyTemperature && (
                <>
                    <span className='text-pink-500 text-sm'>
                        Humidity: {weather.humidity}%
                    </span>
                    <span className='text-pink-500 text-sm'>
                        Wind: {weather.wind} km/H
                    </span>
                </>
            )}
        </div>
    );
};

export default Weather;
