const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3000;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

app.use(cors());
app.use(express.json());

app.get("/tokenPrice", async (req, res) => {
  const { query } = req;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    chain: EvmChain.CRONOS,
    address: query.addressOne,
  });

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    chain: EvmChain.CRONOS,
    address: query.addressTwo,
  });

  const usdPrices = {
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice
  }


  return res.status(200).json({usdPrices});
});

Moralis.start({
  apiKey: "mYsV9sfWP7TxXbzcsD3XkizcZxTyo3cgEjsEzFNKEpReheNQifFJBy0WxZ2srJk8",
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});