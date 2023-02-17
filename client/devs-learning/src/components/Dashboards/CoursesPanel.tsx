import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const CoursesPanel: React.FC = () => {
  return (
    <div>
      <Typography variant="h3">Courses</Typography>
      ACÁ SE RENDERIZA LA INFORMACION SOBRE CURSOS
    </div>
  );
};

export default CoursesPanel;