import * as React from "react";
import { useState } from "react";
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
import { StringMappingType } from "typescript";
import { Button, TextField, Typography } from "@mui/material/";
import DoneIcon from "@mui/icons-material/Done";
import CourseComment from "./UserComment";
import BasicRating from "./UserRating";
import { getBoughtCoursesNames } from "../../../redux/users/actions";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";

import {
  userEmail,
  userFullname,
  userLastLogin,
  userPhoneNumber,
} from "../../../router/index";

export interface Comment {
  id: string;
  comment: string;
}

export interface Category {
  name: string;
}

export interface BoughtCourse {
  categories: Category[];
  description: string;
  id: string;
  level: string;
  name: string;
  price: number;
  duration: number;
  instructor: string;
  descriptionComplete: string;
  img: string;
  rating: number;
  comments: Comment[];
}

const BoughtCourse1: BoughtCourse = {
  categories: [{ name: "Front-end" }, { name: "Back-end" }],
  description: "",
  id: "1",
  level: "intermediate",
  name: "FullStack Course",
  price: 12000,
  duration: 24,
  instructor: "Henry",
  descriptionComplete: "",
  img: "",
  rating: 0,
  comments: [],
};

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
  createData(
    BoughtCourse1.name,
    BoughtCourse1.level,
    BoughtCourse1.duration,
    BoughtCourse1.instructor,
    BoughtCourse1.price
  ),
  createData("Curso 2", "beginner", 5, "Fran", 2750),
  createData("Curso 3", "intermediate", 14, "Jonathan", 12000),
];

export default function BasicTable() {
  const dispatch = useAppDispatch();
  const CoursesName = useAppSelector((state) => state.users.courses);

  const [value, setValue] = React.useState<number | null>(2);
  const [comment, setComment] = useState("");

  React.useEffect(() => {
    dispatch(getBoughtCoursesNames(userEmail));
    console.log("cursos comprados");
    console.log(userEmail);
    console.log(CoursesName);
  }, []);

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
                  <BasicRating courseId={row.name} userId={userEmail} />
                  <CourseComment courseId={row.name} userId={userEmail} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
