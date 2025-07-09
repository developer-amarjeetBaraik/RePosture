import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import multer from 'multer'
import analysePosture from './routes/analysePosture.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    "origin": process.env.FRONTEND_URL,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))

app.use('/analyze', analysePosture)

app.get('/', (req, res) => {
    res.send({ message: 'done' })
})
 
app.listen(PORT, () => {
    console.log(`Your app is listening on PORT: ${PORT}`)
})