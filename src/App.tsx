import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./hooks/AuthProvider";
import LoginPage from "./pages/login/LoginPage";
import DashboardAlgo from "./pages/algorithmist/DashboardAlgo";
import CreateAlgo from './pages/algorithmist/CreateAlgo';
import AppBar from "./shared/components/AppBar";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FF0508",
            light: "#F59495",
            dark: "#AAB0FF",
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
    return (
        <>
            <ThemeProvider theme={theme}>
                    <AuthProvider>
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
                        </Routes>
                    </AuthProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
