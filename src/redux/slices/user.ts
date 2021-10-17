import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        locationCity: '',
        locationCountry: '',
        locationState: '',
    },

    reducers: {
        setUserCity(state, action) {
            console.log('SLICE TRIGERS');
            const {
                payload: { cityName },
            } = action;
            state.locationCity = cityName;
        },
        setUserCountry(state, action) {
            const {
                payload: { countryName },
            } = action;
            state.locationCountry = countryName;
        },
        setUserState(state, action) {
            const {
                payload: { locationState },
            } = action;
            state.locationState = locationState;
        },
    },
});

export const { setUserCity, setUserCountry, setUserState } = userSlice.actions;

export default userSlice.reducer;
