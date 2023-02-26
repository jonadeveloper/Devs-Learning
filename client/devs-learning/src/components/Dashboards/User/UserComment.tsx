import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material/";
import DoneIcon from "@mui/icons-material/Done";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { CoursoBack } from "../../Cards/Card";
import { setCurrentCourse } from "../../../redux/courses/actions";
import { AddRating } from "../../../redux/courses/actions";

interface CourseCommentProps {
  course: CoursoBack;
  userId: any;
}

const CourseComment: React.FC<CourseCommentProps> = ({ course, userId }) => {
  const dispatch = useAppDispatch();
  const currentCourse = useAppSelector((state) => state.courses.currentCourse);
  const [comment, setComment] = useState("");
  const [value, setValue] = React.useState<number | null>(0);

  /*   const [rating, setRating] = useState({
    nameCourse: course.name,
    rating: {
      rating: 0,
      comment: "",
      user: userId,
    },
  }); */

  let RATING = {
    nameCourse: course.name,
    rating: {
      rating: value,
      comment: comment,
      user: userId,
    },
  };

  //getCommentIfExists.
  const getCommentIfExists = async () => {
    const existingRating = course.rating.filter(
      (rat: any) => (rat.user = userId)
    );
    console.log(currentCourse);
    console.log(existingRating);
    if (existingRating) {
      console.log(existingRating);
      setComment(existingRating.comment);
      setValue(existingRating.rating);
    }
  };

  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    if (!showInput) {
      setShowInput(!showInput);
      dispatch(setCurrentCourse(course));
      getCommentIfExists();
      console.log("Curso Actual");
      console.log(currentCourse);
    }
    setShowInput(!showInput);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);

    console.log(comment);
    console.log(RATING);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí podrías enviar el comentario a tu backend o hacer lo que necesites
    dispatch(AddRating(RATING));
    console.log("Nuevo rating");
    console.log(currentCourse.rating);
    setShowInput(false);
  };

  useEffect(() => {
    if (currentCourse.name !== course.name) {
      setShowInput(false);
    }
  });

  return (
    <div>
      {!showInput && (
        <IconButton color="primary" onClick={handleButtonClick}>
          <ChatRoundedIcon />
        </IconButton>
      )}

      {showInput && (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                console.log(RATING);
                console.log(value + ", " + newValue);
              }}
            />
            <Box display="flex" mt={1}>
              <TextField
                label={"write your comment"}
                variant="outlined"
                value={comment}
                onChange={handleInputChange}
                fullWidth
                required
                multiline
              />
              <IconButton type="submit" color="primary">
                <DoneIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleButtonClick}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default CourseComment;
