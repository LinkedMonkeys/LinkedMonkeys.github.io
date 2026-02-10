(function() {
    'use strict';

    var timeToRoll = true;
    var turn = 1;
    var lastRoll;    
    
    window.addEventListener('load', init);

    function init() {
        const enter_buttons = qsa('.scoring-row > button');
        const roll_button = id('roll');

        for (let i=0; i<enter_buttons.length; i++) {
            enter_buttons[i].addEventListener('click', enterClick);
        }

        roll_button.addEventListener('click', roll);
    }

    function roll() {
        const status = document.getElementById("status");
        if (timeToRoll) {
            const die1 = Math.floor(Math.random()*6)+1;
            const die2 = Math.floor(Math.random()*6)+1;
            lastRoll = die1 + die2;
            status.textContent = `${die1} + ${die2} = ${lastRoll}`;
            timeToRoll = false;
        }
        else {
            status.textContent += "!";
        }
    }
    
    function enterClick(event) {
        const clickedID = event.currentTarget.id;
        const buttonNumber = clickedID.slice(5);

        const textbox = id("user"+buttonNumber);
        const status = document.getElementById("status");
        if (!timeToRoll && textbox.value == "") {
            textbox.value = lastRoll;
    
            computerMove();
        }
        else {
            status.textContent += "!";
        }
    
    }
    
    function computerMove() {
        const die1 = Math.floor(Math.random()*6)+1;
        const die2 = Math.floor(Math.random()*6)+1;
        const status = document.getElementById("status");
        status.textContent = `Computer: ${die1} + ${die2} = ${die1+die2}`;
        
        // Place move.  Hacky!
        // Pick a random spot (1-5).  While it is not empty, pick again.
        var position = Math.trunc(Math.random() * 5) + 1;
        var contents = document.getElementById(`computer${position}`);
        while (contents.value != "") {
        position = Math.trunc(Math.random() * 5) + 1;
        contents = document.getElementById(`computer${position}`);
        }
        
        contents.value = (die1+die2);
    
        // Give control back to the player.
        timeToRoll = true;
        turn++;
        if (turn == 6) {
            gameOver();
        }
    }
    
    function gameOver() {
        var userPoints = 0;
        var computerPoints = 0;
        for (var i=1; i<=5; i++) {
            const user = parseInt(id(`user${i}`).value);
            const computer = parseInt(id(`computer${i}`).value);
            if (user > computer) {
                userPoints += i;
            }
            else if (computer > user) {
                computerPoints += i;
            } // No points if a tie.
        }
    
        var status = document.getElementById("status");
        if (userPoints == computerPoints) {
            status.textContent = `Tie game: ${userPoints}-${computerPoints}`;
        }
        else if (userPoints > computerPoints) {
            status.textContent = `You win: ${userPoints}-${computerPoints}`;
        }
        else {
            status.textContent = `Computer wins: ${userPoints}-${computerPoints}`;
        }
        timeToRoll = false;
    }
    
    /////////////////////////////////////////////////////////////////////
    // Helper functions
    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();