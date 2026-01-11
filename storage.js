// ==========================
// STORAGE
// ==========================

/* Storage Key */
const STORAGE_KEY = 'music_player_state';

/* -------------------------- */
/* Save Player State */
/* -------------------------- */
function savePlayerState() {
    if (!audio || !playerState) return;

    const state = {
        currentSongId: playerState.currentSongId,
        currentTime: audio.currentTime || 0,
        volume: audio.volume ?? 0.8,
        shuffle: playerState.shuffle,
        repeatMode: playerState.repeatMode,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* -------------------------- */
/* Load Player State */
/* -------------------------- */
function loadPlayerState() {
    const saved = localStorage.getItem(STORAGE_KEY);

    // Default state
    if (!saved) {
        playerState.currentSongId = songs[0].id;
        loadSongById(playerState.currentSongId);
        audio.volume = playerState.volume;
        return;
    }

    let state;
    try {
        state = JSON.parse(saved);
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return;
    }

    playerState.currentSongId = state.currentSongId ?? songs[0].id;
    playerState.shuffle = state.shuffle ?? false;
    playerState.repeatMode = state.repeatMode ?? 'off';
    playerState.volume = state.volume ?? 0.8;

    loadSongById(playerState.currentSongId);

    audio.volume = playerState.volume;

    audio.addEventListener(
        'loadedmetadata',
        () => {
            audio.currentTime = state.currentTime ?? 0;
        },
        { once: true }
    );
}

/* -------------------------- */
/* Auto Save audio info */
/* -------------------------- */
audio.addEventListener('timeupdate', savePlayerState);
audio.addEventListener('volumechange', savePlayerState);


/* -------------------------- */
/* Theme save */
/* -------------------------- */
const Storage = {
    getTheme() {
        return localStorage.getItem('theme') || "dark";
    },

    setTheme(theme){
        localStorage.setItem('theme', theme);
    }
}