
const sessions = []
const questions = require('./questions.json')

function startSession(userName) {
    if (sessions.includes(userName)) {
        throw new Error("Username already exists")
    }
    sessions.push(userName)
}

function getQuestions() {
   //return clues from questions
    return questions;
}

module.exports = {
    startSession: startSession,
    getQuestions: getQuestions
}