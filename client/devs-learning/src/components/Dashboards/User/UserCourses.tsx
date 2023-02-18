import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import IconButton from "@mui/material/IconButton";

function createData(
  name: string,
  level: string,
  duration: number,
  instructor: string,
  price: number
) {
  return { name, level, duration, instructor, price };
}

const rows = [
  createData("Curso 1", "high", 24, "Emiliano", 4500),
  createData("Curso 2", "beginner", 5, "Fran", 2750),
  createData("Curso 3", "intermediate", 14, "Jonathan", 12000),
];

export default function BasicTable() {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cursos</TableCell>
            <TableCell align="left">Nivel</TableCell>
            <TableCell align="center">Duracion</TableCell>
            <TableCell align="center">Instructor</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="center">Rating and Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.level}</TableCell>
              <TableCell align="center">{row.duration}</TableCell>
              <TableCell align="center">{row.instructor}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <IconButton>
                    <ChatRoundedIcon color="primary" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
