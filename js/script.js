let songUL = document.querySelector(".playlist-content").getElementsByTagName("ul")[0];
let songs = [];
let currSong = new Audio();
let albums = [];
let currAlbum;
let play = document.querySelector("#play").querySelector(".play-pause");
let volume = document.querySelector(".volume").querySelector("img");
let currVolume = 100;
let shuffle = false;
let repeat = false;
const GreenFilter = "invert(66%) sepia(76%) saturate(410%) hue-rotate(83deg) brightness(94%) contrast(90%)";
const originalFilter = document.querySelector(".bottom-right").querySelector("img").style.filter;

function greenBtn() {
    document.querySelector("#shuffle").addEventListener("click", e => {
        const img = document.querySelector("#shuffle").querySelector("img");
        if (img.style.filter == "") {
            img.style.filter = GreenFilter;
        } else {
            img.style.filter = "";
        }
    });

    document.querySelector("#repeat").addEventListener("click", e => {
        const img = document.querySelector("#repeat").querySelector("img");
        if (img.style.filter == "") {
            img.style.filter = GreenFilter;
        } else {
            img.style.filter = "";
        }
    });

    Array.from(document.querySelector(".bottom-right").querySelectorAll("button")).forEach(button => {
        button.addEventListener("click", () => {
            const img = button.querySelector("img");
            if (img.style.filter == "") {
                img.style.filter = GreenFilter;
            } else {
                img.style.filter = "";
            }
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
    let a = await fetch("https://drive.google.com/drive/folders/1f3AjXT9I-2VR_yUW3CmoLR8792Dj7mld?usp=drive_link");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    for (let index = 1; index < as.length; index++) {
        const element = as[index].href;
        albums.push(element.split("songs/")[1].replace("/", " ").replace("%20", " ").trim());
        document.querySelector(".card-container").innerHTML = document.querySelector(".card-container").innerHTML +
            ` <div class="card">
                            <img src="/songs/${albums[index - 1]}/cover.jpg" alt="">
                            <div class="card-text">
                                <p class="album-name">${albums[index - 1]}</p>
                            </div>
                            <button class="btn"><img class="play-pause" src="/img/play.svg" alt=""></button>
                             </div>`
    }

    return albums;
}

async function fetchSongs(albumName) {
    let a = await fetch(`https://drive.google.com/drive/folders/1f3AjXT9I-2VR_yUW3CmoLR8792Dj7mld?usp=drive_link${albumName}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    songs = [];
    for (let index = 1; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }

    songUL.innerHTML = "";
    for (song of songs) {
        let songName = song.split(".mp3")[0].split("songs/")[1].split("/")[1].replaceAll("%20", " ");
        let songArtist = song.split(".mp3")[0].split("songs/")[1].split("/")[0].replaceAll("%20", " ");

        songUL.innerHTML = songUL.innerHTML + `
        <li>
            <div>
                <img src="songs/${songArtist}/${songName}.jpg" alt="">
                <div class="button"><img class="play-pause" src="/img/play.svg" alt=""></div>
            </div>
            <div class="playlist-name">
                <p class="songName">${songName}</p>
                <p class="songArtist">${songArtist}</p>
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".playlist-content").getElementsByClassName("button")).forEach(e => {
        e.addEventListener("click", element => {
            resetPlaylistButtons();
            togglePlayPause(e);
        })
    });

    currSong.src = songs[0];
    return songs;
}

greenBtn();

function togglePlayPause(button) {
    let songName = button.parentElement.parentElement.querySelector(".songName").innerHTML;
    let songArtist = button.parentElement.parentElement.querySelector(".songArtist").innerHTML;
    document.querySelector(".current-song").innerHTML = songName;
    document.querySelector(".current-artist").innerHTML = songArtist;
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
    document.querySelector(".hamburger").querySelector("img").addEventListener("click", e => {
        document.querySelector(".left").style.right = "0";
    })
    document.querySelector(".close").querySelector("img").addEventListener("click", e => {
        document.querySelector(".left").style.right = "102%";
    })

    albums = await fetchAlbum();

    Array.from(document.querySelector(".card-container").getElementsByClassName("btn")).forEach(e => {
        e.addEventListener("click", element => {
            songs = fetchSongs(e.parentElement.querySelector(".album-name").innerHTML);
            resetAlbumButtons();
            e.querySelector("img").src = "img/pause.svg";
        })
    })

    document.querySelector("#play").addEventListener("click", e => {
        if (currSong.paused) {
            currSong.play();
            play.src = "img/pause.svg";
        } else {
            currSong.pause();
            play.src = "img/play.svg";
        }
    });

    currSong.addEventListener("loadedmetadata", e => {
        updateTotalDuration();
    });

    document.querySelector("#duration").addEventListener("click", e => {
        updateSeekbar(e);
    });

    currSong.addEventListener("timeupdate", e => {
        updateCurrentTime();
    });

    document.querySelector("#volume").addEventListener("click", e => {
        currVolume = e.target.value / 100;
        currSong.volume = currVolume;
        if (currSong.volume == 0)
            volume.src = "img/mute.svg";
        else
            volume.src = "img/volume.svg";
    });

    document.querySelector(".volume").addEventListener("click", e => {
        if (volume.src == "http://127.0.0.1:3000/img/mute.svg") {
            volume.src = "img/volume.svg";
            currSong.volume = currVolume;
        }
        else {
            volume.src = "img/mute.svg";
            currSong.volume = 0;
        }
    });

    document.querySelector("#next").addEventListener("click", e => {
        playNextSong();
    });

    document.querySelector("#previous").addEventListener("click", e => {
        playPreviousSong();
    });
}

function updateTotalDuration() {
    if (!isNaN(currSong.duration) && currSong.duration > 0) {
        document.querySelector(".total-duration").innerHTML = formatTime(currSong.duration);
        document.querySelector("#duration").value = 0;
    } else {
        document.querySelector(".total-duration").innerHTML = "0:00";
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
        document.querySelector(".current-duration").innerHTML = formatTime(currSong.currentTime);
        document.querySelector(".total-duration").innerHTML = formatTime(currSong.duration);
        document.querySelector("#duration").value = (currSong.currentTime / currSong.duration) * 100;
    } else {
        document.querySelector(".current-duration").innerHTML = "0:00";
        document.querySelector("#duration").value = 0;
    }
}

function playNextSong() {
    let index = songs.indexOf(currSong.src);
    if (index + 1 < songs.length)
        ++index;
    else
        index = 0;
    currSong.src = songs[index];
    currSong.play();
    document.querySelector(".current-song").innerHTML = currSong.src.split("songs/")[1].split(".mp3")[0].split("/")[1].replaceAll("%20", " ");  //songName
    document.querySelector(".current-artist").innerHTML = currSong.src.split("songs/")[1].split(".mp3")[0].split("/")[0].replaceAll("%20", " "); //songArtist 
    document.querySelector(".currSong-image").src = `${currSong.src}`.replace("mp3", "jpg");
}

function playPreviousSong() {
    let index = songs.indexOf(currSong.src);
    if (index > 0)
        --index;
    else
        index = songs.length - 1;
    currSong.src = songs[index];
    currSong.play();
    document.querySelector(".current-song").innerHTML = currSong.src.split("songs/")[1].split(".mp3")[0].split("/")[1].replaceAll("%20", " ");  //songName
    document.querySelector(".current-artist").innerHTML = currSong.src.split("songs/")[1].split(".mp3")[0].split("/")[0].replaceAll("%20", " "); //songArtist 
    document.querySelector(".currSong-image").src = `${currSong.src}`.replace("mp3", "jpg");
}

main();

