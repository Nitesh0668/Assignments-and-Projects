  // array
  const quizQuestions = [
    {
      question: "Which year is this ?",
      answer: "2025",
    },
    {
      question: "Which is the largest state in india by area?",
      answer: "Rajasthan",
    },
    {
      question: "Which is the smallest state in india?",
      answer: "Goa",
    },
    {
      question: "Which city is known as cyber city of India?",
      answer: "Gurugram",
    },
    {
      question: "Coldest place on earth?",
      answer: "Antarctica",
    },
  ];

  function runQuiz() {
    let score = 0;

    for (let i = 0; i < quizQuestions.length; i++) {
      // input output
      let userAnswer = prompt(quizQuestions[i].question);

      // cancel button
      if (userAnswer === null) {
        alert(
          "Quiz cancelled. Your score: " +
            score +
            " out of " +
            quizQuestions.length
        );
        return;
      }

      userAnswer = userAnswer.toLowerCase().trim();

      // answer check and lower casing converting
      if (userAnswer === quizQuestions[i].answer.toLowerCase()) {
        score++;
        // correct message
        alert("Correct.");
      } else {
        // incorrect message
        alert("Incorrect. \nThe correct answer is: " + quizQuestions[i].answer);
      }
    }

    // final score
    alert(
      "Quiz Completed\nYour final score: " +
        score +
        " out of " +
        quizQuestions.length
    );
    console.log("Final Score: " + score + "/" + quizQuestions.length);
  }

  // quizestart
  console.log("The console quiz Game.");
  console.log("Start the quiz, type: runQuiz()");
  console.log("Or the quiz is starting in 2 seconds...");

  // timeout to start the quize automatically after 2 second.
  setTimeout(runQuiz, 2000);

