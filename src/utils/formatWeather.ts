import probablySnow from '../assets/images/snowy-1.svg';
import snow from '../assets/images/snowy-6.svg';
import probablyRain from '../assets/images/rainy-1.svg';
import rainy from '../assets/images/rainy-3.svg';
import coldRain from '../assets/images/rainy-7.svg';
import cloudy from '../assets/images/cloudy-day-3.svg';
import cloudyNight from '../assets/images/cloudy-night-3.svg';
import day from '../assets/images/day.svg';
import night from '../assets/images/night.svg';
import thunder from '../assets/images/thunder.svg';

type WeatherType = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

type WeatherMainType = {
    [key in
        | 'temp'
        | 'feels_like'
        | 'temp_min'
        | 'temp_max'
        | 'pressure'
        | 'humidity']: number;
};
type SystemType = {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
};

export interface IWeatherObject {
    coord: {
        lon: number;
        lat: number;
    };
    weather: WeatherType;
    base: string;
    main: WeatherMainType;
    visibility: number;
    wind: {
        [key in 'speed' | 'deg']: number;
    };
    clouds: {
        [key: string]: string;
    };
    dt: number;
    sys: SystemType;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export const formatWeather = (weatherObj: IWeatherObject) => {
    return {
        temperature: Math.round(weatherObj.main.temp),
        feels_like: Math.round(weatherObj.main.feels_like),
        max: Math.round(weatherObj.main.temp_max),
        min: Math.round(weatherObj.main.temp_min),
        humidity: Math.round(weatherObj.main.humidity),
        wind: Math.round(weatherObj.wind.speed),
    };
};

const MESSAGE_SNOW_1 = 'Probably snow';
const MESSAGE_SNOW_2 = 'Snow';
const MESSAGE_RAIN_1 = 'Probably rain';
const MESSAGE_RAIN_2 = 'Rain';
const MESSAGE_RAIN_3 = 'Very much rain';
const MESSAGE_THUNDER = 'Thunder';

export const getWeatherStatus = (
    temperature: number,
    humidity: number,
    wind: number,
) => {
    const date = new Date();
    const isNight = date.getHours() > 19;

    if (humidity > 75 && wind > 4.5) {
        return {
            image: thunder,
            text: MESSAGE_THUNDER,
        };
    }

    if (temperature < 0) {
        return {
            image: snow,
            text: MESSAGE_SNOW_2,
        };
    } else if (temperature === 0) {
        if (humidity > 70) {
            return {
                image: snow,
                text: MESSAGE_SNOW_2,
            };
        } else {
            return {
                image: probablySnow,
                text: MESSAGE_SNOW_1,
            };
        }
    } else if (temperature > 0 && temperature < 24) {
        if (humidity > 60 && humidity < 70) {
            return {
                image: probablyRain,
                text: MESSAGE_RAIN_1,
            };
        } else if (humidity > 70 && humidity < 85) {
            return {
                image: rainy,
                text: MESSAGE_RAIN_2,
            };
        } else if (humidity > 85) {
            return {
                image: coldRain,
                text: MESSAGE_RAIN_3,
            };
        } else {
            if (isNight) {
                return {
                    image: cloudyNight,
                    text: 'Cloudy',
                };
            }
            return {
                image: cloudy,
                text: 'Cloudy',
            };
        }
    } else {
        if (isNight) {
            return {
                image: night,
                text: temperature > 35 ? 'Hot' : 'Normal',
            };
        }
        return {
            image: day,
            text: temperature > 35 ? 'Hot' : 'Normal',
        };
    }
};
