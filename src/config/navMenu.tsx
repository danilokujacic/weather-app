import {
    faHome,
    faMapMarkedAlt,
    faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FC, lazy, Suspense } from 'react';
import LoaderComponent from '../components/Loader/Loader';
const Welcome = lazy(() => import('../pages/Welcome'));
const WeatherMap = lazy(() => import('../pages/WeatherMap'));
const AboutMe = lazy(() => import('../pages/AboutMe'));

export type INavMenuConfig = {
    name: string;
    path: string;
    title: string;
    icon: any;
    component: FC;
};

const navMenuConfig: INavMenuConfig[] = [
    {
        name: 'Home',
        title: 'Weather app',
        path: '/',
        icon: faHome,
        component: () => (
            <Suspense fallback={<LoaderComponent />}>
                <Welcome />
            </Suspense>
        ),
    },
    {
        name: 'Weather map',
        title: 'Weather map',
        path: '/weather-map',
        icon: faMapMarkedAlt,
        component: () => (
            <Suspense fallback={<LoaderComponent />}>
                <WeatherMap />
            </Suspense>
        ),
    },
    {
        name: 'About creator',
        title: 'About me',
        path: '/about',
        icon: faUserAlt,
        component: () => (
            <Suspense fallback={<LoaderComponent />}>
                <AboutMe />
            </Suspense>
        ),
    },
];
export default navMenuConfig;
