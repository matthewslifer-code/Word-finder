// WordFinder - fresh, self-contained search logic

document.addEventListener("DOMContentLoaded", function () {
  const lettersInput = document.getElementById("letters");
  const resultsDiv = document.getElementById("results");
  const statusDiv = document.getElementById("status");
  const findButton = document.getElementById("findBtn");
  const minLength = document.getElementById("minLength");
  const maxLength = document.getElementById("maxLength");

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
      .replace(/[^A-Z?]/g, "");

    lettersInput.value = letters;

    if (!letters) {
      statusDiv.textContent = "";
      resultsDiv.innerHTML = "<p>Please enter some letters.</p>";
      return;
    }

    const min = Number(minLength.value);
    const max = Number(maxLength.value);

    if (min > max) {
      resultsDiv.innerHTML = "<p>Please choose a smaller minimum length.</p>";
      return;
    }

    const letterCounts = {};
    let blanks = 0;

    for (const letter of letters.toLowerCase()) {
      if (letter === "?") {
        blanks++;
      } else {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
      }
    }

    const matches = WORDS
      .filter(word => word.length >= min && word.length <= max)
      .filter(word => {
        const needed = {};

        for (const letter of word) {
          needed[letter] = (needed[letter] || 0) + 1;
        }

        let missing = 0;

        for (const letter in needed) {
          const have = letterCounts[letter] || 0;
          if (needed[letter] > have) {
            missing += needed[letter] - have;
          }
        }

        return missing <= blanks;
      })
      .sort((a, b) => {
        if (b.length !== a.length) {
          return b.length - a.length;
        }
        return a.localeCompare(b);
      });

    statusDiv.textContent = matches.length
      ? `${matches.length} words found`
      : "";

    if (!matches.length) {
      resultsDiv.innerHTML = "<p>No words found. Try different letters or a ? blank.</p>";
      return;
    }

    resultsDiv.innerHTML = `
      <h2>Words you can make</h2>
      <div class="word-list">
        ${matches.map(word => `<span class="word">${word.toUpperCase()}</span>`).join("")}
      </div>
    `;
  }

  findButton.addEventListener("click", findWords);

  lettersInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      findWords();
    }
  });
});
