$(document).ready(function () {
  const initialWords = [
    { word: "Hello", translation: "Привіт" },
    { word: "Apple", translation: "Яблуко" },
    { word: "Car", translation: "Авто" },
    { word: "Sun", translation: "Сонце" },
    { word: "Book", translation: "Книга" },
    { word: "Water", translation: "Вода" },
    { word: "Dog", translation: "Собака" },
    { word: "House", translation: "Дім" },
    { word: "Tree", translation: "Дерево" },
    { word: "Computer", translation: "Комп'ютер" }
  ];
  let words = [...initialWords];
  let currentStep = 0;
  let correct = 0;
  let incorrect = 0;

  function resetGame() {
    words = [...initialWords];
    currentStep = 0;
    correct = 0;
    incorrect = 0;
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    $("#progress-bar").css("width", "0%").text("Step 0 of 10");
    showNextWord();
  }
  function showNextWord() {
    if (currentStep < 10) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const currentWord = words[randomIndex];
      $("#word").text(currentWord.word);
      $("#translation").data("correct", currentWord.translation);
      $("#progress-bar")
        .css("width", ((currentStep + 1) / 10) * 100 + "%")
        .text(`Step ${currentStep + 1} of 10`);
      words.splice(randomIndex, 1);
    } else {
      $("#score").text(Math.round((correct / 10) * 100) + "%");
      $("#level").text(correct > 7 ? "Advanced" : correct > 4 ? "Intermediate" : "Beginner");
      $("#resultModal").modal("show");
      setTimeout(resetGame, 5000);
    }
  }
  $("#check").click(function () {
    const userInput = $("#translation").val().trim();
    const correctTranslation = $("#translation").data("correct");
    if (userInput === "") {
      alert("Please enter a translation!");
      return;
    }
    if (userInput.toLowerCase() === correctTranslation.toLowerCase()) {
      correct++;
    } else {
      incorrect++;
    }
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    currentStep++;
    $("#translation").val("");
    showNextWord();
  });
  $("#translation").keypress(function (event) {
    if (event.which === 13) {
      $("#check").click();
    }
  });
  resetGame();
});


