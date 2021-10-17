import { useEffect, useState } from 'react';

const useWindowSize = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(
        window.screen.width < 740,
    );

    useEffect(() => {
        const resizeListener = () => {
            if (window.innerWidth < 740) {
                setIsMobileDevice(true);
            } else if (isMobileDevice) {
                setIsMobileDevice(false);
            }
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, [setIsMobileDevice, isMobileDevice]);
    return {
        isMobileDevice,
    };
};

export default useWindowSize;
