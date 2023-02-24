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
import { getCoursesByName } from "../../../redux/courses/actions";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";

import {
  userEmail,
  userFullname,
  userLastLogin,
  userPhoneNumber,
} from "../../../router/index";

export interface CourseNames {
  name: string;
}
export interface RatingContent {
  rating: string;
  comment: string;
  user: any;
}

export interface Rating {
  nameCourse: string;
  rating: RatingContent;
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
  rating: Rating[];
}

const BoughtCourse1: BoughtCourse = {
  categories: [],
  description: "",
  id: "1",
  level: "",
  name: "No has comprado ningún curso aún",
  price: 0,
  duration: 0,
  instructor: "",
  descriptionComplete: "",
  img: "",
  rating: [],
};

export default function BasicTable() {
  const dispatch = useAppDispatch();
  const CoursesNames = useAppSelector((state) => state.users.courses);
  console.log("Courses Names");
  console.log(CoursesNames);
  const AllCourses = useAppSelector((state) => state.courses.courses);
  //const current = useAppSelector((state) => state.courses.currentCourse);
  console.log("Current");
  //console.log(current);

  let CoursesByName: any = [];

  if (CoursesNames && CoursesNames.length > 0) {
    CoursesByName = AllCourses.filter((course) => {
      const newName = course.name.toLowerCase().split(" ");
      const newNameWithLine = newName.join("-");
      for (let i = 0; i < CoursesNames.length; i++) {
        const element: any = CoursesNames[i];
        if (element.name === newNameWithLine) return course;
      }
    });
  }
  const rows = CoursesByName;
  console.log(`cursos comprados por ${userFullname} `);
  console.log(rows);

  const [value, setValue] = React.useState<number | null>(2);
  const [comment, setComment] = useState("");

  React.useEffect(() => {
    dispatch(getBoughtCoursesNames(userEmail));
    console.log(`cursos comprados por ${userFullname}`);
    console.log(CoursesNames);
    console.log(rows);
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
          {rows.map((row: any) => (
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
