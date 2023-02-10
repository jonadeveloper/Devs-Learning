import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { CardList } from "../components/Cards/CardList";
import NavBar from "../components/navBar/NavBar";
import { useAppDispatch, useAppSelector } from "../hooks/hooksRedux";
import { getCourses } from "../redux/courses/actions";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { coursesFiltered } = useAppSelector((state) => state.courses);
  useEffect(() => {
    if (coursesFiltered.length < 1) {
      dispatch(getCourses());
    }
  }, [coursesFiltered]);

  return (
    <div>
      <Box>
        <NavBar />
        <CardList cards={coursesFiltered} />
      </Box>
    </div>
  );
};
