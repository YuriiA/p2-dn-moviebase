import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  Link,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import HistoryButton from "components/HistoryButton";

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
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
  if (data.success === false) {
    return <Text color="red">{data.status_message}</Text>;
  }
  return (
    <Stack direction={["column", "row"]} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <HistoryButton />
        </HStack>
        <Image
          src={buildImageUrl(data.poster_path, "w300")}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
        />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="blue" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="blue" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <Box bg="blue.100" color="black" borderRadius="8">
          {data.overview}
        </Box>
        <Link href={`${data.homepage}`} isExternal color="blue.300">
          {!data.homepage.length ? (
            <Text> Oficial site not available </Text>
          ) : (
            <Text> Read more on oficial site..</Text>
          )}
        </Link>
        <Box pt={4}>Rating: {data.vote_average}</Box>
      </Stack>
    </Stack>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
