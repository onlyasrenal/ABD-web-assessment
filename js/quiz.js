document.addEventListener('DOMContentLoaded', async function () {
  let currentQuestionIndex = 0
  let correctAnswers = 0
  let countdown
  let result
  let startTime
  let endTime
  sortedData = localStorage.getItem('myData')
  console.log(sortedData)
  if (sortedData) {
    result = JSON.parse(sortedData)
    console.log(result)
  }
  else {
    result = []
  }
  let sortedResult = []
  let username
  function startTimeCountdown() {
    const timeElement = document.getElementById('time')
    seconds = 10
    timeElement.textContent = 'Time left: 10 s'
    countdown = setInterval(() => {
      seconds--
      timeElement.textContent = 'Time left: ' + seconds + 's'
      if (seconds <= 0) {
        clearInterval(countdown)
        timeElement.textContent = 'Time is over!'
        timeout()
      }
    }, 1000)
  }

  function timeout() {
    console.log("Time's up!")
    const Content = document.getElementById('content')
    Content.textContent = `The correct answer was: ${data[currentQuestionIndex].answer}`
    const removeButton = document.querySelector('.options ul');
    removeButton.removeEventListener
    removeButton.textContent = ''
    setTimeout(() => {
      const buttons = document.querySelectorAll('.options ul button');
      buttons.forEach(button =>
        button.removeEventListener('click', button.onclick)
      )
      currentQuestionIndex++
      displayQuiz(data[currentQuestionIndex], currentQuestionIndex)
    }, 3000)
  }
  const jsonUrl = './ques.json'
  try {
    const response = await fetch(jsonUrl)
    console.log('start')
    if (!response.ok) {
      throw Error(`Error! status: ${response.status}`)
    }
    var data = await response.json()
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
  function displayQuiz(quizData, index) {
    startTimeCountdown()
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
        const userAnswer = this.textContent;
        const isCorrect = checkAnswer(userAnswer, quizData.answer);

        // 显示用户选择的答案是否正确
        quizContent.innerHTML = isCorrect ? '<p>Correct!</p>' :
          `<p>Wrong! You choose ${userAnswer} but the correct answer is: ${quizData.answer}</p>`;

        if (isCorrect) {
          correctAnswers++;
        }
        const removeButton = document.querySelector('.options ul');
        removeButton.removeEventListener
        removeButton.innerHTML = '<button id = "nextbutton">next</button>'
        clearInterval(countdown)
        const nextButton = document.getElementById('nextbutton');
        nextButton.addEventListener('click', () => {
          quizContent.innerHTML = '';

          // 检查是否还有更多问题
          if (currentQuestionIndex < data.length - 1) {
            currentQuestionIndex++;
            displayQuiz(data[currentQuestionIndex], currentQuestionIndex);
          } else {
            // 测验结束，显示最终得分
            endTime = new Date().getTime()
            useTime = ((endTime - startTime) / 1000).toFixed(2)
            let newResult = {
              name: username,
              score: correctAnswers,
              time: useTime
            }
            result.push(newResult)
            let sortedResult = result.slice().sort((a, b) => {
              if (a.score == b.score) {
                return a.time - b.time;
              } else {
                return b.score - a.score;
              }
            });
            console.log(sortedResult)
            updateRanking(sortedResult)
            localStorage.setItem('myData', JSON.stringify(sortedResult))
            quizContent.innerHTML = `<p>Quiz completed! You used ${useTime} seconds to get ${correctAnswers} out of ${data.length} answers correct.</p>`;
            button.textContent = ''
            removeButton.innerHTML = ''
            li.appendChild(button)
            optionsElement.appendChild(li)
            button.innerHTML = 'Restart'
            // restart
            button.addEventListener('click', function () {
              window.location.reload()
            })
          }
        })
      })
    })
  }
  function checkAnswer(textContent, answer) {
    if (textContent === answer) {
      return true
    } else {
      return false
    }
  }

  function startQuiz() {
    correctAnswers = 0
    currentQuestionIndex = 0
    startTime = new Date().getTime()
    displayQuiz(data[currentQuestionIndex], currentQuestionIndex)
  }

  function updateRanking(data) {
    console.log(data)
    let rows = document.querySelectorAll('.rank table tbody tr');
    data.slice(0, 10).forEach((item, index) => {
      if (index < rows.length) {
        //填充数据
        rows[index].querySelector('td:nth-child(2)').textContent = item.name
        rows[index].querySelector('td:nth-child(3)').textContent = item.score;
        rows[index].querySelector('td:nth-child(4)').textContent = item.time
      }
    });
  }
  function startAll() {
    const quizContent = document.getElementById('content')
    quizContent.innerHTML = ''
    quizContent.innerHTML = '<div>Please enter your name</div>'
    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.id = 'nameInput'
    nameInput.placeholder = 'Enter your name'

    const submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    submitButton.id = 'submitButton'

    quizContent.appendChild(nameInput)
    quizContent.appendChild(submitButton)
    updateRanking(result)
    submitButton.addEventListener('click', function () {
      username = document.getElementById('nameInput').value
      if (username) {
        startQuiz()
      } else {
        alert('Please enter your name.')
      }
    })
  }
  startAll()
})