import { fetcher } from "utils/api";
import History from "models/History";
import dbConnect from "utils/dbConnect";

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  await dbConnect();

  const history = await History.find();

  res.status(200).json(history);
}
