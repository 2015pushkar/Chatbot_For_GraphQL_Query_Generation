const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const parseUserInputLLM = require('./parseUserInputLLM');

// Load JSON data from the data folder
const persons = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'persons.json'), 'utf8'));
const histologies = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'histologies.json'), 'utf8'));

// Define your GraphQL schema using SDL
const typeDefs = gql`
  type Person {
    submitter_id: String!
    projects: [Project]!
    ethnicity: String
    race: String
    sex: String
    type: String
  }
  
  type Project {
    code: String
  }
  
  type Histology {
    submitter_id: String!
    age_at_hist_assessment: Float
    histology: String
    histology_grade: String
    hist_ICD_O_morph_code: String
    histology_result: String
    histology_result_numeric: Float
    histology_result_unit: String
    somatic_malignancy_type: String
    timings: [Timing]
    type: String
  }
  
  type Timing {
    submitter_id: String
  }
  
  type Query {
    persons(ethnicity: [String], race: [String], sex: [String]): [Person]
    histologies(minAge: Float, histology: [String]): [Histology]
  }
`;

// Define resolvers with array support for filtering
const resolvers = {
  Query: {
    persons: (_, args) => {
      return persons.filter(person => {
        // Treat empty arrays as no filter.
        const ethnicityFilter =
          Array.isArray(args.ethnicity) && args.ethnicity.length === 0
            ? null
            : args.ethnicity;
        const raceFilter =
          Array.isArray(args.race) && args.race.length === 0 ? null : args.race;
        const sexFilter =
          Array.isArray(args.sex) && args.sex.length === 0 ? null : args.sex;

        const ethnicityMatch =
          !ethnicityFilter ||
          (Array.isArray(ethnicityFilter)
            ? ethnicityFilter.includes(person.ethnicity)
            : person.ethnicity === ethnicityFilter);
        const raceMatch =
          !raceFilter ||
          (Array.isArray(raceFilter)
            ? raceFilter.includes(person.race)
            : person.race === raceFilter);
        const sexMatch =
          !sexFilter ||
          (Array.isArray(sexFilter)
            ? sexFilter.includes(person.sex)
            : person.sex === sexFilter);

        return ethnicityMatch && raceMatch && sexMatch;
      });
    },
    histologies: (_, args) => {
      return histologies.filter(hist => {
        const histologyFilter =
          Array.isArray(args.histology) && args.histology.length === 0
            ? null
            : args.histology;
        const histMatch =
          !histologyFilter ||
          (Array.isArray(histologyFilter)
            ? histologyFilter.includes(hist.histology)
            : hist.histology === histologyFilter);
        const ageMatch = !args.minAge || hist.age_at_hist_assessment < args.minAge;
        return histMatch && ageMatch;
      });
    },
  },
};


async function startServer() {
  // Initialize Apollo Server with Express integration
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();

  // Apply Apollo Server middleware on the existing app
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // REST endpoint to process natural language input via LLM
  app.post('/api/parse-query', async (req, res) => {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'Missing userInput in request body' });
    }
    try {
      const filters = await parseUserInputLLM(userInput);
      res.json(filters);
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse query' });
    }
  });

  // Start the Express server on port 4000
  app.listen(4000, () => {
    console.log('Server ready at http://localhost:4000/graphql');
  });
}

startServer();
