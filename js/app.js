// -----Variables

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0; 
const startButton = document.querySelector('.btn__reset');
let phraseUl = document.querySelector('#phrase ul');
const hearts = document.querySelectorAll('#scoreboard img');




//----Arrays
let phrases = ['may the force be with you',
'there is no place like home', 
'im the king of the world',
'houston we have a problem',
'just keep swimming']

//return random phrase from phrases array 

const getRandomPhraseAsArray = arr => {
    const randomPhrase = Math.floor(Math.random() * arr.length);
    return arr[randomPhrase];
}

let phraseArray = getRandomPhraseAsArray(phrases);

//--- adds the letters of a string to the display
const addPhraseToDisplay = arr => {
 // do stuff any arr that is passed in, and add to `#phrase ul`
    for( let i =0; i <phraseArray.length; i++){
        const list = document.createElement('li');
        const character = phraseArray[i];
        list.textContent = character;
        if(character ===' '){
            list.className +='space';
    
        } else {
            list.className += 'letter';
        }
        phraseUl.appendChild(list);
    };
}

//---check if a letter is in the phrase
const checkLetter = button => {
    let letter = document.querySelectorAll('li');
    for (let i = 0; i < letter.length; i++) {
        let letter = letter[i];
        if (button.textContent === letter.textContent.toLowerCase()) {
         letter.classList.add('show');
        let match = letter.textContent.style.display.getElementsByClassName('letter');
        }
    }
    return match;
}
//----check if the game has been won or lost
const checkWin = () => {
    const letters = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    const headLine = document.getElementsByClassName("title")[0];

    if (letters.length == show.length) {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove("start");
        overlay.classList.add("win");
        overlay.style.display = "flex";
        headLine.innerHTML = "Congratulations, You Won!";
        startGame.classList.add("restart");
        startGame.innerHTML = "Play Again";

    } else if (incorrectGuesses > 4) {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove("start");
        overlay.classList.add("lose");
        overlay.style.display = "flex";
        headLine.innerHTML = "Sorry, You Lost!";
        startGame.classList.add("restart");
        startGame.innerHTML = "Try Again";
    }

    restartGame();

}



//---Event listener for “Start Game” button to hide start screen overlay
startButton.addEventListener('click',() => {
    const screenOverlay = document.getElementById('overlay');
    screenOverlay.style.display = 'none';
    addPhraseToDisplay(phraseArray);
    // resets game 
    if (startButton.textContent === 'Play Again') {
        while(phraseUl.firstChild) phraseUl.removeChild(phraseUl.firstChild);
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
        //remove keys
        let buttons = keyboard.getElementsByTagName('BUTTON');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('chosen')
        }
    
        for (let i = 0; i < hearts.length; i++) {
            hearts[i].src = "images/liveHeart.png";
        }
        
        missed = 0;
    }
});

//--------listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click',e =>{
if (event.target.tagName === 'BUTTON'){
    const button =event.target;
    const notChosen = button.className.indexOf('chosen')< 0;
    if (notChosen){
        button.className += 'chosen';
        const letterFound = checkLetter(button.textContent);
        if (!letterFound && missed < 5) {
         hearts[missed].src = "images/lostHeart.png";
         missed += 1;
    }
    }
}

});
