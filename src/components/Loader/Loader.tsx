import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

const LoaderComponent: FC = () => {
    return (
        <div className='flex w-full md:w-96 justify-center px-6 pb-3 pt-2'>
            <ClipLoader color='#3B82F6' size={90} />
        </div>
    );
};

export default LoaderComponent;
