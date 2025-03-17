# Google Summer of Code 2025 Proposal

## **Data for the Common Good (D4CG)**

### **Project Title:**
**Pilot Project: Chatbot for Generating GraphQL Queries from Natural Language Descriptions for Pediatric Cancer Data Commons**

---

### **Project Overview**
This pilot project demonstrates a functioning prototype chatbot designed to simplify the process of retrieving patient data from the Pediatric Cancer Data Commons (PCDC). Healthcare professionals can interact with patient datasets using natural language queries. This approach minimizes the complexity traditionally associated with manual UI navigation or direct query writing, enhancing user experience and accessibility.

### **Motivation and Objectives**
The motivation behind this project is to simplify access to critical patient information in pediatric cancer research. Our key objective is:

- To develop a chatbot that dynamically translates user-inputted natural language queries into GraphQL queries, significantly streamlining data retrieval for complex patient cohorts.

### **Implementation and Technical Overview**

- **Frontend:**
  - Built a responsive frontend interface using **React.js**, enabling intuitive natural language input from users.

- **Backend Setup:**
  - Implemented a **Node.js** server utilizing **Apollo Server** to manage GraphQL interactions seamlessly.

- **Integration with LLM (DeepSeek R1 via OpenRouter API):**
  - Integrated **DeepSeek R1**, a robust Large Language Model (LLM), capable of effectively interpreting natural language inputs and translating them into structured queries for GraphQL.

### **Pilot Data Preparation**
- Created synthetic patient data aligned with PCDC schema specifications to test the prototype effectively.
- Developed GraphQL schemas based on PCDC data structures, facilitating targeted queries across datasets like patient demographics and histology data.

### **Functionality Demonstration**
The prototype currently supports:
- Parsing natural language queries to dynamically generate GraphQL filters.
- Efficiently retrieving and displaying filtered patient data.

### **Demonstrated Capabilities**
- **Simple Queries:** Successfully retrieves patient records based on single-criteria filters (e.g., all female patients).
- **Complex Queries:** Accurately handles queries involving multiple filter criteria such as race, ethnicity, age, and specific histology conditions.

### **Demo Video:**
[![GSoC Pilot Project Demo](https://img.youtube.com/vi/Yq-q9Z-Tt6Q/1.jpg)](https://www.youtube.com/watch?v=Yq-q9Z-Tt6Q)

### **Future Improvements and Next Steps:**
Potential enhancements to align closely with D4CG's objectives include:
- **Advanced LLM Integration:** Explore other powerful LLMs (e.g., GPT-4 Turbo, Claude, Gemini) for improved accuracy and faster query parsing.
- **Retrieval-Augmented Generation (RAG):** Enhance LLM outputs by integrating a retrieval-based approach to increase accuracy, especially in healthcare domains where precision is critical.
- **Domain-Specific Hybrid Models:** Combine LLMs with rule-based systems for improved reliability and domain accuracy in patient data querying.
- **Model Optimization (Quantization):** Investigate model optimization techniques like quantization to reduce query response times, providing faster results and improved user experiences.

### **Technologies and Skills Utilized**
- **Languages:** JavaScript (Node.js, React.js), GraphQL
- **AI Technologies:** DeepSeek R1 LLM, NLP Processing

### **Conclusion**
This pilot successfully demonstrates the feasibility of using natural language interfaces combined with LLM-driven GraphQL query generation. Through iterative enhancements, including exploring advanced LLMs and hybrid approaches, this initiative will significantly streamline healthcare data access within Pediatric Cancer Data Commons, fulfilling the broader mission of Data for the Common Good.

