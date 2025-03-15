const express = require('express');
const cors = require('cors');
const Store = require('./mockStore');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/session", async (req, res) => {
    const {userName} = req.body;
    try {
        Store.startSession(userName);
        res.json({
            message: "Session Created"
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

app.get("/api/questions", async (req, res) => {
    try {
        const questions = await Store.getQuestions();     
        if (questions.length === 0) {
            throw new Error("No questions available");
        }       
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];  
        const clues = randomQuestion.clues;
        console.log(clues);     
        res.json({
            clue : clues
        });
    

    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

app.listen(port, () => {
    console.log("server is running")
})