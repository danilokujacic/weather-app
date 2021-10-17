import { useCallback, useMemo } from 'react';
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
}

const useUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer);
    const setUser = useCallback(
        ({ city, country, state }: UserConfig) => {
            dispatch(setUserCity({ cityName: city }));
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
