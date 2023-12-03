import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import PrivateRoute from './routes/PrivateRoute'
import { AuthProvider } from './hooks/AuthProvider';
import LoginPage from './pages/login/LoginPage';
import DashboardAlgo from './pages/algorithmist/dashboard/DashboardAlgo';
import DrawUi from './DrawUi';
import AppBar from './shared/components/AppBar'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0508',
      light: '#F59495',
      dark: '#AAB0FF'
    },
    secondary: {
      main: '#343537',
      dark: '#13161C',
      light: '#F3F4F6'
    },
    error: {
      main: '#860000'
    },
    success: {
      main: '#00440f'
    }
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="ui" element={<DrawUi />} />
            <Route path="/home" element={
              <PrivateRoute>
                <AppBar />
                <DashboardAlgo />
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App