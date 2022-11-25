import * as GameManager from "./game_manager.js";
import * as Main from "../main_screen.js";
import * as ThankYouScreen from "../thank_you_screen.js";
import  * as MainPage from "../mainpage.js";


var scoreUI;
var mcqOptions, questionActualOptions;
var selectedOptionElement = undefined;


var currentQuestionCount = 0;

var startQuestionCount;
var currentQuestion;


var questionTitleUI, questionDescUI, questionCountUI;

const GREEN_HEX = "#00B577", NORMAL_HEX = "#3E3E3E";

var questions = [];
var score = 0;
var gameEnded = false;



function initQuestions()
{
    questions = Main.flowerInformation.gameData;
    console.log(questions)
    gameEnded = false

    startQuestionCount = questions.length;
    
    nextQuestion();
    
}

function nextQuestion()
{

    currentQuestionCount++;
    
    //questionTitleUI.textContent = "Question " + currentQuestionCount; // count qns
  
    
    /*mcqOptions.forEach((value) => {


       
            

        value.style.outline = "solid black 3px";


        

    })*/
    
    var randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];


    //questionDescUI.textContent = currentQuestion.question;
    questionTitleUI.innerHTML = currentQuestion.question
    //questionCountUI.textContent = currentQuestionCount + "/" + startQuestionCount;
    console.log(currentQuestion)
    
    //questions.splice(randomIndex, 1);
    
    console.log(questions)
    
    var count = 0;

    questionActualOptions.forEach((value) => {

        var fetchedQuestion = "";
        var index = 0;
        for (const [key, value] of Object.entries(currentQuestion.options)) {
            
            
            if(count === index)
            {
                fetchedQuestion = value;
                break;
            }
            
            index++;
        }
        
        
        value.textContent = fetchedQuestion;
        count++;
    })
}

function onConfirm()
{
    
    if(gameEnded || !selectedOptionElement)
        return;
    

    console.log(selectedOptionElement)
    console.log(questions.length + " LEN")
    
    /*if(questions.length === 0)
    {
        GameManager.endGame();
        //console.log("end")
        gameEnded = true
        return;
    }*/

    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden"; 
    
    if(selectedOptionElement.id === currentQuestion.answer)
    {
        GameManager.setLose(false);    
        GameManager.end("MCQ",function() {})
        //console.log("end")
        //gameEnded = true
        return;
        // score++;
        // scoreUI.innerHTML = "<b>" + score + "</b>";
        // correct
    }

    if(selectedOptionElement.id != currentQuestion.answer)
    {
        GameManager.setLose(true); 
        if(GameManager.lives > 1){
            GameManager.setLose(false);
        }
        GameManager.end("MCQ",function() {})
        //console.log("end")
        //gameEnded = true
        return;
    }

    //selectedOptionElement.classList.remove("active");
    //selectedOptionElement = undefined;
    //nextQuestion();
}




export function startGame()
{
    currentQuestionCount = 0;
    questionTitleUI = document.getElementById("question_title")
    //questionCountUI = document.getElementById("question_count");
    //questionDescUI = document.getElementById("question_desc");

    for(let i = 3; i > GameManager.lives; i--){
        let heart = document.querySelector(".heart")

        heart.classList.add("empty")
        heart.classList.remove("heart")

    }

    MainPage.App(Main.flowerInformation.modelPath, Main.flowerInformation.scale, Main.flowerInformation.alphaMapArray, false);

    mcqOptions = document.querySelectorAll(".question-options");
    questionActualOptions = document.querySelectorAll(".question-actual-question");

    initQuestions();
    

    
    //GameManager.initGame(true, function() {}, "MCQ", 10001);

    scoreUI = document.getElementById("score");
    

    mcqOptions.forEach((value) => {

        
        value.ontouchstart = function()
        {
            selectedOptionElement = value;
            onConfirm();
 
       
    }
        
    })
    
    
    /*document.getElementById("confirm_button").ontouchstart = function(event)
    {
        onConfirm();
    }*/
    
    
    

}