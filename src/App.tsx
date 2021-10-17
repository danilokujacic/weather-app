import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QueryClient from './api/queryClient';
import useUser from './utils/useUser';
import Header from './components/template/Header';
import navMenuConfig, { INavMenuConfig } from './config/navMenu';

function App() {
    const { setUser } = useUser();

    useEffect(() => {
        (async () => {
            const queryClient = new QueryClient();
            const userData = await queryClient.getUserLocation();
            setUser({
                city: userData?.city,
                country: userData?.country_code,
                state: userData?.state,
            });
        })();
    }, [setUser]);
    return (
        <div>
            <BrowserRouter>
                <Header />
                <div className='min-h-full bg-blue-100 p-6'>
                    <Switch>
                        {navMenuConfig.map(
                            (item: INavMenuConfig, index: number) => (
                                <Route
                                    key={index}
                                    exact
                                    path={item.path}
                                    component={item.component}
                                />
                            ),
                        )}
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
