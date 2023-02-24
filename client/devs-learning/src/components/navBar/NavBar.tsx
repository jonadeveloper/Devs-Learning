import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { CartComponent } from "../Cart/Cart";
import { signOutAction } from "../../redux/users/actions";
import { profileImg } from "../../router/index";
import { setItem } from "../../utils/localStorage";
import { createMPButton } from "../meliButton/meliButton";

const pages = [
  {
    name: "Courses",
    route: "/courses",
  },
  {
    name: "Categories",
    route: "/categories",
  },
];
const settings = [
  {
    name: "Profile",
    route: "/profile",
  },
  {
    name: "Create Course (Temp)",
    route: "/dashboard/create/course",
  },
  {
    name: "Dashboard",
    route: "/",
  },
];
function ResponsiveAppBar() {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      success: {
        main: "#2B788B",
      },
      secondary: {
        main: "#000000",
      },
    },
  });
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { status } = useAppSelector((state) => state.users);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    handleCloseNavMenu();
    dispatch(signOutAction());
    setItem("loggedUserInfo", undefined);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleStateViewDrawer = () => {
    setOpen((state) => !state);
  };

  const { cart } = useAppSelector((state) => state.courses);

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/auth/signup");
  };

  const handleLogin = () => {
    navigate("/auth/signin");
  };

  //MP button

  React.useEffect(() => {
    createMPButton(cart);
  }, [open]);

  ///////////////////////////////////

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <NavLink to="/">Devs Learning</NavLink>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <NavLink to={page.route}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Link
              href="/"
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Devs
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  <NavLink to={page.route}>{page.name}</NavLink>
                </Button>
              ))}
            </Box>
            <Stack spacing={2} direction="row" margin={2}>
              <IconButton
                color="secondary"
                onClick={() => handleStateViewDrawer()}
              >
                <Badge color="secondary" badgeContent={cart.length}>
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
              <Button
                onClick={handleLogin}
                color="secondary"
                variant="text"
                sx={{ display: status === "logged" ? "none" : "block" }}
              >
                Log in
              </Button>
              <Button
                onClick={handleRegister}
                variant="contained"
                color="success"
                sx={{ display: status === "logged" ? "none" : "block" }}
              >
                Sign Up
              </Button>
            </Stack>
            <Box
              sx={{
                flexGrow: 0,
                display: status !== "logged" ? "none" : "block",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="ProfileImage"
                    src={
                      profileImg !== null
                        ? profileImg
                        : "/static/images/avatar/2.jpg"
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <NavLink to={setting.route}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
                <MenuItem key={"Logout"} onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <CartComponent
        open={open}
        handleStateViewDrawer={handleStateViewDrawer}
      />
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
