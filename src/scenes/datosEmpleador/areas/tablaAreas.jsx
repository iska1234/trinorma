/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { areasColumns } from "./areasColumns";
import { areasData } from "./areasData";

const TablaAreas = ({ filteredData }) => {
  const theme = useTheme();
  const tableRef = useRef(null);
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [columnWidth, setColumnWidth] = useState(300);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (tableRef.current) {
        const tableWidth = tableRef.current.offsetWidth;
        const newColumnWidth = isSidebarActive
          ? tableWidth / areasColumns.length
          : 200;
        setColumnWidth(newColumnWidth);
      };
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarActive]);

  // Filtrar los datos si hay un término de búsqueda
  const filteredAreasData = filteredData.length > 0 ? filteredData : areasData;

  return (
    <Box>
      {/* Agregar un campo de búsqueda para Áreas */}
      <TextField
        label="Buscar Área"
        variant="outlined"
        sx={{ width: '100%' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper} mt="20px">
        <Table aria-label="areas-table" ref={tableRef}>
          <TableHead>
            <TableRow>
              {areasColumns.map((column) => (
                <TableCell
                  key={column.field}
                  style={{
                    flex: 1,
                    minWidth: column.minWidth,
                    width: columnWidth + 'px',
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAreasData.map((row) => (
              <TableRow key={row._id}>
                {areasColumns.map((column) => (
                  <TableCell
                    key={column.field}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.field === 'actions' ? (
                      <div>
                        <IconButton sx={{ bgcolor: '#2196f3', margin: '1px' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton sx={{ bgcolor: '#f50057', margin: '1px' }}>
                          <DeleteIcon />
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
    </Box>
  );
};

export default TablaAreas;