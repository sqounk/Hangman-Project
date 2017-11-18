
// define hangman object
var hangman = {
  // define dictionary. I DO NOT handle case of currentWord below because these
  // are limited to lowercase
  dictionary: [
    'western', 'hangman', 'rifle', 'pistol', 'horses', 'cowboy', 'indian',
    'acres', 'adult', 'advice', 'arrangement', 'attempt', 'border',
    'breeze', 'brick', 'calm', 'canal', 'cast', 'chose', 'claws', 'coach',
    'constantly', 'contrast', 'cookies', 'customs', 'damage', 'deeply',
    'depth', 'discussion', 'doll', 'donkey', 'essential', 'exchange',
    'exist', 'explanation', 'facing', 'film', 'finest', 'fireplace',
    'floating', 'folks', 'fort', 'garage', 'grabbed', 'grandmother',
    'habit', 'happily', 'heading', 'hunter', 'image', 'independent',
    'instant', 'kids', 'label', 'lungs', 'manufacturing', 'mathematics',
    'melted', 'memory', 'mill', 'mission', 'monkey', 'mount', 'mysterious',
    'neighborhood', 'nuts', 'occasionally', 'official', 'ourselves',
    'palace', 'plates', 'poetry', 'policeman', 'positive', 'possibly',
    'practical', 'pride', 'promised', 'recall', 'relationship',
    'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush', 'sale',
    'satellites', 'satisfied', 'scared', 'selection', 'shake', 'shaking',
    'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip', 'slope',
    'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales', 'thumb',
    'tobacco', 'toy', 'trap', 'treated', 'tune', 'university', 'vapor',
    'vessels', 'wealth', 'wolf', 'zoo'
  ],

   // define number of guesses left. 6 because that is how many body parts the
  // hangman has
  numberOfGuessesLeft: 6,
  // start at 0 wins, losses, numberOfCorrectGuesses
  wins: 0,
  losses: 0,
  numberOfCorrectGuesses: 0,
  // initialize variables that will be used later
  currentWord: '',
  gamePlayArray: [],
  guesses: [],
  userInput: '',

  // define generic print function. Most other print functions use this.
  printTo: function(element, message) {
    document.getElementById(element).innerHTML = message;
  },

  // print directions for the user
  printDirections: function(directions) {
    this.printTo(
      'directions',
      '<h2 class="hidden-xs visible-sm-* visible-md-* visible-lg-*">' +
      directions + '</h2><h4 class="visible-xs-* hidden-sm hidden-md ' +
      'hidden-lg"><strong>' + directions + '</strong></h4>'
    );
  },

  // get the word the user will try to guess
  getWord: function() {
    this.currentWord =
      this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
  },

  // initialize gamePlayArray with blank lines for each character of the word
  initializeGamePlayArray: function() {
    for (var i = 0; i < this.currentWord.length; i++) {
      this.gamePlayArray.push('__');
    }
    return this.gamePlayArray;
  },

  // print the array with blanks and guesses
  printGamePlayArray: function() {
    this.printTo('game-play', this.gamePlayArray.join(' '));
  },

  // print number of wins
  printWins: function() {
    this.printTo('wins', '<p><strong>Wins:</strong> ' + this.wins + '</p>');
  },

  // print number of losses
  printLosses: function() {
    this.printTo('losses', '<p><strong>Losses:</strong> ' + this.losses +
                 '</p>');
  },

  // print characters that have already been guessed
  printGuesses: function() {
    this.printTo('guesses', '<p><strong># of guesses remaining:</strong> ' +
                 this.numberOfGuessesLeft + '</p><p><strong>Letters already ' +
                 'guessed:' + '</strong></p>' + this.guesses.join(' '));
  },

  // print stats (the above functions)
  printStats: function() {
    this.printWins();
    this.printLosses();
    this.printGuesses();
  },

  // start the game
  startGame: function() {
      this.printTo('hangman',
                   '<img class="col-xs-12" src="assets/images/Hangman-0.png">');
      this.printTo('game-board', '<div class="lead text-success" id="wins">' +
                   '</div><div class="lead text-danger" id="losses"></div>' +
                   '<div id="game-play"></div><div style="height: 20px;">' +
                   '</div><div class="lead text-warning" id="guesses"></div>');
      this.printDirections('Choose a letter to make a guess');
      this.getWord();
      this.gamePlayArray = this.initializeGamePlayArray();
      this.printGamePlayArray();
      this.printStats();
  },

  // check if input is an alphabetic character
  isAlpha: function(input) {
    var keyA = 65;
    var keyZ = 90;
    if (input >= keyA && input <= keyZ) {
      return true;
    }
  },

  // validate the users input
  validateUserInput: function(input) {
    // do nothing if the user's input is not alphabetic
    if (!this.isAlpha(input.keyCode)) {
      return;
    }

    this.userInput = String.fromCharCode(input.keyCode).toLowerCase();

    // alert the user if they have already chosen the letter
    if (this.guesses.indexOf(this.userInput) != -1) {
      alert('You have already chosen that letter. Please choose another!');
      return;
    }
    return this.userInput;
  },

  // replace blank lines with correct letter choice
  updateGamePlayArray: function() {
    for (var i = 0; i < this.currentWord.length; i++) {
      if (this.currentWord[i] === this.userInput) {
        this.gamePlayArray[i] = this.userInput;
      }
    }
  },

  // update the hangman image
  printHangman: function() {
    this.printTo('hangman',
                 '<img class="col-xs-12" src="assets/images/Hangman-' +
                 (this.guesses.length - this.numberOfCorrectGuesses) + '.png">');
  },

  updateGameWithGuess: function() {
    // if guess is in the word update the game board
    if (this.currentWord.indexOf(this.userInput) != -1) {
      this.updateGamePlayArray();
      this.numberOfCorrectGuesses += 1;
      this.printGamePlayArray();
    // else update the hangman image
    } else {
      this.numberOfGuessesLeft--;
      this.printHangman();
    }
  },

  // check for winning result
  userWon: function() {
    if (this.gamePlayArray.join('') === this.currentWord) {
      return true;
    }
  },

  // check for losing result
  userLost: function() {
    if (this.numberOfGuessesLeft <= 0) {
      return true;
    }
  },

  // show the result to the user
  showResult: function(divId, bootstrapClass, message) {
    this.printDirections('Press any key to play again!');
    this.printTo(divId, '<h1 class=' + bootstrapClass + '>' + message + '</h1>');
  },

  // check results
  checkResult: function() {
    // check for win and handle
    if (this.userWon()) {
      this.wins += 1;
      this.showResult('wins', 'text-success', 'You win!');
    }

    // check for loss and handle
    if (this.userLost()) {
      this.losses += 1;
      this.printTo('game-play', 'the word was: ' + this.currentWord);
      this.showResult('losses', 'text-danger', 'You lose!');
    }
  },

  // get input from the user
  getUserInput: function(event) {
    this.userInput = this.validateUserInput(event);
    if (this.userInput === undefined) {
      return;
    }

    this.guesses.push(this.userInput);
    this.updateGameWithGuess();
    this.printStats();
    this.checkResult();
  },

  // reset the game
  resetGame: function() {
    this.numberOfGuessesLeft = 6;
    this.numberOfCorrectGuesses = 0;
    this.guesses = [];
    this.gamePlayArray = [];
    this.startGame();
  }
};




// listen for keyup event. check condition of game to determine next step
document.onkeyup = function(event) {
  if (hangman.currentWord === '') {
    hangman.startGame();
  } else if (hangman.userWon() || hangman.userLost()) {
    hangman.resetGame();
  } else {
    hangman.getUserInput(event);
  }
};

$(document).ready(function() {

  // Gets Link for Theme Song
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/images/captainplanet24.mp3");

  // Theme Button
  $(".theme-button").on("click", function() {
    audioElement.play();
  });

  $(".pause-button").on("click", function() {
    audioElement.pause();
  });

       // $
    });
      
   