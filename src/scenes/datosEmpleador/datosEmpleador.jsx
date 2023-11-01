import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import TablaAreas from "./areas/tablaAreas";
import TablaCargos from "./cargos/tablaCargos";
import { areasData } from "./areas/areasData";
import { cargosData } from "./cargos/cargosData";
import {
  SettingsOutlined,
  Add as AddIcon,
  TableChart as ImportExcelIcon,
  SaveAlt as ExportExcelIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

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

  //modal 1
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    //guardar datos
    setIsModalOpen(false);
  };

  //modal 2
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const handleOpenModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleSave2 = () => {
    //guardar datos
    setIsModalOpen2(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      {/* Contenedor de los botones */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Header title="Datos del empleador" subtitle="Areas y Cargos" />
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Toolbar>
            <Button
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              size="small"
              variant="contained"
              color="info"
              sx={{ margin: "2px", width: "auto" }}
              onClick={handleOpenModal}
            >
              Agregar Área
            </Button>
            <Button
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              size="small"
              variant="contained"
              color="info"
              sx={{ margin: "2px", width: "auto" }}
              onClick={handleOpenModal2}
            >
              Agregar Cargo
            </Button>
          </Toolbar>
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
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Agregar Area
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography variant="subtitle5">Área:</Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextField
                    label="Ingrese al Área"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography variant="subtitle6">Email:</Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextField
                    label="Ingrese el email"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" color="success" onClick={handleSave}>
            Registrar
          </Button>
        </Box>
      </Modal>
      <Modal open={isModalOpen2} onClose={handleCloseModal2}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Agregar Cargo
            </Typography>
            <IconButton onClick={handleCloseModal2}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography variant="subtitle1">Cargo:</Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextField
                    label="Cargo"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography variant="subtitle2">Jefe Inmediato:</Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextField
                    label="Jefe Inmediato"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" color="success" onClick={handleSave2}>
            Guardar Cargo
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default DatosEmpleador;