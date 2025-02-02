//Two arrays to track user inputs ans random colors generated
let gameSeq = [];
let userSeq = [];

//started variable to indicate whether game was stared or not
let started = false;
//Level indicate current level
let level = 0;
let highestScore = 0;
let highScore = document.querySelector(".highScore");

//To map the colors with randomly generated indices from 0 - 3
let btns = ["red", "blue", "orange", "green"];

let heading = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game has started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn){
    btn.classList.add("user-green");
    setTimeout(function(){
        btn.classList.remove("user-green");
    }, 300);
}

function levelUp(){
    userSeq = [];
    level++;
    heading.innerText = `Level ${level}`;

    let rndIndx = Math.floor(Math.random() * 4);
    let rndColor = btns[rndIndx];
    gameSeq.push(rndColor);
    let rndBtn = document.querySelector(`.${rndColor}`);
    gameFlash(rndBtn);
}

function checkAns(idx){

    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        heading.innerHTML = `Game over. Your <b>score<b> is ${level} <br>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {document.querySelector("body").style.backgroundColor = "white"}, 200);
        if(highestScore < level){
            highestScore = level;
            highScore.innerText = `Highest Score : ${highestScore}`;
        }
        setTimeout(reset, 2000);
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let color = btn.getAttribute("id");
    userSeq.push(color);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    heading.append(" Press any key to Restart the Game")
}