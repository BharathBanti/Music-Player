// =========================
// Player
// =========================

/* DOM Selections */
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

/* Center Panel */
const currentPlaylistName = document.getElementById('currentPlaylistName');
const currentPlayingSongImage = document.getElementById('currentPlayingSongImage');
const currentPlayingSong = document.getElementById('currentPlayingSong');

/* Audio Object */
const audio = new Audio();
let playQueue = [];

/* Player State */
const playerState = {
    currentSongId: songs[0].id,
    isPlaying: false,
    volume: 0.8,
    isMuted: false,
    repeatMode: 'off', // off | one | all
    shuffle: false,
};

/* ------------------------- */
/* Song Loading */
/* ------------------------- */
function loadSongById(id) {
    const song = songs.find(s => s.id === id);
    if (!song) return;

    audio.src = song.songName;

    currentPlaylistName.textContent = song.playlist;
    currentPlayingSong.textContent = `${song.title} - ${song.artist}`;
    currentPlayingSongImage.src = song.image;

    currentSongImage.src = song.image;
    currentSongName.textContent = `${song.title} - ${song.artist}`;

    highlightCurrentSong();
}

/* ------------------------- */
/* Play / Pause */
/* ------------------------- */
function playSong() {
    audio.volume = playerState.volume;
    audio.play().catch(() => {});
    playerState.isPlaying = true;
    playPauseBtn.querySelector('i').className = 'fas fa-pause';
}

function pauseSong() {
    audio.pause();
    playerState.isPlaying = false;
    playPauseBtn.querySelector('i').className = 'fas fa-play';
}

function togglePlayPause() {
    playerState.isPlaying ? pauseSong() : playSong();
}

/* ------------------------- */
/* Navigation */
/* ------------------------- */
/* next song */
function nextSong() {
    if (!playQueue.length) return;

    const currentIndex = playQueue.findIndex(
        song => song.id === playerState.currentSongId
    );

    const nextIndex = getNextSongIndex(currentIndex, playQueue.length);
    playerState.currentSongId = playQueue[nextIndex].id;

    loadSongById(playerState.currentSongId);
    playSong();
}

/* previous song */
function prevSong() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }

    if (!playQueue.length) return;

    const currentIndex = playQueue.findIndex(
        song => song.id === playerState.currentSongId
    );

    const prevIndex = getPrevSongIndex(currentIndex, playQueue.length);
    playerState.currentSongId = playQueue[prevIndex].id;

    loadSongById(playerState.currentSongId);
    playSong();
}

/* ------------------------- */
/* Time and Progress */
/* ------------------------- */
/* formatting time */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/* updating current time of song in live */
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

/* displaying duration of song */
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

/* seeking controller */
progressBar.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

/* Auto play next */
audio.addEventListener('ended', () => {
    const index = playQueue.findIndex(
        song => song.id === playerState.currentSongId
    );

    if (playerState.repeatMode === 'off' && index === playQueue.length - 1) {
        pauseSong();
        return;
    }

    nextSong();
});

/* ------------------------- */
/* Volume and Mute */
/* ------------------------- */
const volumeSlider = document.getElementById('volumeBar');
const volumeIcon = document.getElementById('volumeIcon');

audio.volume = playerState.volume;

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
    playerState.volume = audio.volume;

    volumeIcon.className =
        audio.volume === 0
            ? 'fas fa-volume-mute'
            : audio.volume < 0.5
            ? 'fas fa-volume-down'
            : 'fas fa-volume-up';
});

volumeIcon.addEventListener('click', () => {
    audio.muted = !audio.muted;
    volumeIcon.className = audio.muted
        ? 'fas fa-volume-mute'
        : 'fas fa-volume-up';
});

/* ------------------------- */
/* Keyboard shortcuts */
/* ------------------------- */
document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowRight':
            nextSong();
            break;
        case 'ArrowLeft':
            prevSong();
            break;
        case 'ArrowUp':
            e.preventDefault();
            audio.volume = Math.min(1, audio.volume + 0.1);
            volumeSlider.value = audio.volume * 100;
            break;
        case 'ArrowDown':
            e.preventDefault();
            audio.volume = Math.max(0, audio.volume - 0.1);
            volumeSlider.value = audio.volume * 100;
            break;
    }
});

/* ------------------------- */
/* Shuffle and Repeat */
/* ------------------------- */
/* repeat functionaliy */
function getNextSongIndex(currentIndex, length) {
    if (length <= 1) return currentIndex;

    if (playerState.repeatMode === 'one') return currentIndex;

    if (playerState.shuffle) {
        let index;
        do {
            index = Math.floor(Math.random() * length);
        } while (index === currentIndex);
        return index;
    }

    if (currentIndex < length - 1) return currentIndex + 1;
    return playerState.repeatMode === 'all' ? 0 : currentIndex;
}

function getPrevSongIndex(currentIndex, length) {
    if (length <= 1) return currentIndex;

    if (playerState.repeatMode === 'one') return currentIndex;

    if (playerState.shuffle) {
        let index;
        do {
            index = Math.floor(Math.random() * length);
        } while (index === currentIndex);
        return index;
    }

    if (currentIndex > 0) return currentIndex - 1;
    return playerState.repeatMode === 'all' ? length - 1 : currentIndex;
}

/* Shuffle Toggle */
shuffleBtn.addEventListener('click', () => {
    playerState.shuffle = !playerState.shuffle;
    shuffleBtn.classList.toggle('text-spotify', playerState.shuffle);
});

/* Repeat Toggle */
const loopIcon = loopBtn.querySelector('i');
loopBtn.addEventListener('click', () => {
    if (playerState.repeatMode === 'off') {
        playerState.repeatMode = 'one';
        loopIcon.className = 'fa-solid fa-arrow-rotate-left text-spotify';
    } else if (playerState.repeatMode === 'one') {
        playerState.repeatMode = 'all';
        loopIcon.className = 'fa-solid fa-arrows-spin text-spotify';
    } else {
        playerState.repeatMode = 'off';
        loopIcon.className = 'fas fa-repeat';
    }
});

/* ------------------------- */
/* Searching */
/* ------------------------- */
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(query)
    );

    playQueue = [...filteredSongs];

    renderSongList(filteredSongs);
});