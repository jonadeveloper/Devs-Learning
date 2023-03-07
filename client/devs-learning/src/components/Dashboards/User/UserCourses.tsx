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
import { getSales } from "../../../redux/sales/actions";
import { format } from "date-fns";

import {
  userEmail,
  userFullname,
  userLastLogin,
  userPhoneNumber,
} from "../../../router/index";

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
  const AllSales = useAppSelector((state) => state.sales.sales);
  const AllCourses = useAppSelector((state) => state.courses.courses);

  const UserSales = AllSales.filter((sale) => {
    return sale.email === userEmail.toString();
  });

  const DatesId = UserSales.map((sale) => {
    return { date: sale.createdAt, courseId: sale.courseId, courseData: {} };
  });

  let CoursesByName: any = [];

  let SalesWithDate: any = [];

  if (CoursesNames && CoursesNames.length > 0) {
    CoursesByName = AllCourses.filter((course) => {
      for (let i = 0; i < CoursesNames.length; i++) {
        const element: any = CoursesNames[i];
        if (element.name === course.name) return course;
      }
    });
  }

  if (DatesId && DatesId.length > 0) {
    DatesId.forEach((date) => {
      for (let i = 0; i < CoursesByName.length; i++) {
        if (CoursesByName[i].id === date.courseId)
          SalesWithDate.push({
            date: DatesId[i].date,
            courseId: DatesId[i].courseId,
            courseData: CoursesByName[i],
          });
      }
    });
  }

  const rows = SalesWithDate;

  React.useEffect(() => {
    dispatch(getSales());
    dispatch(getBoughtCoursesNames(userEmail));
  }, []);

  function formatearFecha(fecha: string) {
    return format(new Date(fecha), "yyyy-MM-dd HH:mm:ss");
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight="bold" variant="body1">
                Courses
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography fontWeight="bold" variant="body1">
                Level
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography fontWeight="bold" variant="body1">
                Duration
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography fontWeight="bold" variant="body1">
                Instructor
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight="bold" variant="body1">
                Price
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight="bold" variant="body1">
                Purchase date
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography fontWeight="bold" variant="body1">
                Rating and Comment
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography
                  color="primary"
                  component="a"
                  href={`/courseDetail/${row.courseData.id}`}
                >
                  {row.courseData.name}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="overline">
                  {row.courseData.level}
                </Typography>
              </TableCell>
              <TableCell align="center">
                {row.courseData.duration} hs.
              </TableCell>
              <TableCell align="center">{row.courseData.instructor}</TableCell>
              <TableCell align="right">$ {row.courseData.price}</TableCell>
              <TableCell align="right">{formatearFecha(row.date)}</TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CourseComment course={row.courseData} userId={userEmail} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
