let songUL = document.querySelector(".playlist-content").getElementsByTagName("ul")[0];
let songs = [];
let currSong = new Audio();
let albums = [];
let currAlbum;
let play = document.querySelector("#play").querySelector(".play-pause");
let volume = document.querySelector(".volume").querySelector("img");
let currVolume = 1; // Default to 1 (max volume)
let shuffle = false;
let repeat = false;
const GreenFilter = "invert(66%) sepia(76%) saturate(410%) hue-rotate(83deg) brightness(94%) contrast(90%)";
const originalFilter = document.querySelector(".bottom-right").querySelector("img").style.filter;

function greenBtn() {
    document.querySelector("#shuffle").addEventListener("click", e => {
        const img = document.querySelector("#shuffle").querySelector("img");
        img.style.filter = img.style.filter === "" ? GreenFilter : "";
    });

    document.querySelector("#repeat").addEventListener("click", e => {
        const img = document.querySelector("#repeat").querySelector("img");
        img.style.filter = img.style.filter === "" ? GreenFilter : "";
    });

    Array.from(document.querySelector(".bottom-right").querySelectorAll("button")).forEach(button => {
        button.addEventListener("click", () => {
            const img = button.querySelector("img");
            img.style.filter = img.style.filter === "" ? GreenFilter : "";
        });
    });
}

function resetAlbumButtons() {
    Array.from(document.querySelector(".explore-playlist").querySelectorAll(".play-pause")).forEach(e => {
        e.src = "img/play.svg";
    });
}

function resetPlaylistButtons() {
    Array.from(document.querySelector(".playlist-content").querySelectorAll(".play-pause")).forEach(e => {
        e.src = "img/play.svg";
    });
}

