const {Client} = require("graphql-ld");
const {QueryEngineComunica} = require("graphql-ld-comunica");

const context = {
  "@context": {
    "dhb": "https://dancehallbattle.org/ontology/",
    "age": "dhb:age",
    "level": "dhb:level",
    "gender": "dhb:gender"
  }
};

const comunicaConfig = {
  sources: [ 'https://data.dancehallbattle.org/data']
};

const validAges = ['', 'kids', 'adults', '-11', '12-16', '-15', 'teens', '15+', 'new generation', 'juniors', '16+'];
const validGenders = ['', 'female', 'male'];
const validLevels = ['', 'my first battle', 'amateur', 'beginners', 'pro', 'all'];

const client = new Client({context, queryEngine: new QueryEngineComunica(comunicaConfig)});

validateAges();
validateGenders();
validateLevels();

async function validateAges() {
  const query = `
  query {
    id @single
    age @single
  }`;

  const {data} = await client.query({query});

  data.forEach(item => {
    if (validAges.indexOf(item.age) === -1) {
      console.log(item);
    }
  });
}

async function validateGenders() {
  const query = `
  query {
    id @single
    gender @single
  }`;

  const {data} = await client.query({query});

  data.forEach(item => {
    if (validGenders.indexOf(item.gender) === -1) {
      console.log(item);
    }
  });
}

async function validateLevels() {
  const query = `
  query {
    id @single
    level @single
  }`;

  const {data} = await client.query({query});

  data.forEach(item => {
    if (validLevels.indexOf(item.level) === -1) {
      console.log(item);
    }
  });
}