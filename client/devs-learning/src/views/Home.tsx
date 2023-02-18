import { Box } from "@mui/system";
import { CardList } from "../components/Cards/CardList";
import { useAppSelector } from "../hooks/hooksRedux";

export const Home = () => {
  const { coursesFiltered } = useAppSelector((state) => state.courses);

  return (
    <div>
      <Box>
        <CardList cards={coursesFiltered} />
      </Box>
    </div>
  );
};
