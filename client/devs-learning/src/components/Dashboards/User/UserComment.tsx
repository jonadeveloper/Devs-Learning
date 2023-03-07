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

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface CourseCommentProps {
  course: CoursoBack;
  userId: any;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourseComment: React.FC<CourseCommentProps> = ({ course, userId }) => {
  const dispatch = useAppDispatch();
  const currentCourse = useAppSelector((state) => state.courses.currentCourse);
  const [comment, setComment] = useState("");
  const [value, setValue] = React.useState<number | null>(0);
  //for Alerts
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      (rat: any) => rat.user === userId.toString()
    );
    if (existingRating) {
      setComment(existingRating[0].comment);
      setValue(existingRating[0].rating);
    }
  };

  //Handlers.
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    if (!showInput) {
      getCommentIfExists();
      dispatch(setCurrentCourse(course));
    }

    setShowInput(!showInput);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí podrías enviar el comentario a tu backend o hacer lo que necesites
    dispatch(AddRating(RATING));
    setShowInput(false);
    setOpen(true);
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          color="info"
        >
          Your review has been updated!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CourseComment;
