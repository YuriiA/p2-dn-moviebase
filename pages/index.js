import { Center, Heading } from "@chakra-ui/react";
import Layout from "components/Layout";
import Slider from "components/Slider";

export default function Home() {
  return (
    <Layout title="Moviebase">
      {/* <Center h="full"> */}
      <Slider />
      {/* </Center> */}
    </Layout>
  );
}
