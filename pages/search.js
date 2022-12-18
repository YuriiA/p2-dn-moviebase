import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import {
  Input,
  IconButton,
  Container,
  // UnorderedList as List,
  List,
  ListItem,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Badge,
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Layout from "components/Layout";
import searchStyles from "../styles/search.module.css";

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState("");

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || "");
  }, [terms]);
  console.log(text);
  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}
function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  return (
    <List className={searchStyles.searchResults} stylePosition="inside">
      {data.results.map(({ id, title, release_date, poster_path }) => (
        <ListItem key={id}>
          <Link href={`/movies/${id}`} passHref legacyBehavior>
            <Button
              style={{ textDecoration: "none" }}
              bg="blue.400"
              className={searchStyles.item}
              as="a"
              variant="link"
              rightIcon={<Badge>Released: {release_date}</Badge>}
            >
              <Text> {`${title.slice(0, 20)}`} </Text>
              <Text>{`${title.slice(20, 50)}`} </Text>

              <Image
                src={buildImageUrl(poster_path, "w300")}
                alt="Movie poster"
                layout="responsive"
                width="300"
                height="450"
                objectFit="contain"
                unoptimized
              />
            </Button>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
