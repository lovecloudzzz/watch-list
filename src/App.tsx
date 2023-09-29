import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import Layout from "./components/Layout/Layout.tsx";
import { AddNewTitlePage } from "./pages/AddNewTitlePage.tsx";
import { ListsPage } from "./pages/ListsPage.tsx";

function App() {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route element={<ListsPage />} path={"/list"} />
                    <Route element={<HomePage />} path={"/home"} />
                    <Route element={<AddNewTitlePage />} path={"/add"} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
