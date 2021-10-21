import { getWeatherStatus } from './formatWeather';

it('Displays correct temperature', () => {
    expect(Object.values(getWeatherStatus(15, 0, 0))).toContain('Rainy');
});

export {};
