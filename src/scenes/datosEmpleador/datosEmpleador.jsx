import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import TablaAreas from "./areas/tablaAreas";
import TablaCargos from "./cargos/tablaCargos";
import { areasData } from "./areas/areasData";
import { cargosData } from "./cargos/cargosData";


const DatosEmpleador = () => {
  const theme = useTheme();
  const [showAreasTable, setShowAreasTable] = useState(true);
  const [showCargosTable, setShowCargosTable] = useState(false);
  const [title, setTitle] = useState('Datos del empleador');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleShowAreas = () => {
    setShowAreasTable(true);
    setShowCargosTable(false);
    setTitle('Áreas');
  };

  const handleShowCargos = () => {
    setShowCargosTable(true);
    setShowAreasTable(false);
    setTitle('Cargos');
  };

  const handleSearchTermChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    let filteredData = [];

    if (showAreasTable) {
      filteredData = areasData.filter((item) => {
        return item.area.toLowerCase().includes(newSearchTerm.toLowerCase());
      });
    } else if (showCargosTable) {
      filteredData = cargosData.filter((item) => {
        return item.cargos.toLowerCase().includes(newSearchTerm.toLowerCase());
      });
    }

    setFilteredData(filteredData);
  };

  return (
    <Box m="1.5rem 2.5rem">
      {/* Contenedor de los botones */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Header title="Datos del empleador" subtitle="Areas y Cargos" />
        </Grid>
      </Grid>
      <Box mt="20px" width="100%" border={1} borderColor="primary.main" p={2}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ cursor: 'pointer' }}
            onClick={handleShowAreas}
          >
            Áreas
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginLeft: 10, cursor: 'pointer' }}
            onClick={handleShowCargos}
          >
            Cargos
          </Typography>

        </div>
      </Box>
      {/* El contenedor con el searchbox */}
      <Box mt="20px" width="100%" border={1} borderColor="primary.main" p={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
            <TextField
              label="Nombre de Área o Cargo"
              variant="outlined"
              sx={{ marginRight: "8px", width: "140px" }}
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Grid>
        </Grid>
      </Box>
      {/* la tabla empleados */}
      {showAreasTable && <TablaAreas filteredData={filteredData} />}
      {showCargosTable && <TablaCargos filteredData={filteredData} />}
    </Box>
  );
};

export default DatosEmpleador;