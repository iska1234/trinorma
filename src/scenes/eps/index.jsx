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
  import TablaNuevo from "./Nuevo/tablaNuevo";
  import { nuevoData } from "./Nuevo/nuevoData";
  
  
  const Eps = () => {
    const theme = useTheme();
    const [showNuevoTable, setShowNuevoTable] = useState(true);
    const [title, setTitle] = useState('Cargos');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
  
    const handleShowNuevo = () => {
      setShowNuevoTable(true);
      setTitle('Nuevo');
    };
  
    const handleSearchTermChange = (event) => {
      const newSearchTerm = event.target.value;
      setSearchTerm(newSearchTerm);
  
      let filteredData = [];
  
      if (showNuevoTable) {
        filteredData = nuevoData.filter((item) => {
          return item.area.toLowerCase().includes(newSearchTerm.toLowerCase());
        });
      }
  
      setFilteredData(filteredData);
    };
  
    return (
      <Box m="1.5rem 2.5rem">
        {/* Contenedor de los botones */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Header title="Eps" subtitle="Cargos" />
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
              onClick={handleShowNuevo}
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
                label="Nombre Cargo o jefe"
                variant="outlined"
                sx={{ marginRight: "8px", width: "aur" }}
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </Grid>
          </Grid>
        </Box>
        {/* la tabla empleados */}
        {showNuevoTable && <TablaNuevo filteredData={filteredData} />}
      </Box>
    );
  };
  
  export default Eps;