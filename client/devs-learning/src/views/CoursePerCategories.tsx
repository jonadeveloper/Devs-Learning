import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardList } from "../components/Cards/CardList";
import { useAppDispatch, useAppSelector } from "../hooks/hooksRedux";
import { setFiltered } from "../redux/courses/actions";

export const CoursePerCategories = () => {
  const { name } = useParams();
  const { courses, coursesFiltered } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setFiltered("", courses, coursesFiltered, "", name ? name.toString() : "")
    );
  }, [name]);

  return (
    <Box>
      <CardList cards={coursesFiltered} />
    </Box>
  );
};
