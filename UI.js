// ===========================
// Rendering Songs
// ===========================
/* get songs in alphabetical order */
function getAlphabeticalSongs(list){
    return [...list].sort((a, b) => {
        const titleA = a.title.trim().toLowerCase();
        const titleB = b.title.trim().toLowerCase();
        return titleA.localeCompare(titleB);
    });
}

/* render songs */
function renderSongList(list) {
    songList.innerHTML = "";

    if (!Array.isArray(list) || list.length === 0) {
        songList.innerHTML = `
            <li class="text-center text-gray-400 py-6">
                No songs found
            </li>
        `;
        playQueue = [];
        return;
    }

    // songs in alphabetical order
    const sortedList = getAlphabeticalSongs(list);

    playQueue = [...sortedList];

    sortedList.forEach((song) => {
        const li = document.createElement("li");
        li.dataset.id = song.id;

        li.className = `
            flex items-center justify-between p-2 rounded cursor-pointer
            text-black dark:text-white
            bg-lightcard dark:bg-darkcard
            border border-lightborder dark:border-darkborder
            hover:bg-gray-100 dark:hover:bg-darkbg
            transition-colors duration-200
        `;

        li.innerHTML = `
            <div class="flex items-center gap-3 w-[70%]">
                <img
                    src="${song.image}"
                    alt="${song.title}"
                    class="w-10 h-10 rounded object-cover flex-shrink-0"/>
                <span class="song-title truncate text-black dark:text-white">
                    ${song.title}
                </span>
            </div>
            <span class="text-sm flex-shrink-0 text-gray-500 dark:text-gray-400">
                ${song.duration}
            </span>
        `;

        li.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                songListPanel.classList.add("hidden");
            }

            playerState.currentSongId = song.id;
            loadSongById(song.id);
            playSong();
        });

        songList.appendChild(li);
    });


    highlightCurrentSong();
}

/* ---------------------------------- */
/* Hight light active song */
/* ---------------------------------- */

function highlightCurrentSong() {
    const items = songList.querySelectorAll("li");

    items.forEach((li) => {
        // Reset background
        li.classList.remove("bg-darkbg", "bg-spotify/10");

        // Reset title color to theme default
        const title = li.querySelector(".song-title");
        if (title) {
            title.classList.remove("text-spotify");
            title.classList.remove("text-white");

            // Let it inherit from li
            title.classList.add("text-black", "dark:text-white");
        }
    });

    const active = songList.querySelector(
        `li[data-id="${playerState.currentSongId}"]`
    );

    if (active) {
        // Theme-aware active background
        active.classList.add("bg-spotify/10", "dark:bg-darkbg");

        const title = active.querySelector(".song-title");
        if (title) {
            title.classList.remove("text-black", "dark:text-white");
            title.classList.add("text-spotify");
        }
    }
}
