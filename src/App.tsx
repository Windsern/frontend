import "./styles/main.sass"
import "./styles/reset.sass"
import { useState } from 'react'
import Header from "./components/Header/Header";
import {Building} from "./utils/types";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import BuildingPage from "./pages/BuildingPage/BuildingPage";
import BuildingsList from "./pages/BuildingsList/BuildingsList";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";

function App() {

    const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>(undefined)

    return (
        <BrowserRouter basename="/gh-pages">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper">

                        <Breadcrumbs selectedBuilding={selectedBuilding} setSelectedBuilding={setSelectedBuilding}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/home" replace />} />

                            <Route path="/home" element={<HomePage />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/buildings" element={<BuildingsList />} />

                            <Route path="/buildings/:id" element={<BuildingPage selectedBuilding={selectedBuilding} setSelectedBuilding={setSelectedBuilding} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
