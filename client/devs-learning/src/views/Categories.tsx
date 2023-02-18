import { Box } from "@mui/material";
import { CategoryCard } from "../components/Categories/CategoryCard";
import { useAppSelector } from "../hooks/hooksRedux";

export const Categories = () => {
  const { categories } = useAppSelector((state) => state.courses);
  return (
    <Box sx={{ px: { xl: 10, lg: 8, md: 6, sm: 4, xs: 2 }, mt: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {categories.map((category) => {
          return <CategoryCard category={category} />;
        })}
      </Box>
    </Box>
  );
};
