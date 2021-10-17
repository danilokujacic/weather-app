import 'dotenv';

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
    getWeather = async (
        cityName: string,
        countryCode?: string,
        stateCode?: string,
    ) => {
        const queryData = [cityName, countryCode, stateCode]
            .filter((entry) => entry)
            .join(', ');
        const cityData = await fetch(
            `${process.env.REACT_APP_API_BASE}?q=${queryData}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
        )
            .then((res) => res.json())
            .catch((err) => {
                console.log('trigerrrio');
            });

        return cityData;
    };
}

export default QueryClient;
