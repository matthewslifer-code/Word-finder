const lettersInput = document.getElementById("letters");
const resultsDiv = document.getElementById("results");
const findButton = document.getElementById("findBtn");

const dictionary = [
  "A","AN","AND","ANT","BAD","BAG","BAN","BAND","BANDANA","BAR","BAT",
  "BE","BED","BEAT","BEAN","BEAR","BEARD","BEAT","BEND","BEST",
  "CAN","CANE","CAR","CARD","CARE","CASE","CAT","CATS",
  "DAD","DAME","DANCE","DATE","DEAL","DEAR","DECK",
  "EAR","EAT","EATEN","ECHO","END","ERA",
  "FAN","FAR","FAST","FATE","FEAR","FED","FIND","FINE",
  "GAIN","GAME","GATE","GEAR","GET","GIVE","GOOD",
  "HAND","HAT","HAVE","HEAR","HEART","HEAT","HEN",
  "IN","IS","IT",
  "MAN","MANNER","MAP","MAT","ME","MEAN","MEAT","MEN",
  "NAME","NEAR","NEAT","NET","NEW","NICE","NIGHT",
  "OF","ON","ONE","OR","OTHER","OUT",
  "PAN","PART","PAST","PAT","PEN","PET","PLAN","PLAY",
  "RAN","RATE","READ","REAL","RED","REST","RING","ROAD",
  "SAD","SAFE","SAND","SAT","SEA","SEAT","SEND","SET",
  "TAN","TAPE","TEAM","TEAR","TEN","THE","THAT","THEN",
  "TO","TOE","TOO","TOP","TREE","TRY",
  "USE",
  "WAS","WAY","WE","WEAR","WHAT","WHEN","WHERE","WHO",
  "WIN","WIND","WORD","WORK"
];

function canMakeWord(word, letters) {
  const available = {};

  for (const letter of letters) {
    available[letter] = (available[letter] || 0) + 1;
  }

  for (const letter of word) {
    if (!available[letter]) {
      return false;
    }
    available[letter]--;
  }

  return true;
}

function findWords() {
  const letters = lettersInput.value
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  if (!letters) {
    resultsDiv.innerHTML = "<p>Please enter some letters.</p>";
    return;
  }

  const words = dictionary
    .filter(word => canMakeWord(word, letters))
    .sort((a, b) => {
      if (b.length !== a.length) {
        return b.length - a.length;
      }
      return a.localeCompare(b);
    });

  if (words.length === 0) {
    resultsDiv.innerHTML = "<p>No words found.</p>";
    return;
  }

  resultsDiv.innerHTML = `
    <h2>${words.length} words found</h2>
    <div class="word-list">
      ${words.map(word => `<span>${word}</span>`).join(' ')}
    </div>
  `;
}

findButton.addEventListener("click", findWords);

lettersInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    findWords();
  }
});
