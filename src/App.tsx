import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import BuildingPage from "./pages/BuildingPage/BuildingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import BuildingsPage from "./pages/BuildingsPage/BuildingsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import VerificationConstructor from "./components/VerificationConstructor/VerificationConstructor";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import VerificationsPage from "./pages/VerificationsPage/VerificationsPage";
import BuildingEditPage from "./pages/BuildingEditPage/BuildingEditPage";
import BuildingAddPage from "./pages/BuildingAddPage/BuildingAddPage";
import BuildingsTableWrapper from "./pages/BuildingsPage/BuildingsTableWrapper/BuildingsTableWrapper";
import BuildingsList from "./pages/BuildingsPage/BuildingsList/BuildingsList";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("buildings") && <VerificationConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/bmstu">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/buildings" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/buildings" element={<BuildingsList />} />

                                    <Route path="/buildings-table" element={<BuildingsTableWrapper />} />

                                    <Route path="/buildings/add" element={<BuildingAddPage />} />

                                    <Route path="/buildings/:id" element={<BuildingPage />} />

                                    <Route path="/buildings/:id/edit" element={<BuildingEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/verifications/:id" element={<VerificationPage />} />

                                    <Route path="/verifications" element={<VerificationsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
