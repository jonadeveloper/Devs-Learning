import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";

import React, { useEffect } from "react";
import { Typography, Link, Button } from "@mui/material/";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Stack from "@mui/material/Stack";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        borderTop={0.5}
        bgcolor="black"
        color="white"
        py={4}
      >
        <Box px={2}>
          <Typography variant="caption">
            "Impulsa tu carrera en programación con nosotros."
          </Typography>
        </Box>

        <Box display="flex" justifySelf="center">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            Devs Learning
          </Typography>
        </Box>

        <Stack display="flex" flexDirection="row" alignItems="center">
          <Typography variant="caption">NOSOTROS</Typography>

          <IconButton color="inherit" href="https://www.linkedin.com">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.github.com">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com">
            <InstagramIcon />
          </IconButton>
        </Stack>
      </Box>
    </footer>
  );
};

export default Footer;
