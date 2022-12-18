import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import Link from "next/link";
import {
  Container,
  Flex,
  Box,
  List,
  ListItem,
  Progress,
  Text,
  VStack,
  Button,
  Image,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import searchStyles from "../styles/search.module.css";

function GetHistory() {
  const { data, error } = useSWR(`/api/history`);

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  return (
    <Flex wrap="wrap" justify="space-around" basis="0" grow="1">
      {data.map(({ id, title, tagline, poster, rating, date }) => (
        <Box overflow="hidden" key={id}>
          <Link href={`/movies/${id}`} passHref legacyBehavior>
            <Button
              style={{ textDecoration: "none" }}
              bg="blue.400"
              className={searchStyles.item}
              as="a"
              variant="link"
            >
              <Text color="black"> {`${title.slice(0, 20)}`} </Text>
              {/* word wrap, overflow not working */}
              <Text color="black">{`${title.slice(20, 50)}`} </Text>
              <Text as="i">{`${tagline.slice(0, 35)}...`}</Text>
              <Text as="sup">Added on: {date.slice(0, 10)}</Text>

              <Image
                src={buildImageUrl(poster, "w300")}
                alt="Movie poster"
                layout="responsive"
                width="300"
                height="450"
                objectFit="contain"
                unoptimized
              />
              <Text as="span">Rating: {rating?.toFixed(1)}</Text>
            </Button>
          </Link>
        </Box>
      ))}
    </Flex>
  );
}

const history = () => {
  return (
    <Layout title="History">
      <Container>
        <VStack spacing={4} align="stretch">
          <GetHistory />
        </VStack>
      </Container>
    </Layout>
  );
};

export default history;