async function fetchAlbum() {
    try {
        const response = await fetch("https://api.github.com/repos/ANISH-CHAUHAN105/Spotify-Clone/contents/songs");
        const directories = await response.json();
        directories.forEach(dir => {
            if (dir.type === 'dir') {
                albums.push(dir.name);
                document.querySelector(".card-container").innerHTML += `
                    <div class="card">
                        <img src="https://raw.githubusercontent.com/ANISH-CHAUHAN105/Spotify-Clone/main/songs/${dir.name}/cover.jpg" alt="">
                        <div class="card-text">
                            <p class="album-name">${dir.name}</p>
                        </div>
                        <button class="btn"><img class="play-pause" src="img/play.svg" alt=""></button>
                    </div>`;
            }
        });
        return albums;
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
}

async function fetchSongs(albumName) {
    try {
        const response = await fetch(`https://api.github.com/repos/ANISH-CHAUHAN105/Spotify-Clone/contents/songs/${albumName}`);
        const files = await response.json();

        songs = [];
        files.forEach(file => {
            if (file.name.endsWith(".mp3")) {
                songs.push(file.download_url);
            }
        });

        songUL.innerHTML = "";
        songs.forEach(song => {
            let songName = song.split(".mp3")[0].split("/").pop().replaceAll("%20", " ");
            let songArtist = song.split(".mp3")[0].split("/").slice(-2, -1)[0].replaceAll("%20", " ");

            songUL.innerHTML += `
                <li>
                    <div>
                        <img src="${song.replace(".mp3", ".jpg")}" alt="">
                        <div class="button"><img class="play-pause" src="img/play.svg" alt=""></div>
                    </div>
                    <div class="playlist-name">
                        <p class="songName">${songName}</p>
                        <p class="songArtist">${songArtist}</p>
                    </div>
                </li>`;
        });

        Array.from(document.querySelector(".playlist-content").getElementsByClassName("button")).forEach(e => {
            e.addEventListener("click", () => {
                resetPlaylistButtons();
                togglePlayPause(e);
            });
        });

        currSong.src = songs[0];
        return songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

greenBtn();

function togglePlayPause(button) {
    let songName = button.parentElement.parentElement.querySelector(".songName").textContent;
    let songArtist = button.parentElement.parentElement.querySelector(".songArtist").textContent;
    document.querySelector(".current-song").textContent = songName;
    document.querySelector(".current-artist").textContent = songArtist;
    document.querySelector(".currSong-image").src = `songs/${songArtist}/${songName}.jpg`;
    currSong.src = `songs/${songArtist}/${songName}.mp3`;

    let play_pause = button.querySelector(".play-pause");

    if (currSong.paused) {
        currSong.play();
        play_pause.src = "img/pause.svg";
        play.src = "img/pause.svg";
    } else {
        currSong.pause();
        play_pause.src = "img/play.svg";
        play.src = "img/play.svg";
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

async function main() {
    document.querySelector(".hamburger").querySelector("img").addEventListener("click", () => {
        document.querySelector(".left").style.right = "0";
    });
    document.querySelector(".close").querySelector("img").addEventListener("click", () => {
        document.querySelector(".left").style.right = "102%";
    });

    albums = await fetchAlbum();

    Array.from(document.querySelector(".card-container").getElementsByClassName("btn")).forEach(e => {
        e.addEventListener("click", async () => {
            songs = await fetchSongs(e.parentElement.querySelector(".album-name").textContent);
            resetAlbumButtons();
            e.querySelector("img").src = "img/pause.svg";
        });
    });

    document.querySelector("#play").addEventListener("click", () => {
        if (currSong.paused) {
            currSong.play();
            play.src = "img/pause.svg";
        } else {
            currSong.pause();
            play.src = "img/play.svg";
        }
    });

    currSong.addEventListener("loadedmetadata", updateTotalDuration);

    document.querySelector("#duration").addEventListener("click", updateSeekbar);

    currSong.addEventListener("timeupdate", updateCurrentTime);

    document.querySelector("#volume").addEventListener("input", e => {
        currVolume = e.target.value / 100; // Ensure value is between 0 and 1
        if (currVolume < 0) currVolume = 0;
        if (currVolume > 1) currVolume = 1;
        currSong.volume = currVolume;
        volume.src = currVolume === 0 ? "img/mute.svg" : "img/volume.svg";
    });

    document.querySelector(".volume").addEventListener("click", () => {
        if (volume.src.includes("mute.svg")) {
            volume.src = "img/volume.svg";
            currSong.volume = currVolume;
        } else {
            volume.src = "img/mute.svg";
            currSong.volume = 0;
        }
    });

    document.querySelector("#next").addEventListener("click", playNextSong);

    document.querySelector("#previous").addEventListener("click", playPreviousSong);
}

function updateTotalDuration() {
    if (!isNaN(currSong.duration) && currSong.duration > 0) {
        document.querySelector(".total-duration").textContent = formatTime(currSong.duration);
        document.querySelector("#duration").value = 0;
    } else {
        document.querySelector(".total-duration").textContent = "0:00";
        document.querySelector("#duration").value = 0;
    }
}

function updateSeekbar(e) {
    if (!isNaN(currSong.duration) && currSong.duration > 0) {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        currSong.currentTime = (currSong.duration * percent) / 100;
    } else {
        document.querySelector("#duration").value = 0;
    }
}

function updateCurrentTime() {
    if (!isNaN(currSong.duration) && currSong.duration > 0) {
        document.querySelector(".current-duration").textContent = formatTime(currSong.currentTime);
        document.querySelector(".total-duration").textContent = formatTime(currSong.duration);
        document.querySelector("#duration").value = (currSong.currentTime / currSong.duration) * 100;
    } else {
        document.querySelector(".current-duration").textContent = "0:00";
        document.querySelector("#duration").value = 0;
    }
}

function playNextSong() {
    let index = songs.indexOf(currSong.src);
    if (index + 1 < songs.length) {
        ++index;
    } else {
        index = 0;
    }
    currSong.src = songs[index];
    currSong.play();
    updateCurrentSongInfo();
}

function playPreviousSong() {
    let index = songs.indexOf(currSong.src);
    if (index - 1 >= 0) {
        --index;
    } else {
        index = songs.length - 1;
    }
    currSong.src = songs[index];
    currSong.play();
    updateCurrentSongInfo();
}

function updateCurrentSongInfo() {
    let songName = currSong.src.split("/").pop().split(".")[0];
    let songArtist = currSong.src.split("/").slice(-2, -1)[0];

    document.querySelector(".current-song").textContent = songName;
    document.querySelector(".current-artist").textContent = songArtist;
    document.querySelector(".currSong-image").src = `songs/${songArtist}/${songName}.jpg`;
    play.src = "img/pause.svg";
}

main();

