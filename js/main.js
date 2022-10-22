'use strict';
{
  // スマホでの100vhの見え方の違いを調節（#main-visual) 
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // iOSでのスクロール禁止
  function disableScroll(event) {
    event.preventDefault();
  }
  document.addEventListener('touchmove', disableScroll, { passive: false });

  // クイズのコード
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.getElementById('score-label');
  const scoreLabelMessage = document.getElementById('score-label-message');
  const correctAnswer = document.getElementById('correct-answer');
  const wrongAnswer = document.getElementById('wrong-answer');
  const correction = document.getElementById('correction');
  const celebration = document.getElementById('celebration');
  const balloons = document.querySelectorAll('.balloons > i');
  const remainingNumbersCorrect = document.getElementById('remaining-numbers-correct');
  const remainingNumbersWrong = document.getElementById('remaining-numbers-wrong');
  const time = document.getElementById('time');

  let vw = window.innerWidth;

  const sec = document.getElementById("sec");
  const timeLeft = document.getElementById("time-left");
  let count;
  

  const quizSet = shuffle([
    {q: 'img/do.png', c: ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ']},
    {q: 'img/re.png', c: ['レ', 'ド', 'ミ', 'ファ', 'ソ', 'ラ', 'シ']},
    {q: 'img/mi.png', c: ['ミ', 'レ', 'ド', 'ファ', 'ソ', 'ラ', 'シ']},
    {q: 'img/fa.png', c: ['ファ', 'レ', 'ド', 'ミ', 'ソ', 'ラ', 'シ']},
    {q: 'img/sol.png', c: ['ソ', 'レ', 'ド', 'ミ', 'ファ', 'ラ', 'シ']},
    {q: 'img/la.png', c: ['ラ', 'レ', 'ド', 'ミ', 'ソ', 'ファ', 'シ']},
    {q: 'img/si.png', c: ['シ', 'レ', 'ド', 'ミ', 'ソ', 'ラ', 'ファ']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    clearInterval(startTimer);
    
    if (li && li.textContent === quizSet[currentNum].c[0]) {
      // 選択していればliはtrueになる
      li.classList.add('correct');
      correctAnswer.classList.remove('hidden');
      remainingNumbersCorrect.textContent = `あと${quizSet.length - currentNum - 1}もん！！`;
      if (currentNum === quizSet.length - 1 ) {
        remainingNumbersCorrect.textContent = '';
      }
      score++;
    } else {
      if (li) {
        li.classList.add('wrong');
      }
      wrongAnswer.classList.remove('hidden');
      correction.textContent = `せいかいは、${quizSet[currentNum].c[0]}だよ！`;
      remainingNumbersWrong.textContent = `あと${quizSet.length - currentNum - 1}もん！！`;
      if (currentNum === quizSet.length - 1 ) {
        remainingNumbersWrong.textContent = '';
      }
    }

    btn.classList.remove('disabled');
 }

  function setQuiz() {
    isAnswered = false;
    const img_notes = document.createElement('img');
    img_notes.src = quizSet[currentNum].q;
      if (vw > 600) {
        img_notes.height = 350 - 24 - 14;
      } else {
        img_notes.height = 350 - 24 - 14 - 60 - 80;
      }
     
    question.appendChild(img_notes);
    correctAnswer.classList.add('hidden'); 
    wrongAnswer.classList.add('hidden');

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
        // checkAnswer(li.textContent); 判定のみ
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1 ) {
      btn.textContent = 'けっかはっぴょう！';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1 && score === quizSet.length) {
      
      celebration.classList.remove('hidden');
      balloons.forEach(balloon => {
        balloon.classList.add('appear');
      });

    }  else if (currentNum === quizSet.length - 1) {

      scoreLabel.textContent = `${quizSet.length}もんちゅう ${score}もんせいかい！`;
      result.classList.remove('hidden');

      if (score >= quizSet.length * 0.8) {
        scoreLabelMessage.textContent = 'おしい！あとすこし！！';
      } else if (score < quizSet.length * 0.8 && score >= quizSet.length * 0.5) {
        scoreLabelMessage.textContent = 'もうすこしがんばろう！';
      } else {
        scoreLabelMessage.textContent = 'もういちどふくしゅうしよう！';
      }

    } else {
      
      currentNum++;
      while(question.firstChild) {
       question.removeChild(question.firstChild);
     }
      setQuiz();
      countdown();
    }
  });

   // カウントダウン
    let startTimer;
    function countdown(){
        count = 10; //初期化
        time.classList.remove('time-over');
        sec.textContent = `あと${count}びょう`;
        timeLeft.style.width = `${count * 10}%`;
        startTimer = setInterval(() => {
          sec.textContent = `あと${count}びょう`;
          count--;
          timeLeft.style.width = `${(count + 1) * 10}%`;
          if (count < 0) {
          sec.textContent = 'じかんぎれ...';
          time.classList.add('time-over');
          checkAnswer();
          // 引数を渡さないことで選択しないことを表現する
          }
        }, 1000);
      } 
  countdown();

}


