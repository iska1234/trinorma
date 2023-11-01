import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import { employeeData } from "./employdata";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

import {
  SettingsOutlined,
  Add as AddIcon,
  TableChart as ImportExcelIcon,
  SaveAlt as ExportExcelIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { employeeColumns } from "./employeeColumns";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Empleado = () => {
  const theme = useTheme();
  const sidebarWidth = theme.breakpoints.values["md"];

  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [fechaIngresoEmpresa, setFechaIngresoEmpresa] = useState(null);
  const [fechaIngresoArea, setFechaIngresoArea] = useState(null);

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
          <Header title="Empleados" subtitle="Lista de empleados" />
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Toolbar>
            <Button
              startIcon={<ImportExcelIcon sx={{ fontSize: 16 }} />}
              size="small"
              variant="contained"
              color="success"
              sx={{ margin: "2px", width: "auto" }}
            >
              Importar Excel
            </Button>
            <Button
              startIcon={<ExportExcelIcon sx={{ fontSize: 16 }} />}
              size="small"
              variant="contained"
              color="success"
              sx={{ margin: "2px", width: "auto" }}
            >
              Exportar Excel
            </Button>
            <Button
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              size="small"
              variant="contained"
              color="info"
              sx={{ margin: "2px", width: "auto" }}
              onClick={handleOpenModal}
            >
              Agregar Trabajador
            </Button>
            <Button
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              size="small"
              variant="contained"
              color="info"
              sx={{ margin: "2px", width: "auto" }}
              onClick={handleOpenModal2}
            >
              Agregar Sede
            </Button>
          </Toolbar>
        </Grid>
      </Grid>
      <Box mt="20px" width="100%" border={1} borderColor="primary.main" p={2}>
        <Typography variant="h6" gutterBottom>
          Muestra los trabajadores disponibles
        </Typography>
      </Box>
      {/* El contenedor con el searchbox */}
      <Box mt="20px" width="100%" border={1} borderColor="primary.main" p={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Trabajadores
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <TextField
              label="DNI Trabajador"
              variant="outlined"
              sx={{ marginRight: "8px", width: "140px" }}
            />
            <Button variant="contained" color="success">
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* la tabla empleados */}
      <TableContainer
        component={Paper}
        mt="20px"
        sx={{
          border: "none",
          "& .MuiTable-root": {
            border: "none",
          },
          "& .MuiTableCell-root": {
            borderBottom: "none",
          },
          "& .MuiTableHead-root": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiTableBody-root": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiTableFooter-root": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <Table aria-label="employee-table">
          <TableHead>
            <TableRow>
              {employeeColumns.map((column) => (
                <TableCell
                  key={column.field}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((row) => (
              <TableRow key={row._id}>
                {employeeColumns.map((column) => (
                  <TableCell
                    key={column.field}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.field === "actions" ? (
                      <div>
                        <IconButton
                          sx={{ bgcolor: "#2196f3", margin: "1px" }} // Fondo azul para el botón de editar
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{ bgcolor: "#f50057", margin: "1px" }} // Fondo rojo para el botón de eliminar
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          sx={{ bgcolor: "#9e9e9e", margin: "1px" }} // Fondo gris claro para el botón de historial
                        >
                          <HistoryIcon />
                        </IconButton>
                      </div>
                    ) : (
                      row[column.field]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
              Agregar Trabajador
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
                  <Typography variant="subtitle1">DNI:</Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    display: "flex",
                    alignItems: "center   ",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextField
                    label="DNI"
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
                  <Typography variant="subtitle2">Nombre completo:</Typography>
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
                    label="Ingrese el nombre completo"
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
                  <Typography variant="subtitle3">
                    Fecha de cumpleaños:
                  </Typography>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker"]}
                      sx={{ width: "100%" }}
                    >
                      <DatePicker
                        value={fechaNacimiento}
                        onChange={(newValue) => setFechaNacimiento(newValue)}
                        sx={{ width: "100%" }}
                        views={["day", "month", "year"]}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
                  <Typography variant="subtitle4">Cargo:</Typography>
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
                    label="Ingrese el cargo"
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
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography variant="subtitle7">
                    Fecha ingreso a la empresa:
                  </Typography>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker"]}
                      sx={{ width: "100%" }}
                    >
                      <DatePicker
                        value={fechaIngresoEmpresa}
                        onChange={(newValue) =>
                          setFechaIngresoEmpresa(newValue)
                        }
                        sx={{ width: "100%" }}
                        views={["day", "month", "year"]}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
                  <Typography variant="subtitle8">
                    Fecha Ingreso al área:
                  </Typography>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker"]}
                      sx={{ width: "100%" }}
                    >
                      <DatePicker
                        value={fechaIngresoArea}
                        onChange={(newValue) => setFechaIngresoArea(newValue)}
                        sx={{ width: "100%" }}
                        views={["day", "month", "year"]}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
              Agregar Sede
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
                  <Typography variant="subtitle1">Sede:</Typography>
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
                    label="Sede"
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
            Guardar Sede
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Empleado;
