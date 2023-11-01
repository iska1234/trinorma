import React, { useEffect, useRef, useState } from 'react'

import {

    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
import { nuevoColumns } from './nuevoColumns';
import { nuevoData } from './nuevoData';



const TablaNuevo = () => {

  const theme = useTheme();
  const tableRef = useRef(null);
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [columnWidth, setColumnWidth] = useState(300);
  useEffect(() => {
    const handleResize = () => {
      if (tableRef.current) {
        const tableWidth = tableRef.current.offsetWidth;
        const newColumnWidth = isSidebarActive
          ? tableWidth / nuevoColumns.length
          : 200; // Ancho fijo cuando el sidebar está inactivo
        setColumnWidth(newColumnWidth);
      }
    };

    // Manejar el evento de cambio de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Llamar a handleResize para ajustar las columnas inicialmente
    handleResize();

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
    return (
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
    <Table aria-label="nuevo-table" ref={tableRef}>
      <TableHead>
        <TableRow>
          {nuevoColumns.map((column) => (
            <TableCell
              key={column.field}
              style={{
                flex: 1,
                minWidth: column.minWidth,
                width: columnWidth + "px",
              }}
            >
              {column.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {nuevoData.map((row) => (
          <TableRow key={row.ID}>
            {nuevoColumns.map((column) => (
              <TableCell
                key={column.field}
                align="left"
              >
                {column.field === "Req" ? (
                  <a href='#'>Ver</a>
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
    );
}

export default TablaNuevo