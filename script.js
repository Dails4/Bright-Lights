document.addEventListener("DOMContentLoaded", function() {

// Numbers
const numbers = document.querySelectorAll('.tracks-list-item');

numbers.forEach((elem, index) => {
    let number = document.createElement('div');
    number.className = 'tracks-list-item-number';
    number.innerHTML = `0${index + 1}`;

    elem.insertBefore(number, elem.firstChild);
});

// Menu
const menuBtn = document.querySelector('.nav-btn');
const menu = document.querySelector('.mobile-nav');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('mobile-nav_active');
    menuBtn.classList.toggle('nav-button-close');
});

menu.addEventListener('click', (event) => {
  let target = event.target;
      if(target = '.nav-link'){
          menu.classList.remove('mobile-nav_active');
          menuBtn.classList.remove('nav-button-close');
      }
})


 // Music  
const player = document.querySelector('.audio');
const playBtns = document.querySelectorAll('.audio-btn');
const audio = document.querySelector('audio');
const progressContainer = document.querySelectorAll('.audio-container');
const progress = document.querySelectorAll('.audio-progress');
const songs = document.querySelectorAll('.tracks-list-item');
const imgSrcs = document.querySelectorAll('.img-src');
const time = document.querySelectorAll('.time');

songs.forEach((song, index) => {
  song.addEventListener('click', () => {
    const songName = song.textContent.slice(2);
    audio.src = `./audio/${songName}.mp3`;
    audio.play();
    imgSrcs.forEach((elem) => elem.src = 'img/pause.png');
  });
});

function playSong() {
  playBtns.forEach((elem) => elem.classList.add('play'));
  imgSrcs.forEach((elem) => elem.src = 'img/pause.png');
  audio.play();
}

function stopSong() {
  playBtns.forEach((elem) => elem.classList.remove('play'));
  imgSrcs.forEach((elem) => elem.src = 'img/play.svg');
  audio.pause();
}

playBtns.forEach((elem, i) => {
  elem.addEventListener('click', () => {
    const isPlaying = elem.classList.contains('play');
    if (isPlaying) {
        stopSong();
    } else {
        playSong();
    }
  });
});
audio.addEventListener('loadedmetadata', () => {
  updateProgress();
});
function updateProgress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progressPercent = (currentTime / duration) * 100;

  const curMinutes = Math.floor(currentTime / 60),
        curSeconds = Math.floor(currentTime % 60),
        durMinutes = Math.floor(duration / 60),
        durSeconds = Math.floor(duration % 60);
  function addZero(elem) {
    if (String(elem).length === 1) {
      return '0' + elem;
    } else {
      return String(elem);
    }
  };
  time.forEach((elem) => {
    elem.innerHTML = `${addZero(curMinutes)}:${addZero(curSeconds)}-${addZero(durMinutes)}:${addZero(durSeconds)}`;
  });

  progress.forEach((elem) => {
    elem.style.width = `${progressPercent}%`;
  });
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
  const width = this.clientWidth;
  const scroll = e.offsetX;
  console.log(width)
  const duration = audio.duration;
  audio.currentTime = (scroll / width) * duration;
}
progressContainer.forEach((elem) => {
  elem.addEventListener('mousedown', setProgress);
});

//video

const video = document.querySelector('.video-player')
const videoPosition = video.getBoundingClientRect().top;
const windowHeight = window.innerHeight;

window.addEventListener("scroll", function() {
  if (videoPosition < windowHeight) {
    video.play();
  }
});


// slider

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slider = document.querySelector('.slider');
const sliderWrap = document.querySelector('.concert-list');
const items = document.querySelectorAll('.concert-item');
let position = 0;
let visSlides = checkWidth();
let scrollSlides = 1;
let itemWidth = (slider.clientWidth - 30 * visSlides) / visSlides;
let scroll = (itemWidth + 30) * scrollSlides;

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});

prevBtn.addEventListener('click', () => {

  position += scroll;
  setPosition(); 
  disableBtn();
});
nextBtn.addEventListener('click', () => {
  
  position -= scroll;
  setPosition();
  disableBtn();
});

const setPosition = () => {
  sliderWrap.style.transform = `translateX(${position}px)`; 
};

const disableBtn = () => {
  prevBtn.disabled = position === 0;
  nextBtn.disabled = position <= -(items.length - visSlides) * itemWidth;
};

function checkWidth() {
if (slider.clientWidth <= 600) {
  return 1;
} else if (slider.clientWidth <= 900) {
  return 2;
} else return 3;
}

// popup

const sliderItems = document.querySelectorAll('.concert-item');
const wrap = document.querySelector('.popup-wrap');
const concertImg = document.querySelectorAll('.concert-item img');
const concertName = document.querySelectorAll('.concert-name');
const concertPlace = document.querySelectorAll('.concert-place');
const concertDate = document.querySelectorAll('.concert-date');
const popupImg = document.querySelector('.img-popup');
const popupName = document.querySelector('.popup-name');
const popupPlace = document.querySelector('.popup-place');
const popupDate = document.querySelector('.popup-date');
const popupInput = document.querySelectorAll('.popup-input');
const popupCloseButton = document.querySelector('.popup-close');
const popupBook = document.querySelector('.popup-book');
const success = document.querySelector('.success');


sliderItems.forEach((elem, i) => {
  elem.addEventListener('click', () => {
    wrap.style.display = 'flex';
    popupName.textContent = concertName[i].textContent;
    popupPlace.textContent = concertPlace[i].textContent;
    popupDate.textContent = concertDate[i].textContent;
    popupImg.src = concertImg[i].src;
  })
});

function closePopup() {
  wrap.style.display = 'none';
  popupInput.forEach(e => e.value = '')
  popupInput[0].style.borderColor = '#6e6d6d';
};
function onSuccess() {
  closePopup()
  success.style.opacity = 1;
  setTimeout(() => success.style.opacity = 0, 4000)
}

wrap.addEventListener('click', (event) => {
  let target = event.target;
        target = target.closest('.popup');
  if (!target) {
    closePopup();
  } 
});
popupCloseButton.addEventListener('click', closePopup);
popupBook.addEventListener('click', onSuccess);

popupInput[1].addEventListener('input', (elem, i) => {
  popupInput[1].value = popupInput[1].value.replace(/[^0-9]/g, '');
  if (popupInput[1].value >= 100){
    popupInput[1].value = 99;
    alert('You can\'t buy more than 99 tickets');
    popupInput[2].value = popupInput[1].value * 20 + '$';
  } else {
    popupInput[2].value = popupInput[1].value * 20 + '$';
  }
});

// EmailValidation

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function onInput() {
  if (isEmailValid(popupInput[0].value)) {
    popupInput[0].style.borderColor = 'green';
  } else {
    popupInput[0].style.borderColor = 'red';
  }
}

popupInput[0].addEventListener('input', onInput);

function isEmailValid(value) {
  return EMAIL_REGEXP.test(value);
}

});
// cursor












// prevBtn.addEventListener('click', () => {
//   items.forEach((elem) => {
//     elem.style.left += 240 +'px'
//   })
// })
// slider.addEventListener('mousemove',(e) => {
//   let x = e.clientX;
  
//   console.log(x);
//   console.log(windowSize);
//   if(x > (windowSize / 2)) {
//     sliderWrap.style.left += `${10}px`
//     console.log(`ss`)
//   }
// })