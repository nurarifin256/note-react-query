import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import { useState } from "react";

// import { useQuery } from "react-query"; tidak terpakai lagi setelah react query di custom hooks
// import axios from "axios"; tidak terpakai lagi setelah react query di custom hooks

// tidak terpakai lagi setelah react query di custom hooks
// const fetchSuperHeroes = () => {
//   // return axios.get("http://localhost:4000/superheroes1"); //tes error handling dan error callback
//   return axios.get("http://localhost:4000/superheroes");
// };

export const RQSuperheroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("perform side effect after encountering error", error);
  };

  // sesudah menggunakan hooks
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  // sebelum menggunakan hooks
  // const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
  //   "super-heroes",
  //   fetchSuperHeroes,
  //   {
  // tanya chatGPT mana yg best practice
  // cacheTime: 5000,
  // staleTime: 0,
  // refech default
  // refetchOnMount: true, //best seting
  // refetchOnWindowFocus: "always",
  // polling untuk interval waktu fetching
  // refetchInterval: 2000,
  // refetchIntervalInBackground: true,

  // useQuery onclick button
  // enabled: false,

  // callback success atau error
  // onSuccess,
  // onError,

  // data transformation
  //     select: (data) => {
  //       const superHeroNames = data.data.map((hero) => hero.name);
  //       return superHeroNames;
  //     },
  //   }
  // );

  console.log(isLoading, isFetching); //untuk check feth data

  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    // console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes</h2>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      <button onClick={refetch}>Fetch Heroes</button>

      {/* menggunakan fetching data langsung */}
      {data?.data.map((hero) => {
        // return <div key={hero.id}>{hero.name}</div>;
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      {/* menggunakan data transformation */}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
