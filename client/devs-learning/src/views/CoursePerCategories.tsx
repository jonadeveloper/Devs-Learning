import { Box } from "@mui/system";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardList } from "../components/Cards/CardList";
import { useAppDispatch, useAppSelector } from "../hooks/hooksRedux";
import { setFiltered } from "../redux/courses/actions";

export const CoursePerCategories = () => {
  const { name } = useParams();
  const { courses, coursesFiltered } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (coursesFiltered.length > 0) {
      dispatch(
        setFiltered(
          "",
          courses,
          coursesFiltered,
          "",
          name ? name.toString() : ""
        )
      );
    }
  }, [name, courses]);

  return (
    <Box>
      <CardList cards={coursesFiltered} />
    </Box>
  );
};
