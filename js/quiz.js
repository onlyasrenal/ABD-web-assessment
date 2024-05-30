document.addEventListener('DOMContentLoaded', async function () {

  let currentQuestionIndex
  let correctAnswer
  function startTimeCountdown() {
    const time = document.getElementById('time')
    let timeleft = 10
    time.textContent = 'You have ' + timeleft-- + ' seconds to finish the quiz'
    let countdown = setInterval(function () {
      time.textContent = 'You have ' + timeleft-- + ' seconds to finish the quiz'
      if (timeleft < 0) {
        clearInterval(countdown)
        time.textContent = 'Time is over !'
        timeout()
      }
    }, 1000)
  }

  function timeout() {
    console.log("Time's up!");
    const quizData = data[currentQuestionIndex];
    displayMessage(`Time's up! The correct answer was: ${quizData.answer}`);
    // 3秒后进入下一题
    setTimeout(() => {
      currentQuestionIndex++;
      displayNextQuestion();
    }, 3000);
  }
  const jsonUrl = './ques.json'
  try {
    const response = await fetch(jsonUrl)
    console.log('start')
    if (!response.ok) {
      throw Error(`Error! status: ${response.status}`)
    }
    var data = await response.json()
    console.log(data)
    // startQuiz()
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
  function displayQuiz(quizData, index) {
    startTimeCountdown();
    const title = document.getElementById('title')
    const quizContent = document.getElementById('content')
    const optionsElement = document.querySelector('.options ul')

    quizContent.innerHTML = ''
    optionsElement.innerHTML = ''

    quizContent.innerHTML = quizData.question

    quizData.options.forEach((Option) => {
      title.innerHTML = 'Question ' + (index + 1) + ':'
      const li = document.createElement('li')
      const button = document.createElement('button')
      li.appendChild(button)
      optionsElement.appendChild(li)
      button.textContent = Option
      button.addEventListener('click', function () {
        const isCorrect = checkAnswer(this.textContent, quizData.answer);
        const message = isCorrect ? 'Correct!' : `Wrong! The correct answer is: ${quizData.answer}`;
        quizContent.innerHTML = message;

        if (isCorrect) {
          correctAnswers++; // 答对题目，增加计数器
        }

        // 无论答对答错，3秒后进入下一题
        setTimeout(() => {
          currentQuestionIndex = index + 1;
          displayNextQuestion();
        }, 3000);
      });
    })
  }
  // function displayMessage(message) {
  //   const messageElement = document.getElementById('quizResults');
  //   messageElement.textContent = message;
  //   // 3秒后清除消息
  //   setTimeout(() => {
  //     messageElement.textContent = '';
  //   }, 3000);
  // }
  function checkAnswer(textContent, answer) {
    if (textContent === answer) {
      return true
    } else {
      return false
    }
  }

  function displayNextQuestion() {
    if (currentQuestionIndex < data.length) {
      displayQuiz(data[currentQuestionIndex], currentQuestionIndex);
    } else {
      displayMessage(`Quiz completed! You got ${correctAnswers} answers correct.`);
      // 重置计数器和索引
      correctAnswers = 0;
      currentQuestionIndex = 0;
      // 可以在这里添加其他结束测验后的逻辑
    }
  }

  function startQuiz() {
    // 重置计数器和索引
    correctAnswers = 0;
    currentQuestionIndex = 0;
    // 显示第一个问题
    displayQuiz(data[currentQuestionIndex], currentQuestionIndex);
  }

  function startAll() {
    const quizContent = document.getElementById('content')
    quizContent.innerHTML = ''
    console.log('start1')
    quizContent.innerHTML = '<div>Please enter you name</div><input type="text" id="nameInput" placeholder="Enter your name">'
    const submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    submitButton.id = 'submitButton'
    quizContent.appendChild(submitButton)
    submitButton.addEventListener('click', function () {
      let userName = document.getElementById('nameInput').value
      console.log(userName)
      if (userName) {
        startQuiz()
      } else {
        alert('Please enter your name.')
      }
    })

  }
  startAll()
})