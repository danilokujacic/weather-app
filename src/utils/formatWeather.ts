import probablySnow from '../assets/images/snowy-1.svg';
import snow from '../assets/images/snowy-4.svg';
import coldSnow from '../assets/images/snowy-6.svg';
import probablyRain from '../assets/images/rainy-1.svg';
import rainy from '../assets/images/rainy-3.svg';
import coldRain from '../assets/images/rainy-7.svg';
import cloudy from '../assets/images/cloudy-day-3.svg';
import sunny from '../assets/images/day.svg';

export const formatWeather = (weatherObj: any) => {
    if (!weatherObj || !weatherObj.main) {
        return null;
    }
    return {
        temperature: Math.round(weatherObj.main.temp),
        feels_like: Math.round(weatherObj.main.feels_like),
        max: Math.round(weatherObj.main.temp_max),
        min: Math.round(weatherObj.main.temp_min),
        humidity: Math.round(weatherObj.main.humidity),
        wind: Math.round(weatherObj.wind.speed),
    };
};

export const getWeatherStatus = (temperature: number) => {
    const status: any = {};
    if (temperature === 0) {
        status.image = probablySnow;
        status.text = 'Probably snow';
    } else if (temperature <= -3 && temperature >= -10) {
        status.image = snow;
        status.text = 'Snow';
    } else if (temperature < -10) {
        status.image = coldSnow;
        status.text = 'Snow and freezing cold';
    } else if (temperature >= 0 && temperature <= 5) {
        status.image = probablyRain;
        status.text = 'Rainy and cold';
    } else if (temperature >= 10 && temperature <= 15) {
        status.image = rainy;
        status.text = 'Rainy';
    } else if (temperature >= 15 && temperature <= 20) {
        status.image = coldRain;
        status.text = 'Probably rain';
    } else if (temperature >= 20 && temperature <= 23) {
        status.image = cloudy;
        status.text = 'Cloudy day';
    } else {
        status.image = sunny;
        status.text = 'Sunny';
    }
    return status;
};
