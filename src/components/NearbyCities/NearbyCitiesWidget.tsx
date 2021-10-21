import React, { FC, useEffect, useRef, useState } from 'react';
import QueryClient from '../../api/queryClient';
import useUser from '../../utils/useUser';
import LoaderComponent from '../Loader/Loader';
import WeatherWidget from '../Weather/WeatherWidget/WeatherWidget';

const NearbyCitiesWidget: FC = () => {
    const { user } = useUser();
    const loadRef = useRef(false);
    const [nearbyCities, setNearbyCities] = useState<any[]>([]);
    useEffect(() => {
        if (!user?.locationCity || loadRef.current) {
            return;
        }
        (async () => {
            const queryClient = new QueryClient();
            const cities = await queryClient.getNearbyCities(user.locationCity);
            loadRef.current = true;

            if (!cities.data || !cities.data.length) {
                console.error("Error: Couldn't load nearby cities");
                return;
            }
            setNearbyCities(
                cities.data.map((item: any) => ({
                    city: item.city,
                    country: item.countryCode,
                })),
            );
        })();
    }, [user, setNearbyCities]);
    return (
        <div className='flex flex-col space-y-6'>
            {nearbyCities.length ? (
                nearbyCities.map((item: any, index: number) => (
                    <WeatherWidget key={index} {...item} />
                ))
            ) : (
                <LoaderComponent />
            )}
        </div>
    );
};

export default NearbyCitiesWidget;
