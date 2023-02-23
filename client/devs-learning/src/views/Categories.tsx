import { Box, Fab, Toolbar } from "@mui/material";
import { CategoryCard } from "../components/Categories/CategoryCard";
import ScrollTop, { Props2 } from "../components/ScrollTop/ScrollTop";
import { useAppSelector } from "../hooks/hooksRedux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";



export const Categories = () => {
  const { categories } = useAppSelector((state) => state.courses);
  return (
    <Box sx={{ px: { xl: 10, lg: 8, md: 6, sm: 4, xs: 2 }, mt: 3 }}>
      <Toolbar id="back-to-top-anchor">
      </Toolbar>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {categories.map((category) => {
          return <CategoryCard category={category} />;
        })}
      </Box>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
};
