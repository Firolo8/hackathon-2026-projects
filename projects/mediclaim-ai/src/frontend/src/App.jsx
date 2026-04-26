import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('insurance_provider', 'BlueCross');

    try {
      const response = await axios.post('http://localhost:8000/api/bills/analyze', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#0f1f35' }}>MediClaim AI (v0.1)</h1>
      <p style={{ color: '#4a6585' }}>Minimal uploader test.</p>
      
      <div style={{ border: '2px dashed #dde3ec', padding: '40px', textAlign: 'center', marginBottom: '20px', borderRadius: '12px' }}>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        {file && <p style={{ marginTop: '10px', fontSize: '14px' }}>Selected: {file.name}</p>}
      </div>

      <button 
        onClick={handleAnalyze} 
        disabled={!file || loading}
        style={{ width: '100%', padding: '12px', background: '#0f1f35', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        {loading ? 'Analyzing...' : 'Analyze Bill'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '40px' }}>
          <h3>Analysis Result (JSON):</h3>
          <pre style={{ background: '#f4f6f9', padding: '20px', borderRadius: '8px', overflow: 'auto', fontSize: '12px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
