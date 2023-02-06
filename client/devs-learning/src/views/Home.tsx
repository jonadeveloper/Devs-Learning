import React from "react";
import { Box } from "@mui/system";
import { CardList } from "../components/Cards/CardList";
import NavBar from "../components/navBar/NavBar";
export const Home = () => {
  return (
    <div>
      <Box>
        <NavBar />
        <CardList />
      </Box>
    </div>
  );
};
