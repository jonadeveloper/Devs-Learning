import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";

interface CourseRatingProps {
  courseId: string;
  userId: any;
}

const BasicRating: React.FC<CourseRatingProps> = ({ courseId, userId }) => {
  const [value, setValue] = React.useState<number | null>(0);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};

export default BasicRating;
