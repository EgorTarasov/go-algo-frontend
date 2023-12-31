import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./hooks/AuthProvider";
import LoginPage from "./pages/login/LoginPage";
import DashboardAlgo from "./pages/algorithmist/DashboardAlgo";
import CreateAlgo from "./pages/algorithmist/CreateAlgo";
import AppBar from "./shared/components/AppBar";
import CurrentAlgo from "./pages/algorithmist/CurrentAlgo";
// import { AllStockProvider } from "./hooks/AllStockDataProvider";
import Profile from "./pages/algorithmist/Profile";
import { MLFlowProvider } from "./hooks/MlFlowProvider";
import NotFound from "./shared/components/NotFound";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FF0508",
            light: "#F59495",
            dark: "#E5E7FF",
        },
        secondary: {
            main: "#343537",
            dark: "#13161C",
            light: "#F3F4F6",
        },
        error: {
            main: "#860000",
        },
        success: {
            main: "#00440f",
        },
    },
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
    },
});

function App() {
    // const [isAdmin, setIsAdmin] = useState(false);
    // useEffect(() => {
    //     if (storage.getRole() === 'admin') setIsAdmin(true);
    //     else setIsAdmin(false);
    // }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <MLFlowProvider>
                        {/* <AllStockProvider> */}
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route
                                path="/home"
                                element={
                                    <PrivateRoute>
                                        <AppBar />
                                        <DashboardAlgo />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/createAlgorithm"
                                element={
                                    <PrivateRoute>
                                        <AppBar />
                                        <CreateAlgo />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/algorithm/:type/:uuid"
                                element={
                                    <PrivateRoute>
                                        <AppBar />
                                        <CurrentAlgo />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <AppBar />
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="*"
                                element={
                                       <NotFound/>
                                }
                            />
                        </Routes>
                        {/* </AllStockProvider> */}
                    </MLFlowProvider>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
