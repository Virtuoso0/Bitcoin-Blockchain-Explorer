import axios from "axios";

export default axios.create({
  baseURL: "https://blockchain.info/blocks/1642801011000?format=json",
});
