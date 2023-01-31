import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFrineds = () => {
  return axios.get("http://localhost:4000/friends");
};

export const PararellQueriesPage = () => {
  const { data: superheroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFrineds);

  return <div>PrarellQueries.page</div>;
};
