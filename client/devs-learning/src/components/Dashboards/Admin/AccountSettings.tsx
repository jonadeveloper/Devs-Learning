import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const AccountSettings: React.FC = () => {
  return (
    <div>
      <Typography variant="h3">Account settings</Typography>
      ACÁ SE RENDERIZA LA CONFIGURACIÓN DE LA CUENTA
    </div>
  );
};

export default AccountSettings;