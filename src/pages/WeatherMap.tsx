import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';
import WeatherMapWidget from '../components/Weather/WeatherMapWidget';

const WeatherMap: FC<any> = () => {
    return <WeatherMapWidget />;
};

export default WeatherMap;
