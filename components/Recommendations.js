import {
  Center,
  CircularProgress,
  Flex,
  Box,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import Link from "next/link";
import searchStyles from "../styles/search.module.css";

const Recommendations = ({ id }) => {
  const { data, error } = useSWR(id && `/api/recommendations/${id}`);

  if (error) {
    return (
      <Text color="red">
        Error fetching recomended movies: {JSON.stringify(error)}
      </Text>
    );
  }

  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <Flex wrap="wrap" justify="space-around" basis="0" grow="1">
      {data.results.length > 0 &&
        data.results.slice(0, 20).map((movie) => (
          <Box key={id}>
            <Link href={`/movies/${movie.id}`} passHref legacyBehavior>
              <Button
                style={{ textDecoration: "none" }}
                bg="blue.400"
                className={searchStyles.item}
                as="a"
                variant="link"
              >
                <Text color="black"> {movie.title.slice(0, 20)} </Text>

                <Text color="black">{movie.title.slice(20, 50)} </Text>

                <Image
                  src={buildImageUrl(movie.poster_path, "w300")}
                  alt="Movie poster"
                  layout="responsive"
                  width="300"
                  height="450"
                  objectFit="contain"
                  unoptimized
                />
                <Text as="span">Rating: {movie.vote_average?.toFixed(1)}</Text>
              </Button>
            </Link>
          </Box>
        ))}
    </Flex>
  );
};
export default Recommendations;
