
    // ****** Memory Game ****** 




   //  Display Memory Blocks 

   function displayMemoryGameBlocks() {
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("memory-game-blocks");
  
    const gameBlocks = [
      { technology: "angular", imgSrc: "./Images/Angular.jpg" },
      { technology: "angular", imgSrc: "./Images/Angular.jpg" },
      { technology: "apple", imgSrc: "./Images/Apple.jpg" },
      { technology: "apple", imgSrc: "./Images/Apple.jpg" },
      { technology: "css", imgSrc: "./Images/Css.jpg" },
      { technology: "css", imgSrc: "./Images/Css.jpg" },
      { technology: "github", imgSrc: "./Images/Git.jpg" },
      { technology: "github", imgSrc: "./Images/Git.jpg" },
      { technology: "html", imgSrc: "./Images/Html.jpg" },
      { technology: "html", imgSrc: "./Images/Html.jpg" },
      { technology: "csharp", imgSrc: "./Images/C-sharp.jpg" },
      { technology: "csharp", imgSrc: "./Images/C-sharp.jpg" },
      { technology: "nodejs", imgSrc: "./Images/Nodejs.jpg" },
      { technology: "nodejs", imgSrc: "./Images/Nodejs.jpg" },
      { technology: "java", imgSrc: "./Images/Java.jpg" },
      { technology: "java", imgSrc: "./Images/Java.jpg" },
      { technology: "python", imgSrc: "./Images/Python.jpg" },
      { technology: "python", imgSrc: "./Images/Python.jpg" },
      { technology: "linux", imgSrc: "./Images/Linux.jpg" },
      { technology: "linux", imgSrc: "./Images/Linux.jpg" },
    ];
  
    gameBlocks.forEach(block => {
      const gameBlock = document.createElement("div");
      gameBlock.classList.add("game-block");
      gameBlock.setAttribute("data-technology", block.technology);
  
      const frontFace = document.createElement("div");
      frontFace.classList.add("face", "front");
  
      const backFace = document.createElement("div");
      backFace.classList.add("face", "back");
  
      const image = document.createElement("img");
      image.setAttribute("decoding", "async");
      image.setAttribute("src", block.imgSrc);
      image.setAttribute("alt", "");
  
      backFace.appendChild(image);
      gameBlock.appendChild(frontFace);
      gameBlock.appendChild(backFace);
      gameContainer.appendChild(gameBlock);
    });
  
    document.body.appendChild(gameContainer);
  }

  displayMemoryGameBlocks()



    // Render The Game   

function renderMemoryGame() {

    // General Variables
    const duration = 600;
    let wrongTriesCount = 0;

    // DOM Elements
    const startGameButton = document.querySelector(".control-buttons");
    const playerNameSpan = document.querySelector(".name span");
    const triesCountSpan = document.querySelector(".tries span");
    const blocksContainer = document.querySelector(".memory-game-blocks");
    const blocksArray = Array.from(blocksContainer.children);
    const orderRange = Array.from(blocksArray.keys());
    

    // Initialize Game
    startGameButton.onclick = startGame;
    shuffleArray(orderRange);
    setupBlocksOrder(blocksArray, orderRange);
    initializeBlocks(blocksArray);

    // Start Game
    function startGame() {
        const playerName = prompt("What is your name?") || "Unknown";
        playerNameSpan.innerHTML = playerName;
        startGameButton.remove();
        window.localStorage.clear();
        loadFromLocalStorage();
    }

    // Shuffle Function
    function shuffleArray(array) {
        let currentIndex = array.length;
        let randomIndex;
        for (let i = currentIndex - 1; i > 0; i--) {
            randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
    }

    // Setup Blocks Order
    function setupBlocksOrder(blocks, order) {
        blocks.forEach((block, index) => {
            block.style.order = order[index];
        });
    }

    // Initialize Blocks
    function initializeBlocks(blocks) {
        blocks.forEach((block) => {
            block.addEventListener("click", () => flipCard(block));
        });
    }

    // Flip Card Logic
    function flipCard(block) {
        block.classList.add("is-flipped");
        const flippedBlocks = blocksArray.filter((block) =>
            block.classList.contains("is-flipped")
        );
        if (flippedBlocks.length === 2) {
            stopClicking();
            checkMatch(flippedBlocks[0], flippedBlocks[1]);
        }
    }

    // Stop Clicking
    function stopClicking() {
        blocksContainer.classList.add("no-clicking");
        setTimeout(() => {
            blocksContainer.classList.remove("no-clicking");
        }, duration);
    }

    // Check for Matching Cards
    function checkMatch(firstBlock, secondBlock) {
        setTimeout(() => {
            if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
                markAsMatched(firstBlock, secondBlock);
            } else {
                unflipCards(firstBlock, secondBlock);
                wrongTriesCount++;
                triesCountSpan.innerHTML = wrongTriesCount;
            }
        }, duration);
    }

    // Mark Cards as Matched
    function markAsMatched(firstBlock, secondBlock) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        checkGameResult();
    }

    // Unflip Cards
    function unflipCards(firstBlock, secondBlock) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
    }

    // Check Game Result
    function checkGameResult() {
        const matchedBlocks = blocksArray.filter((block) =>
            block.classList.contains("has-match")
        );
        if (matchedBlocks.length === blocksArray.length) {
            showGameResult();
            saveToLocalStorage(playerNameSpan.innerHTML, wrongTriesCount);
        }
    }

    // Show Game Result
    function showGameResult() {
        const resultContainer = document.querySelector(".result");
        const resultDiv = document.createElement("div");
        resultDiv.className = "big-div";

        const nameDiv = document.createElement("div");
        nameDiv.className = "name-result";
        nameDiv.append(document.createTextNode(`Name: ${playerNameSpan.innerHTML}`));

        const triesDiv = document.createElement("div");
        triesDiv.className = "wrong-tries";
        triesDiv.append(document.createTextNode(`Wrong Tries: ${wrongTriesCount}`));

        resultDiv.append(nameDiv, triesDiv);
        resultContainer.append(resultDiv);
    }

    // Save Result to Local Storage
    function saveToLocalStorage(name, wrongTries) {
        const history = JSON.parse(localStorage.getItem("history")) || [];
        history.push({ name, wrong: wrongTries });
        localStorage.setItem("history", JSON.stringify(history));
    }

    // Load Previous Results from Local Storage
    function loadFromLocalStorage() {
        const history = JSON.parse(localStorage.getItem("history")) || [];
        const resultContainer = document.querySelector(".result");
        resultContainer.innerHTML = "";

        history.forEach((result) => {
            const resultDiv = document.createElement("div");
            resultDiv.className = "big-div";

            const nameDiv = document.createElement("div");
            nameDiv.className = "name-result";
            nameDiv.append(document.createTextNode(`Name: ${result.name}`));

            const triesDiv = document.createElement("div");
            triesDiv.className = "wrong-tries";
            triesDiv.append(document.createTextNode(`Wrong Tries: ${result.wrong}`));

            resultDiv.append(nameDiv, triesDiv);
            resultContainer.append(resultDiv);
        });
    }
}

renderMemoryGame();









