import { spawn } from 'child_process'
import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const upload = multer({ dest: "uploads/" })

router.get('/', (req, res) => {
    res.send({ message: 'Analysing' })
})

// POST /analyze route
router.post('/', upload.single('video'), (req, res) => {
    const videoPath = req.file.path;

    console.log(videoPath)

    // Call the Python script with the video path
    const pythonProcess = spawn(process.env.PROJECT_STAGE === 'development'?'py':'python3', ['./posture.py', videoPath]);

    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`[Python Error]: ${data}`); 
    });

    pythonProcess.on('close', (code) => {
        fs.unlink(videoPath, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        try {
            const parsed = JSON.parse(result);
            res.json(parsed);
        } catch (e) {
            console.error('[Parse Error]', e);
            res.status(500).json({ error: 'Failed to analyze video.' });
        }
    });
});


export default router