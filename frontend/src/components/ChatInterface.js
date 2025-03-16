import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Search, Database, AlertCircle } from 'lucide-react';

// GraphQL query updated to accept arrays for race, sex, and ethnicity
const GET_PERSONS = gql`
  query GetPersons($race: [String], $sex: [String], $ethnicity: [String]) {
    persons(race: $race, sex: $sex, ethnicity: $ethnicity) {
      submitter_id
      ethnicity
      race
      sex 
    }
  }
`;

function ChatInterface() {
  // States for NLP query and filters (as arrays)
  const [nlpQuery, setNlpQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [raceFilter, setRaceFilter] = useState([]);
  const [sexFilter, setSexFilter] = useState([]);
  const [ethnicityFilter, setEthnicityFilter] = useState([]);

  // Execute the query with the current filters
  const { loading, error, data, refetch } = useQuery(GET_PERSONS, {
    variables: { race: raceFilter, sex: sexFilter, ethnicity: ethnicityFilter },
  });

  // Handle natural language query submission
  const handleNlpSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:4000/api/parse-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: nlpQuery }),
      });
      const result = await response.json();
      // Update filters based on LLM response. Ensure values are arrays.
      if (result.race) {
        setRaceFilter(Array.isArray(result.race) ? result.race : [result.race]);
      } else {
        setRaceFilter([]);
      }
      if (result.sex) {
        setSexFilter(Array.isArray(result.sex) ? result.sex : [result.sex]);
      } else {
        setSexFilter([]);
      }
      if (result.ethnicity) {
        setEthnicityFilter(Array.isArray(result.ethnicity) ? result.ethnicity : [result.ethnicity]);
      } else {
        setEthnicityFilter([]);
      }
      refetch({ race: result.race, sex: result.sex, ethnicity: result.ethnicity });
    } catch (err) {
      console.error('Error processing NLP query:', err);
    }
    setIsProcessing(false);
  };

  return (
    <div className="container-fluid p-0" style={{ background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)', minHeight: '100vh' }}>
      {/* Header */}
      <header className="bg-primary text-white py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="bg-white p-2 rounded me-3">
              <Database className="text-primary" style={{ width: '32px', height: '32px' }} />
            </div>
            <div>
              <h1 className="h4 mb-0">Healthcare Data Explorer</h1>
              <small>AI-powered patient data analysis</small>
            </div>
          </div>
          <div>
            <span className="badge bg-dark me-2">HIPAA Compliant</span>
            <span className="badge bg-secondary">Prototype v1.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-4">
        {/* NLP Query Card */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="h5 mb-0">
              <Search className="me-2" style={{ width: '20px', height: '20px' }} />
              Natural Language Query
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleNlpSubmit}>
              <div className="mb-3">
                <label htmlFor="nlpQuery" className="form-label">Enter your query in plain English</label>
                <textarea
                  id="nlpQuery"
                  className="form-control"
                  rows="3"
                  placeholder="e.g., Show me White and Black female patients with Hispanic or Latino and Not Hispanic or Latino ethnicity under 10 with Neuroblastoma and Embryonal rhabdomyosarcoma"
                  value={nlpQuery}
                  onChange={(e) => setNlpQuery(e.target.value)}
                ></textarea>
                <div className="form-text">Our AI will automatically extract search parameters from your query.</div>
              </div>
              <div className="text-end">
                <button type="submit" disabled={isProcessing} className="btn btn-primary">
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    'Process Query'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Section */}
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center bg-light">
            <h2 className="h5 mb-0">Patient Data</h2>
            {data && data.persons && (
              <span className="badge bg-info text-dark">
                {data.persons.length} Records
              </span>
            )}
          </div>
          <div className="card-body">
            {loading && (
              <div className="d-flex justify-content-center align-items-center my-4">
                <div className="spinner-border text-primary me-2" role="status"></div>
                <span>Retrieving patient data...</span>
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                <AlertCircle style={{ width: '20px', height: '20px' }} className="me-2" />
                Query Error: {error.message}
              </div>
            )}
            {data?.persons && data.persons.length === 0 && !loading && (
              <div className="text-center py-4">
                <p className="text-muted">No matching records found. Try adjusting your search parameters.</p>
              </div>
            )}
            {data?.persons && data.persons.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Patient ID</th>
                      <th>Ethnicity</th>
                      <th>Race</th>
                      <th>Sex</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.persons.map((person) => (
                      <tr key={person.submitter_id}>
                        <td>{person.submitter_id}</td>
                        <td>{person.ethnicity || 'Not specified'}</td>
                        <td>{person.race || 'Not specified'}</td>
                        <td>{person.sex || 'Not specified'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-light border-top py-3 mt-4">
        <div className="container text-center">
          <small>© 2025 Healthcare Data Solutions. All patient data is anonymized and for demo purposes only.</small>
        </div>
      </footer>
    </div>
  );
}

export default ChatInterface;
