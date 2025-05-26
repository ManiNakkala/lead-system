
import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Name and email are required.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5678/webhook-test/lead-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setError('Submission failed.');
      }
    } catch (error) {
      setError('Server error.');
    }
  };

  return (
    <div className="form-container">
      <h2>Lead Generation Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
        <input type="email" placeholder="Email *" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        <input type="text" placeholder="Company" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
        <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Lead submitted successfully!</p>}
    </div>
  );
}

export default App;
