import {
    faHome,
    faMapMarkedAlt,
    faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';
import Welcome from '../pages/Welcome';

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
        component: Welcome,
    },
    {
        name: 'Weather map',
        title: 'Weather map',
        path: '/weather-map',
        icon: faMapMarkedAlt,
        component: () => <></>,
    },
    {
        name: 'About creator',
        title: 'About me',
        path: '/about',
        icon: faUserAlt,
        component: () => <></>,
    },
];
export default navMenuConfig;
