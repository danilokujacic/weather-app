import { FC, useEffect, useState } from 'react';
import QueryClient from '../api/queryClient';
import Profile from '../components/About/Profile';
import LoaderComponent from '../components/Loader/Loader';

const AboutMe: FC = () => {
    const [githubUser, setGithubUser] = useState<any>();

    useEffect(() => {
        (async () => {
            const client = new QueryClient();
            const user = await client.getGithub();
            setGithubUser(user);
        })();
    }, []);

    if (!githubUser) {
        return <LoaderComponent />;
    }
    const { avatar_url, html_url, login, name, public_repos, followers } =
        githubUser;
    return (
        <div className='flex flex-col'>
            <Profile
                image={avatar_url}
                link={html_url}
                username={login}
                name={name}
                repos={public_repos}
                followers={followers}
            />
        </div>
    );
};

export default AboutMe;
