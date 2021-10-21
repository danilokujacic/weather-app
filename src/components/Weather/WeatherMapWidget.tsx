import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import useUser from '../../utils/useUser';
import styled from '@emotion/styled';
import QueryClient from '../../api/queryClient';
import WeatherWidget from './WeatherWidget/WeatherWidget';
import LoaderComponent from '../Loader/Loader';
import { toast } from 'react-toastify';

mapboxgl.accessToken = `${process.env.REACT_APP_WEATHER_MAP_API_KEY}`;

const MapContainer = styled.div`
    height: 400px;
`;

type WeatherType =
    | 'INITIAL'
    | 'LOADING'
    | 'NO CITY'
    | 'CALM DOWN'
    | 'NO WEATHER'
    | 'success';

const InitialComponent: FC = () => {
    return (
        <div className='p-3 bg-white round-xl text-blue-500 text-xl'>
            Click on city to load weather
        </div>
    );
};

const WeatherMapWidget: FC<any> = () => {
    const mapContainer = useRef<any>();
    const [mapRef, setMapRef] = useState<any>();
    const disableEventRef = useRef<boolean>(false);
    const [weatherState, setWeatherState] = useState<WeatherType>('INITIAL');
    const [selectedCity, setSelectedCity] = useState<any>();

    const { user } = useUser();

    useEffect(() => {
        if (weatherState === 'CALM DOWN') {
            toast.dismiss();
            toast.error('Too many clicks');
            setTimeout(() => {
                disableEventRef.current = false;
            }, 3000);
        }
        if (weatherState === 'NO CITY') {
            toast.dismiss();
            toast.error("Couldn't find city");
            setTimeout(() => {
                disableEventRef.current = false;
            }, 3000);
        }
        if (weatherState === 'NO WEATHER') {
            toast.dismiss();
            toast.error("Couldn't find weather");
        }
        if (weatherState === 'INITIAL') {
            toast.info('Welcome to weather mapp. Follow instruction bellow', {
                autoClose: false,
            });
        }
        if (weatherState === 'LOADING') {
            disableEventRef.current = true;
        }
        if (weatherState === 'success') {
            disableEventRef.current = false;
        }
    }, [weatherState]);
    useEffect(() => {
        if (!user.lat && !user.lon) {
            return;
        }
        if (mapRef) {
            return;
        }
        const client = new QueryClient();
        const handleClick = async (e: any) => {
            if (disableEventRef.current) {
                return;
            }
            setWeatherState('LOADING');

            const city = await client.getCityByCoordinates(
                e.lngLat.lat,
                e.lngLat.lng,
            );
            if (city === 'NO CITY' || city === 'CALM DOWN') {
                return setWeatherState(city);
            }
            toast.dismiss();
            toast.success('Found city');
            setSelectedCity(city.name);

            setWeatherState('success');
        };
        setMapRef(
            new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [user.lon, user.lat],
                zoom: 9,
            }).on('mousedown', handleClick),
        );
    }, [user, setMapRef, mapRef]);

    let WeatherComponent;

    if (weatherState === 'LOADING') {
        WeatherComponent = <LoaderComponent />;
    } else if (
        weatherState === 'INITIAL' ||
        weatherState === 'CALM DOWN' ||
        weatherState === 'NO CITY' ||
        weatherState === 'NO WEATHER'
    ) {
        WeatherComponent = <InitialComponent />;
    } else {
        WeatherComponent = selectedCity && (
            <WeatherWidget
                onError={(_) => setWeatherState('NO WEATHER')}
                city={selectedCity}
            />
        );
    }
    return (
        <>
            <MapContainer className='w-full h-96'>
                <div ref={mapContainer} className='w-full h-full'></div>
            </MapContainer>
            <div className='mt-6'>{WeatherComponent}</div>
        </>
    );
};

export default WeatherMapWidget;
