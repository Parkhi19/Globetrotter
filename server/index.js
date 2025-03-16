const express = require('express');
const cors = require('cors');
const Store = require('./mockstore');

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

app.get("/api/clues", async (req, res) => {
    try {
        const questions = await Store.getQuestions();     
        if (questions.length === 0) {
            throw new Error("No questions available");
        }       
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];  
        const clues = randomQuestion.clues;
        const correctAnswer = randomQuestion.city;
        const extraOptions = ["Shanghai", "Tokyo", "New York", "India", "Paris", "London", "Berlin", "Rome", "Sydney", "Cairo", "Moscow", "Rio de Janeiro", "Toronto", "Mumbai", "Cape Town", "Dubai", "Singapore", "Seoul", "Los Angeles", "Barcelona", "Venice", "Amsterdam", "Vienna", "Prague", "Budapest", "Istanbul", "Athens", "Lisbon", "Stockholm", "Oslo", "Helsinki", "Copenhagen", "Warsaw", "Kiev", "Bucharest", "Sofia", "Belgrade", "Zagreb", "Ljubljana", "Bratislava", "Vilnius", "Riga", "Tallinn", "Tirana", "Podgorica", "Pristina", "Skopje", "Sarajevo", "Chisinau", "Minsk", "Tbilisi", "Yerevan", "Baku", "Astana", "Ashgabat", "Dushanbe", "Tashkent", "Bishkek", "Nur-Sultan", "Ulaanbaatar", "Kathmandu", "Thimphu", "Dhaka", "Islamabad", "Kabul", "Tehran", "Baghdad", "Riyadh", "Kuwait City", "Doha", "Abu Dhabi", "Muscat", "Sana'a", "Beirut", "Jerusalem", "Amman", "Damascus", "Ankara", "Nicosia", "Manama"]
        const option = [correctAnswer];
        for (let i = 0; i < 3; i++) {
            const randomOption = extraOptions[Math.floor(Math.random() * extraOptions.length)];
            if (!option.includes(randomOption)) {
                option.push(randomOption);
            }}
        console.log(clues);     
        res.json({
            id: randomQuestion.id, 
            clues : clues,
            options : option,
            facts : randomQuestion.fun_fact,
            correctAnswer : randomQuestion.city
        });
    

    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

app.post("/api/answer", async (req, res) => {
    try {
        const { questionId, userAnswer } = req.body; 

        if (!questionId || !userAnswer) {
            return res.status(400).json({ message: "Missing question ID or answer" });
        }

        const questions = await Store.getQuestions();
        const question = questions.find(q => q.id === questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const correctAnswer = question.city; 

        if (!correctAnswer) {
            return res.status(404).json({ message: "Correct answer not available for this question" });
        }

        const isCorrect = correctAnswer.toLowerCase() === userAnswer.toLowerCase();

        res.json({ 
            correct: isCorrect,
            correctAnswer: correctAnswer 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.listen(port, () => {
    console.log("server is running")
})