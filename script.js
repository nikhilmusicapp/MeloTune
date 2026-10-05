document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MELOTUNE SONG DATA
       ========================= */

    const songs = [
        {
            id: 1,
            title: "Midnight Dreams",
            artist: "MeloTune",
            cover: "https://placehold.co/500x500/21183d/ffffff?text=Midnight",
            audio: "songs/song1.mp3",
            pinned: true
        },
        {
            id: 2,
            title: "Golden Morning",
            artist: "MeloTune",
            cover: "https://placehold.co/500x500/49351b/ffffff?text=Golden",
            audio: "songs/song2.mp3",
            pinned: true
        },
        {
            id: 3,
            title: "Lost In The Beat",
            artist: "MeloTune",
            cover: "https://placehold.co/500x500/321b42/ffffff?text=Beat",
            audio: "songs/song3.mp3",
            pinned: true
        },
        {
            id: 4,
            title: "Ocean Lights",
            artist: "MeloTune",
            cover: "https://placehold.co/500x500/163746/ffffff?text=Ocean",
            audio: "songs/song4.mp3",
            pinned: true
        },
        {
            id: 5,
            title: "City Nights",
            artist: "MeloTune",
            cover: "https://placehold.co/500x500/302044/ffffff?text=City",
            audio: "songs/song5.mp3",
            pinned: false
        },
        {
            id: 6,
            title: "Dreamy Roads",
            artist: "MeloTune",
            cover: "https://placehold.co/500x500/233c35/ffffff?text=Dreamy",
            audio: "songs/song6.mp3",
            pinned: false
        },
        {
            id: 7,
            title: "Electric Heart",
            artist: "MeloTune",
            cover: "https://placehold.co/500x500/431c32/ffffff?text=Heart",
            audio: "songs/song7.mp3",
            pinned: false
        },
        {
            id: 8,
            title: "Rainy Evening",
            artist: "MeloTune",
            cover: "https://placehold.co/500x500/1d2b45/ffffff?text=Rain",
            audio: "songs/song8.mp3",
            pinned: false
        }
    ];


    /* =========================
       ELEMENTS
       ========================= */

    const splashScreen = document.getElementById("splashScreen");
    const app = document.getElementById("app");

    const audio = document.getElementById("audioPlayer");

    const playerCover = document.getElementById("playerCover");
    const playerTitle = document.getElementById("playerTitle");
    const playerArtist = document.getElementById("playerArtist");

    const playPauseBtn = document.getElementById("playPauseBtn");
    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");
    const shuffleBtn = document.getElementById("shuffleBtn");
    const repeatBtn = document.getElementById("repeatBtn");

    const progressBar = document.getElementById("progressBar");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");

    const volumeBar = document.getElementById("volumeBar");

    const playerFavorite = document.getElementById("playerFavorite");

    const searchInput = document.getElementById("searchInput");

    const usernameElement = document.getElementById("username");
    const greetingTime = document.getElementById("greetingTime");

    const pinnedSongs = document.getElementById("pinnedSongs");
    const recentSongs = document.getElementById("recentSongs");
    const allSongs = document.getElementById("allSongs");
    const favoriteSongs = document.getElementById("favoriteSongs");
    const playlistContainer = document.getElementById("playlistContainer");

    const playlistModal = document.getElementById("playlistModal");
    const addPlaylistModal = document.getElementById("addPlaylistModal");

    const playlistName = document.getElementById("playlistName");
    const playlistChoices = document.getElementById("playlistChoices");


    /* =========================
       APP DATA
       ========================= */

    let currentSongIndex = -1;

    let favorites =
        JSON.parse(localStorage.getItem("melotuneFavorites")) || [];

    let playlists =
        JSON.parse(localStorage.getItem("melotunePlaylists")) || [];

    let recent =
        JSON.parse(localStorage.getItem("melotuneRecent")) || [];

    let username =
        localStorage.getItem("melotuneUsername") || "Nikhil";

    let shuffle = false;
    let repeat = false;

    let songToAddToPlaylist = null;


    /* =========================
       SPLASH SCREEN
       ========================= */

    setTimeout(() => {

        splashScreen.style.opacity = "0";
        splashScreen.style.transition = "opacity 0.5s ease";

        setTimeout(() => {
            splashScreen.style.display = "none";
            app.classList.remove("app-hidden");
        }, 500);

    }, 3000);


    /* =========================
       GREETING
       ========================= */

    function updateGreeting() {

        const hour = new Date().getHours();

        if (hour < 12) {
            greetingTime.textContent = "Good Morning ☀️";
        } else if (hour < 17) {
            greetingTime.textContent = "Good Afternoon 🌤️";
        } else if (hour < 21) {
            greetingTime.textContent = "Good Evening 🌆";
        } else {
            greetingTime.textContent = "Good Night 🌙";
        }

        usernameElement.textContent = username;
    }

    updateGreeting();


    /* =========================
       SAVE DATA
       ========================= */

    function saveData() {

        localStorage.setItem(
            "melotuneFavorites",
            JSON.stringify(favorites)
        );

        localStorage.setItem(
            "melotunePlaylists",
            JSON.stringify(playlists)
        );

        localStorage.setItem(
            "melotuneRecent",
            JSON.stringify(recent)
        );
    }


    /* =========================
       SONG CARD
       ========================= */

    function createSongCard(song) {

        const isFavorite = favorites.includes(song.id);

        return `
            <div class="song-card">

                <img
                    class="song-cover"
                    src="${song.cover}"
                    alt="${song.title}"
                >

                <h3>${song.title}</h3>

                <p>${song.artist}</p>

                <div class="card-buttons">

                    <button
                        class="card-play"
                        onclick="playSong(${song.id})"
                        title="Play"
                    >
                        ▶
                    </button>

                    <button
                        class="card-heart"
                        onclick="toggleFavorite(${song.id})"
                        title="Favorite"
                    >
                        ${isFavorite ? "❤️" : "♡"}
                    </button>

                    <button
                        class="add-playlist-btn"
                        onclick="openAddPlaylist(${song.id})"
                        title="Add to playlist"
                    >
                        ＋
                    </button>

                </div>

            </div>
        `;
    }


    /* =========================
       SONG ROW
       ========================= */

    function createSongRow(song) {

        const isFavorite = favorites.includes(song.id);

        return `
            <div class="song-row">

                <img
                    src="${song.cover}"
                    alt="${song.title}"
                >

                <div class="song-row-info">

                    <h3>${song.title}</h3>

                    <p>${song.artist}</p>

                </div>

                <button onclick="toggleFavorite(${song.id})">
                    ${isFavorite ? "❤️" : "♡"}
                </button>

                <button onclick="openAddPlaylist(${song.id})">
                    ＋
                </button>

                <button onclick="playSong(${song.id})">
                    ▶
                </button>

            </div>
        `;
    }


    /* =========================
       RENDER SONGS
       ========================= */

    function renderSongs(list = songs) {

        pinnedSongs.innerHTML = songs
            .filter(song => song.pinned)
            .map(createSongCard)
            .join("");

        allSongs.innerHTML = list
            .map(createSongRow)
            .join("");

        renderFavorites();
        renderRecent();
        renderPlaylists();
    }


    /* =========================
       FAVORITES
       ========================= */

    function renderFavorites() {

        const favoriteList = songs.filter(song =>
            favorites.includes(song.id)
        );

        if (favoriteList.length === 0) {

            favoriteSongs.innerHTML = `
                <div class="empty-state">
                    <h2>❤️ No Favorites Yet</h2>
                    <p>Add songs to your favorites and they will appear here.</p>
                </div>
            `;

            return;
        }

        favoriteSongs.innerHTML =
            favoriteList.map(createSongRow).join("");
    }


    /* =========================
       RECENT SONGS
       ========================= */

    function renderRecent() {

        let recentList = recent
            .map(id => songs.find(song => song.id === id))
            .filter(Boolean);

        if (recentList.length === 0) {
            recentList = songs.slice(0, 4);
        }

        recentSongs.innerHTML =
            recentList.map(createSongCard).join("");
    }


    /* =========================
       PLAY SONG
       ========================= */

    window.playSong = function(id) {

        const index = songs.findIndex(song => song.id === id);

        if (index === -1) return;

        currentSongIndex = index;

        const song = songs[index];

        playerCover.src = song.cover;
        playerTitle.textContent = song.title;
        playerArtist.textContent = song.artist;

        audio.src = song.audio;

        audio.play()
            .then(() => {
                updatePlayButton();
            })
            .catch(() => {

                updatePlayButton();

                alert(
                    "Song file nahi mila.\n\n" +
                    "songs folder mein " +
                    getSongFileName(song) +
                    " upload karo."
                );
            });

        recent = recent.filter(id => id !== song.id);

        recent.unshift(song.id);

        recent = recent.slice(0, 6);

        saveData();

        renderRecent();
        updatePlayerFavorite();
    };


    function getSongFileName(song) {

        return song.audio.split("/").pop();
    }


    /* =========================
       PLAY / PAUSE
       ========================= */

    playPauseBtn.addEventListener("click", () => {

        if (currentSongIndex === -1) {

            playSong(songs[0].id);
            return;
        }

        if (audio.paused) {

            audio.play()
                .catch(() => {});

        } else {

            audio.pause();

        }

        updatePlayButton();
    });


    function updatePlayButton() {

        playPauseBtn.textContent =
            audio.paused ? "▶" : "⏸";
    }


    audio.addEventListener("play", updatePlayButton);
    audio.addEventListener("pause", updatePlayButton);


    /* =========================
       NEXT SONG
       ========================= */

    nextBtn.addEventListener("click", nextSong);

    function nextSong() {

        if (songs.length === 0) return;

        let nextIndex;

        if (shuffle) {

            nextIndex =
                Math.floor(Math.random() * songs.length);

        } else {

            nextIndex =
                (currentSongIndex + 1) % songs.length;
        }

        playSong(songs[nextIndex].id);
    }


    /* =========================
       PREVIOUS SONG
       ========================= */

    previousBtn.addEventListener("click", () => {

        if (songs.length === 0) return;

        let previousIndex =
            currentSongIndex - 1;

        if (previousIndex < 0) {
            previousIndex = songs.length - 1;
        }

        playSong(songs[previousIndex].id);
    });


    /* =========================
       AUDIO ENDED
       ========================= */

    audio.addEventListener("ended", () => {

        if (repeat) {

            audio.currentTime = 0;
            audio.play();
            return;
        }

        nextSong();
    });


    /* =========================
       SHUFFLE
       ========================= */

    shuffleBtn.addEventListener("click", () => {

        shuffle = !shuffle;

        shuffleBtn.style.color =
            shuffle ? "#a78bfa" : "";

    });


    /* =========================
       REPEAT
       ========================= */

    repeatBtn.addEventListener("click", () => {

        repeat = !repeat;

        repeatBtn.style.color =
            repeat ? "#a78bfa" : "";

    });


    /* =========================
       PROGRESS BAR
       ========================= */

    audio.addEventListener("loadedmetadata", () => {

        progressBar.max = audio.duration;

        duration.textContent =
            formatTime(audio.duration);
    });


    audio.addEventListener("timeupdate", () => {

        progressBar.value =
            audio.currentTime;

        currentTime.textContent =
            formatTime(audio.currentTime);
    });


    progressBar.addEventListener("input", () => {

        audio.currentTime =
            progressBar.value;
    });


    function formatTime(seconds) {

        if (!seconds || isNaN(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const secs =
            Math.floor(seconds % 60)
                .toString()
                .padStart(2, "0");

        return `${minutes}:${secs}`;
    }


    /* =========================
       VOLUME
       ========================= */

    volumeBar.addEventListener("input", () => {

        audio.volume =
            volumeBar.value;
    });

    audio.volume = 0.8;


    /* =========================
       FAVORITES
       ========================= */

    window.toggleFavorite = function(id) {

        if (favorites.includes(id)) {

            favorites =
                favorites.filter(
                    favoriteId => favoriteId !== id
                );

        } else {

            favorites.push(id);
        }

        saveData();

        renderSongs();

        updatePlayerFavorite();
    };


    function updatePlayerFavorite() {

        if (currentSongIndex === -1) {

            playerFavorite.textContent = "♡";
            return;
        }

        const id =
            songs[currentSongIndex].id;

        playerFavorite.textContent =
            favorites.includes(id)
                ? "❤️"
                : "♡";
    }


    playerFavorite.addEventListener("click", () => {

        if (currentSongIndex === -1) return;

        toggleFavorite(
            songs[currentSongIndex].id
        );
    });


    /* =========================
       SEARCH
       ========================= */

    searchInput.addEventListener("input", () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        const filtered =
            songs.filter(song =>
                song.title.toLowerCase().includes(query) ||
                song.artist.toLowerCase().includes(query)
            );

        allSongs.innerHTML =
            filtered.map(createSongRow).join("");

        if (filtered.length === 0) {

            allSongs.innerHTML = `
                <div class="empty-state">
                    <h2>🔍 No Songs Found</h2>
                    <p>Try another song or artist name.</p>
                </div>
            `;
        }
    });


    /* =========================
       NAVIGATION
       ========================= */

    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                const page =
                    button.dataset.page;

                showPage(page);

            });
        });


    document
        .querySelector(".see-all")
        ?.addEventListener("click", () => {

            showPage("songs");

        });


    function showPage(pageId) {

        document
            .querySelectorAll(".page")
            .forEach(page => {

                page.classList.remove("active-page");

            });

        const selected =
            document.getElementById(pageId);

        if (selected) {

            selected.classList.add("active-page");

        }

        document
            .querySelectorAll(".nav-item")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.page === pageId
                );

            });
    }


    /* =========================
       HERO PLAY BUTTON
       ========================= */

    document
        .getElementById("heroPlayBtn")
        ?.addEventListener("click", () => {

            if (currentSongIndex === -1) {

                playSong(songs[0].id);

            } else {

                audio.play()
                    .catch(() => {});

            }

        });


    /* =========================
       PROFILE / USERNAME
       ========================= */

    document
        .getElementById("profileBtn")
        ?.addEventListener("click", () => {

            const newName =
                prompt(
                    "Apna naam enter karo:",
                    username
                );

            if (
                newName &&
                newName.trim()
            ) {

                username =
                    newName.trim();

                localStorage.setItem(
                    "melotuneUsername",
                    username
                );

                updateGreeting();
            }
        });


    /* =========================
       CREATE PLAYLIST
       ========================= */

    document
        .getElementById("createPlaylistBtn")
        ?.addEventListener("click", () => {

            playlistModal.classList.add("show");

            playlistName.focus();
        });


    document
        .getElementById("closeModal")
        ?.addEventListener("click", closePlaylistModal);


    function closePlaylistModal() {

        playlistModal.classList.remove("show");

        playlistName.value = "";
    }


    document
        .getElementById("savePlaylistBtn")
        ?.addEventListener("click", () => {

            const name =
                playlistName.value.trim();

            if (!name) {

                alert("Playlist ka naam enter karo.");
                return;
            }

            playlists.push({
                id: Date.now(),
                name: name,
                songs: []
            });

            saveData();

            renderPlaylists();

            closePlaylistModal();
        });


    /* =========================
       ADD TO PLAYLIST
       ========================= */

    window.openAddPlaylist = function(id) {

        songToAddToPlaylist = id;

        playlistChoices.innerHTML = "";

        if (playlists.length === 0) {

            playlistChoices.innerHTML = `
                <p>
                    Pehle ek playlist create karo.
                </p>
            `;

        } else {

            playlists.forEach(playlist => {

                const button =
                    document.createElement("button");

                button.className =
                    "primary-btn";

                button.style.width = "100%";
                button.style.marginTop = "8px";

                button.textContent =
                    "📂 " + playlist.name;

                button.onclick = () => {

                    addSongToPlaylist(
                        playlist.id,
                        songToAddToPlaylist
                    );

                };

                playlistChoices.appendChild(button);

            });
        }

        addPlaylistModal.classList.add("show");
    };


    function addSongToPlaylist(
        playlistId,
        songId
    ) {

        const playlist =
            playlists.find(
                item => item.id === playlistId
            );

        if (!playlist) return;

        if (!playlist.songs.includes(songId)) {

            playlist.songs.push(songId);

            saveData();

            alert("Song playlist mein add ho gaya! 🎵");

        } else {

            alert("Ye song already playlist mein hai.");

        }

        addPlaylistModal.classList.remove("show");

        renderPlaylists();
    }


    document
        .getElementById("closeAddModal")
        ?.addEventListener("click", () => {

            addPlaylistModal.classList.remove("show");

        });


    /* =========================
       RENDER PLAYLISTS
       ========================= */

    function renderPlaylists() {

        if (playlists.length === 0) {

            playlistContainer.innerHTML = `
                <div class="empty-state">
                    <h2>📂 No Playlists Yet</h2>
                    <p>Create your first playlist.</p>
                </div>
            `;

            return;
        }

        playlistContainer.innerHTML =
            playlists.map(playlist => {

                const playlistSongs =
                    playlist.songs
                        .map(id =>
                            songs.find(song => song.id === id)
                        )
                        .filter(Boolean);

                return `
                    <div class="playlist-card">

                        <h3>📂 ${escapeHTML(playlist.name)}</h3>

                        <p>
                            ${playlistSongs.length} song(s)
                        </p>

                        <div class="playlist-songs">

                            ${
                                playlistSongs.length === 0
                                ?
                                "<p>No songs added yet.</p>"
                                :
                                playlistSongs.map(song => `
                                    <div class="playlist-song">

                                        <span>
                                            ${escapeHTML(song.title)}
                                        </span>

                                        <button
                                            onclick="playSong(${song.id})"
                                        >
                                            ▶
                                        </button>

                                    </div>
                                `).join("")
                            }

                        </div>

                    </div>
                `;

            }).join("");
    }


    /* =========================
       HTML SECURITY
       ========================= */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    /* =========================
       INITIALIZE APP
       ========================= */

    renderSongs();

    updatePlayerFavorite();

});
