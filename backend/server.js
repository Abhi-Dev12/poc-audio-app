const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(cors());

const blobUrlMap = new Map();

app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

app.get('/api/get-audio-url', (req, res) => {
  const fileType = req.query.type; // 'mp3' or 'wav'
  const audioPath = `/audio/sample.${fileType}`;

  if (!fileType || !['mp3', 'wav'].includes(fileType)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }

  const secureId = uuidv4();
  blobUrlMap.set(secureId, audioPath);

  res.json({ secureUrl: `/secure/${secureId}` });
});

app.get('/secure/:id', (req, res) => {
  const secureId = req.params.id;
  const blobUrl = blobUrlMap.get(secureId);

  if (!blobUrl) {
    return res.status(404).send('Invalid or expired URL');
  }

  res.redirect(blobUrl);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
