import { FC } from 'react';

interface IProfileProps {
    image: string;
    name: string;
    username: string;
    link: string;
    followers: string;
    repos: string;
}

const Profile: FC<IProfileProps> = ({
    image,
    name,
    username,
    link,
    repos,
    followers,
}) => {
    return (
        <div className='flex items-center flex-col'>
            <div className='w-11/12 h-11/12 overflow-hidden rounded-full'>
                <img className='object-fill' src={image} alt='github profile' />
            </div>
            <div className='mt-6 flex flex-col items-center space-y-2'>
                <h2 className='text-xl text-blue-700'>{name}</h2>
                <h2 className='text-xl text-blue-700'>{username}</h2>
                <a href={link}>{link}</a>
            </div>
            <div className='flex justify-between w-9/12 mt-3'>
                <div className='flex flex-col items-center'>
                    <span>Repositories</span>
                    {repos}
                </div>
                <div className='flex flex-col items-center'>
                    <span>Followers</span>
                    {followers}
                </div>
            </div>
        </div>
    );
};

export default Profile;
