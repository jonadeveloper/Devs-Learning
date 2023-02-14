import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooksRedux";
import Filter from "../Filter/Filter";
import { CardComponent, Course, CoursoBack } from "./Card";

interface Props {
  cards: CoursoBack[];
}
export const CardList = ({ cards }: Props) => {
  const [page, setPage] = useState(1);
  const { coursesFiltered } = useAppSelector((state) => state.courses);

  const onPagination = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [coursesFiltered]);

  return (
    <Box
      sx={{
        // height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        flexGrow: 1,
        gap: 4,
        p: 5,
      }}
      mt={5}
    >
      <Filter />
      <Grid container spacing={6}>
        {cards.map((card, index) => {
          if ((page - 1) * 8 <= index && page * 8 > index) {
            return <CardComponent key={index} card={card} index={index} />;
          }
        })}
      </Grid>
      <Pagination
        count={~~(cards.length / 8)}
        variant="outlined"
        onChange={onPagination}
      />
    </Box>
  );
};
