import { startSurvey } from "./survey.js";

function handleSurveyResult(surveyResult) {
    console.log(surveyResult);
    localStorage.setItem('surveyResult', JSON.stringify(surveyResult));
    window.location.href = '/html/recommendation.html';
}

export function startForm() {
    startSurvey(handleSurveyResult);
}
