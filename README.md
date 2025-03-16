# **Google Summer of Code Proposal for Data for the Common Good**

## Project Title
**Pilot Project: Chatbot for Generating GraphQL Queries from Natural Language Descriptions**

## Overview
This pilot project is an initial implementation demonstrating the feasibility of the main idea listed on [Data for the Common Good GSoC Project Ideas](https://docs.pedscommons.org/GSoC/ideas), specifically, **Building a Chatbot for Generating GraphQL and Custom Queries for Cohort Descriptions**. The primary objective is to simplify data exploration by using natural language processing (LLM) to dynamically generate GraphQL queries based on user input, significantly reducing manual interaction with complex user interfaces.

## Objective
The primary goal of this pilot project was to build a functioning prototype chatbot capable of interpreting natural language input to extract patient cohort parameters (such as race, sex, ethnicity, age, and histology) and dynamically generating corresponding GraphQL queries to retrieve relevant patient data.

## Implementation Details
- Built a **React.js** frontend for an intuitive user experience, allowing users to input casual, conversational-style queries.
- Implemented a backend server in Node.js, using Apollo Server to handle GraphQL requests and interact with data sources.
- Integrated a Large Language Model (LLM), specifically DeepSeek, to parse and translate natural language queries into structured filter criteria.
- Demonstrated the successful parsing of user queries and dynamic construction of accurate GraphQL queries that return real-time filtered patient data.

## Technical Stack
- **Frontend:** React.js, Apollo Client, Bootstrap
- **Backend:** Node.js, Apollo Server, GraphQL
- **LLM Integration:** DeepSeek LLM via OpenRouter API

## Implementation Steps
1. **Data Preparation:**
   - Synthesized patient and histology datasets for testing.

2. **Backend Setup:**
- Developed a GraphQL server with schema definitions and resolver logic.
- Integrated Apollo Server to handle GraphQL API requests.

3. **LLM Integration:**
- Created a robust backend endpoint (`/api/parse-query`) using DeepSeek LLM.
- Developed effective prompt engineering strategies to handle various natural language inputs.

4. **Frontend Interface:**
- Designed a user-friendly interface with a large textbox for natural language queries using React.js and Bootstrap.
- Enabled real-time results visualization in tabular format.

## Achieved Outcomes
- Successfully deployed an end-to-end working prototype.
- Verified accurate extraction of filters from natural language queries.
- Demonstrated real-time data retrieval and filtering from a GraphQL API.

## Next Steps (for the Main Project)
- Enhance the robustness of NLP parsing to handle more complex user queries.
- Integrate advanced query generation for additional filters such as multiple histology conditions and age ranges.
- Optimize API response times for larger datasets.
- Develop an interactive user interface to further enrich user experience.
- Implement detailed error handling and user feedback mechanisms.

## Demo
A detailed demonstration video of this pilot project is attached in the README file, showcasing end-to-end functionality from natural language input to data retrieval.

## Conclusion
This pilot project successfully validates the core concept of the proposed GSoC project, confirming both its feasibility and value. The demo provides a clear pathway for further enhancements in the main project phase, aligning with Data for the Common Good’s mission to simplify and optimize patient cohort analysis workflows.

