import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        locationCity: '',
        locationCountry: '',
        locationState: '',
        lat: 0,
        lon: 0,
    },

    reducers: {
        setUserCity(state, action) {
            const {
                payload: { cityName, lat, lon },
            } = action;
            state.locationCity = cityName;
            state.lat = lat;
            state.lon = lon;
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
