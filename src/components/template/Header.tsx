import { FC, useState } from 'react';
import { useLocation } from 'react-router';
import navMenuConfig, { INavMenuConfig } from '../../config/navMenu';
import useWindowSize from '../../utils/useWindowsSize';
import Drawer from '../Drawer/Drawer';
import Hamburger from '../Hamburger/Hamburger';

const Header: FC<any> = () => {
    const { isMobileDevice } = useWindowSize();
    const location = useLocation();
    const computePath = () => {
        return navMenuConfig.find(
            (item: INavMenuConfig) => item.path === location.pathname,
        )?.title;
    };
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className='bg-blue-300 pl-6 pr-2 md:px-6 py-2 flex items-center md:items-start justify-between'>
            <h1 className='uppercase font-semibold text-white'>
                {computePath()}
            </h1>
            {isMobileDevice && (
                <>
                    <Hamburger onClick={handleOpen} isOpen={isOpen} />
                    <Drawer isOpen={isOpen} handleClose={handleClose} />
                </>
            )}
        </div>
    );
};

export default Header;
