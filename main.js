// =========================
// DOM Selections
// =========================

/* Top Bar */
const sidebarToggle = document.getElementById('sidebarToggle');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

/* Side Bar */
const createPlaylist = document.getElementById('createPlaylist');
const sidebarClose = document.getElementById('sidebarClose');

/* Center Panel */
const addToPlaylist = document.getElementById('addToPlaylist');

/* Songs Panel */
const songList = document.getElementById('songList');

/* Player Controls */
const currentSongName = document.getElementById('currentSongName');
const currentSongImage = document.getElementById('currentSongImage');
const shuffleBtn = document.getElementById('shuffleBtn');
const prevBtn = document.getElementById('prevBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const loopBtn = document.getElementById('loopBtn');

/* -------------------------- */
/* Window Resize alert */
/* -------------------------- */
function checkDevice() {
    if (window.innerWidth <= 425) {
      document.getElementById("deviceAlert").classList.remove("hidden");
      document.getElementById("deviceAlert").classList.add("flex");
    }
}

function closeAlert() {
    document.getElementById("deviceAlert").classList.add("hidden");
}

window.addEventListener("load", checkDevice);

/* -------------------------- */
/* Theme */
/* -------------------------- */
const root = document.documentElement;

function applyTheme(theme){
    const isDark = theme === 'dark';

    root.classList.toggle('dark', isDark);
    themeIcon.classList.toggle('fa-moon', !isDark);
    themeIcon.classList.toggle('fa-sun', isDark);
}

// load theme on start
const savedTheme = Storage.getTheme();
applyTheme(savedTheme);

/* Toggle theme */
themeToggle.addEventListener('click', () => {
    const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
    Storage.setTheme(newTheme);
    applyTheme(newTheme);
})

// =========================
// Initial Loading
// =========================

document.addEventListener('DOMContentLoaded', () => {
    renderSongList(filteredSongs);

    playQueue = getAlphabeticalSongs(songs);

    loadPlayerState();

    highlightCurrentSong();

    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);

    if (createPlaylist) {
        createPlaylist.addEventListener('click', () => {
            alert('Playlist creation not implemented yet.');
        });    
    }    

    if (addToPlaylist) {
        addToPlaylist.addEventListener('click', () => {
            alert('Add to playlist not implemented yet.');
        });    
    }    
});    



/* ------------------------- */
/* Responsive layout */
/* ------------------------- */
const sidebar = document.getElementById('sidebar');
const songListPanel = document.getElementById('songListPanel');
const songsToggle = document.getElementById('songsToggle');
const songsToggleClose = document.getElementById('songsToggleClose');

sidebarToggle.addEventListener('click', () => {
    if(songListPanel.classList.contains('hidden')){
        sidebar.classList.remove('hidden');
    }
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.add('hidden');
})

if(songsToggle){
    songsToggle.addEventListener('click', () => {
        if(sidebar.classList.contains('hidden')){
            songListPanel.classList.remove('hidden');
        }
    });
}

songsToggleClose.addEventListener('click', () => {
    songListPanel.classList.add('hidden');
})