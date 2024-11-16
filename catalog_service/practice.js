import express from "express";

const app = express();

const dbClient = {
  /** Returns a static value with the provided query */
  execQuery: (query) => {
    const random = Math.random();
    const fail = random > 0.75;
    if (query) console.log(`received query: ${query}`);
    console.log(`random: "${random}"; fail: "${fail}"`);
    if (fail) {
      throw new Error("Error fetching data");
    }
    return {
      query,
      url: "https://www.example.com/random.jpg",
    };
  },
};

app.get("/random", async (req, res) => {
  // TODO write an sql query or mongodb query to randomly fetch an image
  const query = `select * from exampleybl ORDER BY RAND() Limit 1`; // write a query here
  // handle the error state

  // if the function errors out send a status code of 500
  const response = await dbClient.execQuery(query);
  if(response?.url){
      res.json(response);
  } else {
    res.status(500).send('Internal sever error')
  }
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
 