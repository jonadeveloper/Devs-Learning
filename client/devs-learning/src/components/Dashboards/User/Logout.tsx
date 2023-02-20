import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import { setItem } from "../../../utils/localStorage";
import { signOutAction } from "../../../redux/users/actions";
import { useAppDispatch } from "../../../hooks/hooksRedux";

export default function LogOut() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setOpen(false);
    dispatch(signOutAction());
    setItem("loggedUserInfo", undefined);
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button onClick={handleLogout} endIcon={<LogoutIcon />}>
        Confirm Log Out
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleToggle}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
