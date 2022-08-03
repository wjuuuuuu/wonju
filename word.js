//html elements
var word1 = document.getElementById("word1"); //answer
var word2 = document.getElementById("word2"); //buttons
var check = document.getElementById("check"); //word1 === word2?
var progress = document.getElementById('progress'); //progress check
var time = document.getElementById('time');

///game objects
var game = {
    'btns': [],
    'maxPlay': 3,
    'current': 0
};

game.startTime = Date.now();

game.words = "glitter,loveyou,starbucks,commit,sourcing".split(",");

//choose 1 word from words
game.choose = function () {
    var idx = Math.floor(Math.random() * this.words.length);
    this.answer = this.words[idx];
    this.letters = this.answer.split('');
    word1.innerHTML = this.answer;
};

game.addButtons = function () {
    for (var i = 0; i < this.letters.length; i++) {
        var btn = document.createElement('button');
        btn.innerHTML = this.letters[i];
        word2.appendChild(btn);
        this.btns.push(btn);

    }
};

game.removeButtons = function () {
    for (var i = 0; i < this.btns.length; i++) {
        word2.removeChild(this.btns[i]);
    }
    this.btns = [];
}

game.isCorrect = function () {
    return this.answer === this.letters.join('');
};

game.issame = function () {
    if (this.isCorrect()) {
        check.innerHTML = "일치합니다";
    } else {
        check.innerHTML = "불일치합니다";
    }
};



game.init = function () {
    this.choose();
    this.addButtons();
    this.issame();
};
game.init();



game.copyBtnText = function () {
    for (var i = 0; i < this.letters.length; i++) {
        this.btns[i].innerHTML = this.letters[i];
    }
};

game.swap = function () {
    var temp = [];
    while (game.letters.length != 0) {
        var s = game.letters.pop();
        temp.push(s);
    }

    game.letters = temp;
    game.copyBtnText();
    game.issame();

};

game.rshift = function () {
    var s = game.letters.pop();
    game.letters.unshift(s);
    game.copyBtnText();
    game.issame();
};

game.lshift = function () {
    var s = game.letters.shift();
    game.letters.push(s);
    game.copyBtnText();
    game.issame();
};

game.progress = function () {
    if (game.isCorrect()) {
        game.current++;
        game.removeButtons();
        game.init();
        game.shuffle();

        
        var str = "";
        for (var i = 0; i < game.current; i++) {
            str += "O";
        }
        progress.innerHTML = str;
    }

    if (game.current == game.maxPlay) {
        var sec = (Date.now() - game.startTime) / 1000;
        alert("good ! your record : " + sec + "sec");
        clearInterval(x);
    }
};

//event handler for swap button
let swap = function () {
    game.swap();
    game.progress();
};

let rshift = function () {
    game.rshift();
    game.progress();
};

let lshift = function () {
    game.lshift();
    game.progress();
};

//shuffle
game.shuffle = function () {
    var toggle = Math.floor(Math.random() * 2) === 0;

    if (toggle) {
        game.swap();
    }

    var n = Math.floor(Math.random() * (game.answer.length -1));

    for (var i = 0; i < n; i++) {
        game.rshift();
    }
};
game.shuffle();

var updateTime = function() {
    var now = Date.now() - game.startTime;
    time.innerHTML = (now / 1000) + " s";
}

var x = setInterval(updateTime, 20);


