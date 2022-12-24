import Layout from "components/Layout";
import { Container, Progress, Text } from "@chakra-ui/react";
import useSWR from "swr";
import Recommendations from "components/Recommendations";

const RecommendedMovies = () => {
  const { data, error } = useSWR(`/api/recommendations`);

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  return <Recommendations id={data.id} title={data.title} />;
};

export default function recommendations() {
  return (
    <Layout title="Recommendations">
      <Container>
        <RecommendedMovies />
      </Container>
    </Layout>
  );
}
