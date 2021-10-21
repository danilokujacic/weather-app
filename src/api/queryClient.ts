import 'dotenv';
import { IWeatherObject } from '../utils/formatWeather';

class QueryClient {
    getUserLocation = async () => {
        const userData = await fetch('https://geolocation-db.com/json/').then(
            (res) => res.json(),
        );
        return userData;
    };
    getNearbyCities = async (city: string) => {
        const currentCity = await fetch(
            'https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=' +
                city +
                '&prop=pageprops&format=json',
        );
        const cityData = await currentCity.json();
        if (!cityData.query.pages) {
            throw Error("Couldn't fetch city");
        }
        const cityId = Object.values<any>(cityData.query.pages)[0].pageprops
            .wikibase_item;
        const cities = await fetch(
            'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/' +
                cityId +
                '/nearbyCities?radius=100',
            {
                headers: {
                    'x-rapidapi-host': `${process.env.REACT_APP_CITIES_API_HOST}`,
                    'x-rapidapi-key': `${process.env.REACT_APP_CITIES_API_KEY}`,
                },
            },
        );
        return await cities.json();
    };
    getCityByCoordinates = async (lat: number, lon: number) => {
        try {
            const city = await (
                await fetch(
                    `https://geodb-cities-graphql.p.rapidapi.com/v1/geo/locations/${lat}${
                        lon > 0 ? '+' : ''
                    }${lon}/nearbyCities?radius=5`,
                    {
                        headers: {
                            'x-rapidapi-host': `${process.env.REACT_APP_CITIES_API_HOST}`,
                            'x-rapidapi-key': `${process.env.REACT_APP_CITIES_API_KEY}`,
                        },
                    },
                )
            ).json();

            if (!city.data.length) {
                return 'NO CITY';
            }
            return city.data[0];
        } catch (err) {
            return 'CALM DOWN';
        }
    };
    getGithub = async () => {
        const user = await (
            await fetch(`${process.env.REACT_APP_MY_GITHUB}`)
        ).json();

        return user;
    };
    getWeather = async (
        cityName: string,
        countryCode?: string,
        stateCode?: string,
    ) => {
        try {
            const queryData = [cityName, countryCode, stateCode]
                .filter((entry) => entry)
                .join(', ');
            const cityData = await (
                await fetch(
                    `${process.env.REACT_APP_API_BASE}?q=${queryData}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
                )
            ).json();
            if (cityData.cod !== 200) {
                throw Error(cityData.message);
            }
            return (await cityData) as IWeatherObject;
        } catch (err) {
            return (err as any).message;
        }
    };
}

export default QueryClient;
