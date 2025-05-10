const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdfParse = require('pdf-parse');

const app = express();
const upload = multer();
app.use(cors());

app.post('/extract', upload.single('file'), async (req, res) => {
    try {
        const dataBuffer = req.file.buffer;
        const data = await pdfParse(dataBuffer);
        res.json({ text: data.text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to extract text' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Qbee PDF Extractor running on port ${PORT}`);
});
