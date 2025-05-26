
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/lead', async (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid input.' });
  }

  try {
    await axios.post('http://localhost:5678/webhook/test/lead-gen', {
      name, email, company, message,
    });
    res.status(200).json({ message: 'Lead forwarded to n8n.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to forward lead to n8n.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
