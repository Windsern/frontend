import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import { useState } from 'react'
import Header from "./Components/Header/Header";
import {Building} from "./Types";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import IndicatorPage from "./Pages/IndicatorPage/IndicatorPage";
import IndicatorsList from "./Pages/IndicatorsList/IndicatorsList";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {

    const [selectedIndicator, setSelectedIndicator] = useState<Building | undefined>(undefined)

    return (
        <BrowserRouter basename="/rent">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className={"content-wrapper"}>

                        <Breadcrumbs selectedIndicator={selectedIndicator} setSelectedIndicator={setSelectedIndicator}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/buildings" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/buildings" element={<IndicatorsList />} />

                            <Route path="/buildings/:id" element={<IndicatorPage selectedIndicator={selectedIndicator} setSelectedIndicator={setSelectedIndicator} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
