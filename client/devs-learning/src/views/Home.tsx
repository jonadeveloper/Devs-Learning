import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { CardList } from "../components/Cards/CardList";
import { useAppDispatch, useAppSelector } from "../hooks/hooksRedux";

export const Home = () => {
  const { coursesFiltered } = useAppSelector((state) => state.courses);

  return (
    <div>
      <Box>
        <CardList cards={coursesFiltered} />
      </Box>
    </div>
  );
};
