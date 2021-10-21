import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QueryClient from './api/queryClient';
import useUser from './utils/useUser';
import Header from './components/Template/Header';
import navMenuConfig, { INavMenuConfig } from './config/navMenu';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled.div`
    min-height: calc(100vh - 64px);
    box-sizing: border-box;
`;

function App() {
    const { setUser } = useUser();

    useEffect(() => {
        (async () => {
            const queryClient = new QueryClient();
            const userData = await queryClient.getUserLocation();
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setUser({
                        city: userData?.city,
                        lat: latitude,
                        lon: longitude,
                        country: userData?.country_code,
                        state: userData?.state,
                    });
                },
            );
        })();
    }, [setUser]);
    return (
        <div>
            <BrowserRouter>
                <Header />
                <StyledContainer className='bg-gradient-to-r from-blue-200 to-blue-100 p-6 relative'>
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
                </StyledContainer>
                <ToastContainer
                    position='top-center'
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    limit={1}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
