import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "scenes/dashboard";
import DatosEmpleador from "scenes/datosEmpleador/datosEmpleador";
import Empleado from "scenes/empleado/empleados";
import Eps from "scenes/eps/index-1";
import Layout from "scenes/layout";
import { themeSettings } from "theme";

function App() {

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App" >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace /> } />
                <Route path="/dashboard" element={<Dashboard /> } />
                <Route path="/empleados" element={<Empleado /> } />
                <Route path="/Eps" element={<Eps /> } />
                <Route path="/datosempleador" element={<DatosEmpleador /> } />
              </Route>
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
