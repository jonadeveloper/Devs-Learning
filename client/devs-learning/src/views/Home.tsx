import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { CardList } from "../components/Cards/CardList";
import NavBar from "../components/navBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/hooksRedux";
import { getCourses } from "../redux/courses/actions";
export const Home = () => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses)
  useEffect(() => {
    dispatch(getCourses())
  }, [])

  return (
    <div>
      <Box>
        <NavBar />
        <CardList cards={courses} />
      </Box>
    </div>
  );
};
