import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setUserCity,
    setUserCountry,
    setUserState,
} from '../redux/slices/user';

interface UserConfig {
    city: string;
    country?: string;
    state?: string;
    lat: number;
    lon: number;
}

const useUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer);
    const setUser = useCallback(
        ({ city, country, state, lat, lon }: UserConfig) => {
            dispatch(setUserCity({ cityName: city, lat, lon }));
            if (state) {
                dispatch(setUserState({ locationState: state }));
            }
            if (country) {
                dispatch(setUserCountry({ countryName: country }));
            }
        },
        [dispatch],
    );
    return {
        setUser,
        user,
    };
};

export default useUser;
