// Numbers
const numbers = document.querySelectorAll('.tracks-list-item');

numbers.forEach((elem, index) => {
    let number = document.createElement('div');
    number.className = 'tracks-list-item-number';
    number.innerHTML = `0${index + 1}`;

    elem.insertBefore(number, elem.firstChild);
});

// Menu
const menu = document.querySelector('.nav-btn');
const menuContent = document.querySelector('.mobile-nav');

menu.addEventListener('click', () => {
    menuContent.classList.toggle('mobile-nav_active');
    menu.classList.toggle('nav-button-close');
});


 // Music  
const player = document.querySelector('.audio');
const playBtns = document.querySelectorAll('.audio-btn');
const audio = document.querySelector('audio');
const progressContainer = document.querySelector('.tracks-progress-container');
const progress = document.querySelector('.tracks-progress');
const songs = document.querySelectorAll('.tracks-list-item');
const imgSrc = document.querySelectorAll('.img-src')[1];

songs.forEach((song, index) => {
  song.addEventListener('click', () => {
    const songName = song.textContent.slice(2);
    audio.src = `./audio/${songName}.mp3`;
    audio.play();
    imgSrc.src = 'img/pause.png';
  });
});

function playSong(elem, i) {
  elem.classList.add('play');
  imgSrc.src = 'img/pause.png';
  audio.play();
}

function stopSong(elem, i) {
  elem.classList.remove('play');
  imgSrc.src = 'img/play.svg';
  audio.pause();
}
 
playBtns.forEach((elem, i) => {
  elem.addEventListener('click', () => {
    const isPlaying = elem.classList.contains('play');
    if (isPlaying) {
        stopSong(elem, i);
    } else {
        playSong(elem, i);
    }
  });
});

function updateProgress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
  const width = this.clientWidth;
  const scroll = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (scroll / width) * duration;
}
  progressContainer.addEventListener('click', setProgress);

    // imgSrc.src == './img/pause.png'


// slider 
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slider = document.querySelector('.concert-list');
const items = document.querySelectorAll('.concert-item');

prevBtn.addEventListener('click', () => {
  
})





// cursor