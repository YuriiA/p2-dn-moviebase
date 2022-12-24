import { Flex, Box, Progress, Text, Button, Image } from "@chakra-ui/react";
import Slider from "components/Slider";
import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import Link from "next/link";
import searchStyles from "../styles/search.module.css";

export default function HomePage() {
  const history = useSWR("api/history");
  const watchlist = useSWR("api/watchlist");
  const upcoming = useSWR("api/upcoming");
  const trending = useSWR("api/trending");

  const historyMovies = history.data?.slice(0, 6);
  const watchlistMovies = watchlist.data?.slice(0, 6);
  const trendingMovies = trending.data?.results.slice(0, 6);
  const upcomingMovies = upcoming.data?.results.slice(0, 6);

  console.log(upcomingMovies);

  if (
    !historyMovies ||
    !watchlistMovies ||
    !trendingMovies ||
    !upcomingMovies
  ) {
    return <Progress size="lg" isIndeterminate />;
  }

  return (
    <div>
      <Slider />
      {/* Trending */}

      <Text m={5}>Trending Now:</Text>

      <Flex wrap="wrap" justify="space-around">
        {trendingMovies?.map(({ id, title, poster_path }) => (
          <Box overflow="hidden" key={id}>
            <Link href={`/movies/${id}`} passHref legacyBehavior>
              <Button
                style={{ textDecoration: "none" }}
                bg="blue.400"
                className={searchStyles.item}
                as="a"
                variant="link"
              >
                <Text color="black"> {title} </Text>

                <Image
                  src={buildImageUrl(poster_path, "w300")}
                  alt="Movie poster"
                  layout="responsive"
                  width="300"
                  height="350"
                  objectFit="contain"
                  unoptimized
                />
              </Button>
            </Link>
          </Box>
        ))}
      </Flex>

      {/* History */}

      <Text m={5}>Watch again:</Text>

      <Flex wrap="wrap" justify="space-around">
        {historyMovies?.map(({ id, title, poster }) => (
          <Box overflow="hidden" key={id}>
            <Link href={`/movies/${id}`} passHref legacyBehavior>
              <Button
                style={{ textDecoration: "none" }}
                bg="blue.400"
                className={searchStyles.item}
                as="a"
                variant="link"
              >
                <Text color="black"> {title} </Text>

                <Image
                  src={buildImageUrl(poster, "w300")}
                  alt="Movie poster"
                  layout="responsive"
                  width="300"
                  height="350"
                  objectFit="contain"
                  unoptimized
                />
              </Button>
            </Link>
          </Box>
        ))}
      </Flex>

      {/* Watchlist */}

      <Text m={5}>Your Watchlist:</Text>

      <Flex wrap="wrap" justify="space-around">
        {watchlistMovies?.map(({ id, title, poster }) => (
          <Box overflow="hidden" key={id}>
            <Link href={`/movies/${id}`} passHref legacyBehavior>
              <Button
                style={{ textDecoration: "none" }}
                bg="blue.400"
                className={searchStyles.item}
                as="a"
                variant="link"
              >
                <Text color="black"> {title} </Text>

                <Image
                  src={buildImageUrl(poster, "w300")}
                  alt="Movie poster"
                  layout="responsive"
                  width="300"
                  height="350"
                  objectFit="contain"
                  unoptimized
                />
              </Button>
            </Link>
          </Box>
        ))}
      </Flex>

      {/* Upcoming */}

      <Text m={5}>Available soon:</Text>

      <Flex wrap="wrap" justify="space-around">
        {upcomingMovies?.map(({ id, title, poster_path }) => (
          <Box overflow="hidden" key={id}>
            <Link href={`/movies/${id}`} passHref legacyBehavior>
              <Button
                style={{ textDecoration: "none" }}
                bg="blue.400"
                className={searchStyles.item}
                as="a"
                variant="link"
              >
                <Text color="black"> {title} </Text>

                <Image
                  src={buildImageUrl(poster_path, "w300")}
                  alt="Movie poster"
                  layout="responsive"
                  width="300"
                  height="350"
                  objectFit="contain"
                  unoptimized
                />
              </Button>
            </Link>
          </Box>
        ))}
      </Flex>
    </div>
  );
}
