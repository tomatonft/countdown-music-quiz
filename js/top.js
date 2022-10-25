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

  // モーダル
  const mask = document.getElementById('mask');
  const modal = document.getElementById('modal');
  const modalBack = document.getElementById('modal-back');
  const modalStart = document.getElementById('modal-start');
  const explanation = document.getElementById('explanation');
  const modalNote = document.getElementById('modal-note');
  const levelBtns = document.querySelectorAll('.levels-circle-inner > span');

  levelBtns.forEach(levelBtn => {
  levelBtn.addEventListener('click', () => {
    let levelNum;
    if (levelBtn.textContent === 'レベル 1') {
      explanation.innerHTML = 'トおんきごうの<br>おとあてクイズだよ！';
      levelNum = 1;
    } else if (levelBtn.textContent === 'レベル 2') {
      explanation.innerHTML = 'ヘおんきごうの<br>おとあてクイズだよ！';
      levelNum = 2;
    } else if (levelBtn.textContent === 'レベル 3') {
      explanation.innerHTML = 'トおんきごうの<br>おとあてクイズだよ！<br>(レベル１より<br>１オクターブたかい)';
      levelNum = 3;
    } else if (levelBtn.textContent === 'レベル 4') {
      explanation.innerHTML = 'ヘおんきごうの<br>おとあてクイズだよ！<br>(レベル２より<br>１オクターブひくい）';
      levelNum = 4;
    }
      modalNote.src = `level-${levelNum}/img/do.png`;
      modalStart.href = `level-${levelNum}/index.html`;
      mask.classList.remove('hidden');
      modal.classList.remove('hidden');
  });
  });

  modalBack.addEventListener('click', () => {
    mask.classList.add('hidden');
    modal.classList.add('hidden');
  });

  mask.addEventListener('click', () => {
    modalBack.click();
  });
}