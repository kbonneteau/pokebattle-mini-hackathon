import axios from "axios";

const loadPokeData = async () => {
  const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`);
  console.log(data.data);
};

loadPokeData();
