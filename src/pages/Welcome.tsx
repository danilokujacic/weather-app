import { FC } from 'react';
import LoaderComponent from '../components/Loader/Loader';

import NearbyCitiesWidget from '../components/NearbyCities/NearbyCitiesWidget';
import WeatherWidget from '../components/Weather/WeatherWidget/WeatherWidget';
import useUser from '../utils/useUser';

const Welcome: FC<any> = () => {
    const { user } = useUser();
    return (
        <div>
            <section>
                <h3>Weather in your city</h3>
                {user.locationCity ? (
                    <WeatherWidget
                        city={user.locationCity}
                        state={user.locationState}
                        country={user.locationCountry}
                    />
                ) : (
                    <LoaderComponent />
                )}
            </section>
            <section>
                <h3>Weather in related cities</h3>
                <NearbyCitiesWidget />
            </section>
        </div>
    );
};

export default Welcome;
