// let songUL = document.querySelector(".playlist-content").getElementsByTagName("ul")[0];
// let songs = [];
// let currSong = new Audio();
// let albums = [];
// let currAlbum;
// let play = document.querySelector("#play").querySelector(".play-pause");
// let volume = document.querySelector(".volume").querySelector("img");
// let currVolume = 100;
// let shuffle = false;
// let repeat = false;
// const GreenFilter = "invert(66%) sepia(76%) saturate(410%) hue-rotate(83deg) brightness(94%) contrast(90%)";
// const originalFilter = document.querySelector(".bottom-right").querySelector("img").style.filter;

// function greenBtn() {
//     document.querySelector("#shuffle").addEventListener("click", e => {
//         const img = document.querySelector("#shuffle").querySelector("img");
//         if (img.style.filter == "") {
//             img.style.filter = GreenFilter;
//         } else {
//             img.style.filter = "";
//         }
//     });

//     document.querySelector("#repeat").addEventListener("click", e => {
//         const img = document.querySelector("#repeat").querySelector("img");
//         if (img.style.filter == "") {
//             img.style.filter = GreenFilter;
//         } else {
//             img.style.filter = "";
//         }
//     });

//     Array.from(document.querySelector(".bottom-right").querySelectorAll("button")).forEach(button => {
//         button.addEventListener("click", () => {
//             const img = button.querySelector("img");
//             if (img.style.filter == "") {
//                 img.style.filter = GreenFilter;
//             } else {
//                 img.style.filter = "";
//             }
//         });
//     });
// }

// function resetAlbumButtons() {
//     Array.from(document.querySelector(".explore-playlist").querySelectorAll(".play-pause")).forEach(e => {
//         e.src = "img/play.svg";
//     });
// }

// function resetPlaylistButtons() {
//     Array.from(document.querySelector(".playlist-content").querySelectorAll(".play-pause")).forEach(e => {
//         e.src = "img/play.svg";
//     });
// }

// async function fetchAlbum() {
//     let a = await fetch("https://github.com/ANISH-CHAUHAN105/Spotify-Clone/tree/main/songs/");
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");

//     for (let index = 1; index < as.length; index++) {
//         const element = as[index].href;
//         albums.push(element.split("songs/")[1].replace("/", " ").replace("%20", " ").trim());
//         document.querySelector(".card-container").innerHTML = document.querySelector(".card-container").innerHTML +
//             ` <div class="card">
//                             <img src="/songs/${albums[index - 1]}/cover.jpg" alt="">
//                             <div class="card-text">
//                                 <p class="album-name">${albums[index - 1]}</p>
//                             </div>
//                             <button class="btn"><img class="play-pause" src="/img/play.svg" alt=""></button>
//                              </div>`
//     }

//     return albums;
// }

// async function fetchSongs(albumName) {
//     let a = await fetch(`https://github.com/ANISH-CHAUHAN105/Spotify-Clone/tree/main/songs/${albumName}/`);
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");

//     songs = [];
//     for (let index = 1; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href);
//         }
//     }

//     songUL.innerHTML = "";
//     for (song of songs) {
//         let songName = song.split(".mp3")[0].split("songs/")[1].split("/")[1].replaceAll("%20", " ");
//         let songArtist = song.split(".mp3")[0].split("songs/")[1].split("/")[0].replaceAll("%20", " ");

//         songUL.innerHTML = songUL.innerHTML + `
//         <li>
//             <div>
//                 <img src="songs/${songArtist}/${songName}.jpg" alt="">
//                 <div class="button"><img class="play-pause" src="/img/play.svg" alt=""></div>
//             </div>
//             <div class="playlist-name">
//                 <p class="songName">${songName}</p>
//                 <p class="songArtist">${songArtist}</p>
//             </div>
//         </li>`;
//     }

//     Array.from(document.querySelector(".playlist-content").getElementsByClassName("button")).forEach(e => {
//         e.addEventListener("click", element => {
//             resetPlaylistButtons();
//             togglePlayPause(e);
//         })
//     });

//     currSong.src = songs[0];
//     return songs;
// }

// greenBtn();

// function togglePlayPause(button) {
//     let songName = button.parentElement.parentElement.querySelector(".songName").innerHTML;
//     let songArtist = button.parentElement.parentElement.querySelector(".songArtist").innerHTML;
//     document.querySelector(".current-song").innerHTML = songName;
//     document.querySelector(".current-artist").innerHTML = songArtist;
//     document.querySelector(".currSong-image").src = `songs/${songArtist}/${songName}.jpg`;
//     currSong.src = `songs/${songArtist}/${songName}.mp3`;

//     let play_pause = button.querySelector(".play-pause");

//     if (currSong.paused) {
//         currSong.play();
//         play_pause.src = "img/pause.svg";
//         play.src = "img/pause.svg";
//     } else {
//         currSong.pause();
//         play_pause.src = "img/play.svg";
//         play.src = "img/play.svg";
//     }
// }

// function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
// }

// async function main() {
//     document.querySelector(".hamburger").querySelector("img").addEventListener("click", e => {
//         document.querySelector(".left").style.right = "0";
//     })
//     document.querySelector(".close").querySelector("img").addEventListener("click", e => {
//         document.querySelector(".left").style.right = "102%";
//     })

//     albums = await fetchAlbum();

//     Array.from(document.querySelector(".card-container").getElementsByClassName("btn")).forEach(e => {
//         e.addEventListener("click", element => {
//             songs = fetchSongs(e.parentElement.querySelector(".album-name").innerHTML);
//             resetAlbumButtons();
//             e.querySelector("img").src = "img/pause.svg";
//         })
//     })

//     document.querySelector("#play").addEventListener("click", e => {
//         if (currSong.paused) {
//             currSong.play();
//             play.src = "img/pause.svg";
//         } else {
//             currSong.pause();
//             play.src = "img/play.svg";
//         }
//     });

//     currSong.addEventListener("loadedmetadata", e => {
//         updateTotalDuration();
//     });

//     document.querySelector("#duration").addEventListener("click", e => {
//         updateSeekbar(e);
//     });

//     currSong.addEventListener("timeupdate", e => {
//         updateCurrentTime();
//     });

//     document.querySelector("#volume").addEventListener("click", e => {
//         currVolume = e.target.value / 100;
//         currSong.volume = currVolume;
//         if (currSong.volume == 0)
//             volume.src = "img/mute.svg";
//         else
//             volume.src = "img/volume.svg";
//     });

//     document.querySelector(".volume").addEventListener("click", e => {
//         if (volume.src == "http://127.0.0.1:3000/img/mute.svg") {
//             volume.src = "img/volume.svg";
//             currSong.volume = currVolume;
//         }
//         else {
//             volume.src = "img/mute.svg";
//             currSong.volume = 0;
//         }
//     });

//     document.querySelector("#next").addEventListener("click", e => {
//         playNextSong();
//     });

//     document.querySelector("#previous").addEventListener("click", e => {
//         playPreviousSong();
//     });
// }

// function updateTotalDuration() {
//     if (!isNaN(currSong.duration) && currSong.duration > 0) {
//         document.querySelector(".total-duration").innerHTML = formatTime(currSong.duration);
//         document.querySelector("#duration").value = 0;
//     } else {
//         document.querySelector(".total-duration").innerHTML = "0:00";
//         document.querySelector("#duration").value = 0;
//     }
// }

// function updateSeekbar(e) {
//     if (!isNaN(currSong.duration) && currSong.duration > 0) {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//         currSong.currentTime = (currSong.duration * percent) / 100;
//     } else {
//         document.querySelector("#duration").value = 0;
//     }
// }

// function updateCurrentTime() {
//     if (!isNaN(currSong.duration) && currSong.duration > 0) {
//         document.querySelector(".current-duration").innerHTML = formatTime(currSong.currentTime);
//         document.querySelector(".total-duration").innerHTML = formatTime(currSong.duration);
//         document.querySelector("#duration").value = (currSong.currentTime / currSong.duration) * 100;
//     } else {
//         document.querySelector(".current-duration").innerHTML = "0:00";
//         document.querySelector("#duration").value = 0;
//     }
// }

// function playNextSong() {
//     let index = songs.indexOf(currSong.src);
//     if (index + 1 < songs.length)
//         ++index;
//     else
//         index = 0;
//     currSong.src = songs[index];
//     currSong.play();
//     document.querySelector(".current-song").innerHTML = currSong.src.split("songs/")[1].split(".mp3")[0].split("/")[1].replaceAll("%20", " ");  //songName
//     document.querySelector(".current-artist").innerHTML = currSong.src.split("songs/")[1].split(".mp3")[0].split("/")[0].replaceAll("%20", " "); //songArtist 
//     document.querySelector(".currSong-image").src = `${currSong.src}`.replace("mp3", "jpg");
// }

// function playPreviousSong() {
//     let index = songs.indexOf(currSong.src);
//     if (index > 0)
//         --index;
//     else
//         index = songs.length - 1;
//     currSong.src = songs[index];
//     currSong.play();
//     document.querySelector(".current-song").innerHTML = currSong.src.split("songs/")[1].split(".mp3")[0].split("/")[1].replaceAll("%20", " ");  //songName
//     document.querySelector(".current-artist").innerHTML = currSong.src.split("songs/")[1].split(".mp3")[0].split("/")[0].replaceAll("%20", " "); //songArtist 
//     document.querySelector(".currSong-image").src = `${currSong.src}`.replace("mp3", "jpg");
// }

// main();

// Global variables
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

// Toggle shuffle and repeat buttons to green
function greenBtn() {
    document.querySelector("#shuffle").addEventListener("click", () => {
        const img = document.querySelector("#shuffle").querySelector("img");
        img.style.filter = img.style.filter === "" ? GreenFilter : "";
    });

    document.querySelector("#repeat").addEventListener("click", () => {
        const img = document.querySelector("#repeat").querySelector("img");
        img.style.filter = img.style.filter === "" ? GreenFilter : "";
    });
}

// Reset album play buttons
function resetAlbumButtons() {
    Array.from(document.querySelector(".explore-playlist").querySelectorAll(".play-pause")).forEach(e => {
        e.src = "img/play.svg";
    });
}

// Reset playlist play buttons
function resetPlaylistButtons() {
    Array.from(document.querySelector(".playlist-content").querySelectorAll(".play-pause")).forEach(e => {
        e.src = "img/play.svg";
    });
}

// Fetch albums from GitHub
async function fetchAlbum() {
    const response = await fetch("https://raw.githubusercontent.com/ANISH-CHAUHAN105/Spotify-Clone/main/songs/");
    const albumData = await response.text();
    const div = document.createElement("div");
    div.innerHTML = albumData;
    const albumLinks = div.getElementsByTagName("a");

    for (let index = 1; index < albumLinks.length; index++) {
        const element = albumLinks[index].href;
        albums.push(element.split("songs/")[1].replace("/", " ").replace("%20", " ").trim());

        document.querySelector(".card-container").innerHTML += `
            <div class="card">
                <img src="https://raw.githubusercontent.com/ANISH-CHAUHAN105/Spotify-Clone/main/songs/${albums[index - 1]}/cover.jpg" alt="">
                <div class="card-text">
                    <p class="album-name">${albums[index - 1]}</p>
                </div>
                <button class="btn"><img class="play-pause" src="img/play.svg" alt=""></button>
            </div>`;
    }
    return albums;
}

// Fetch songs from the specified album
async function fetchSongs(albumName) {
    const response = await fetch(`https://raw.githubusercontent.com/ANISH-CHAUHAN105/Spotify-Clone/main/songs/${albumName}/`);
    const songData = await response.text();
    const div = document.createElement("div");
    div.innerHTML = songData;
    const songLinks = div.getElementsByTagName("a");

    songs = [];
    for (let index = 1; index < songLinks.length; index++) {
        const element = songLinks[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }

    songUL.innerHTML = "";
    songs.forEach(song => {
        const songName = song.split(".mp3")[0].split("songs/")[1].split("/")[1].replaceAll("%20", " ");
        const songArtist = song.split(".mp3")[0].split("songs/")[1].split("/")[0].replaceAll("%20", " ");

        songUL.innerHTML += `
        <li>
            <div>
                <img src="https://raw.githubusercontent.com/ANISH-CHAUHAN105/Spotify-Clone/main/songs/${songArtist}/${songName}.jpg" alt="">
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
}

// Toggle play/pause of the current song
function togglePlayPause(button) {
    const songName = button.parentElement.parentElement.querySelector(".songName").innerHTML;
    const songArtist = button.parentElement.parentElement.querySelector(".songArtist").innerHTML;
    document.querySelector(".current-song").innerHTML = songName;
    document.querySelector(".current-artist").innerHTML = songArtist;
    document.querySelector(".currSong-image").src = `https://raw.githubusercontent.com/ANISH-CHAUHAN105/Spotify-Clone/main/songs/${songArtist}/${songName}.jpg`;
    currSong.src = `https://raw.githubusercontent.com/ANISH-CHAUHAN105/Spotify-Clone/main/songs/${songArtist}/${songName}.mp3`;

    const playPauseIcon = button.querySelector(".play-pause");

    if (currSong.paused) {
        currSong.play();
        playPauseIcon.src = "img/pause.svg";
        play.src = "img/pause.svg";
    } else {
        currSong.pause();
        playPauseIcon.src = "img/play.svg";
        play.src = "img/play.svg";
    }
}

// Format song time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Main function to initialize the player
async function main() {
    document.querySelector(".hamburger").querySelector("img").addEventListener("click", () => {
        document.querySelector(".left").style.right = "0";
    });

    document.querySelector(".close").querySelector("img").addEventListener("click", () => {
        document.querySelector(".left").style.right = "102%";
    });

    albums = await fetchAlbum();

    Array.from(document.querySelector(".card-container").getElementsByClassName("btn")).forEach(e => {
        e.addEventListener("click", () => {
            songs = fetchSongs(e.parentElement.querySelector(".album-name").innerHTML);
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

    currSong.addEventListener("loadedmetadata", () => {
        updateTotalDuration();
    });

    document.querySelector("#duration").addEventListener("click", (e) => {
        updateSeekbar(e);
    });

    currSong.addEventListener("timeupdate", () => {
        updateCurrentTime();
    });

    document.querySelector("#volume").addEventListener("click", (e) => {
        currVolume = e.target.value / 100;
        currSong.volume = currVolume;
        volume.src = currSong.volume === 0 ? "img/mute.svg" : "img/volume.svg";
    });

    document.querySelector(".volume").addEventListener("click", () => {
        if (volume.src.endsWith("mute.svg")) {
            volume.src = "img/volume.svg";
            currSong.volume = currVolume;
        } else {
            volume.src = "img/mute.svg";
            currSong.volume = 0;
        }
    });

    document.querySelector("#next").addEventListener("click", () => {
        playNextSong();
    });

    document.querySelector("#previous").addEventListener("click", () => {
        playPreviousSong();
    });
}

// Update total song duration
function updateTotalDuration() {
    if (!isNaN(currSong.duration) && currSong.duration > 0) {
        document.querySelector(".total-duration").innerHTML = formatTime(currSong.duration);
        document.querySelector("#duration").value = 0;
    } else {
        document.querySelector(".total-duration").innerHTML = "0:00";
        document.querySelector("#duration").value = 0;
    }
}

// Update seekbar position
function updateSeekbar(e) {
    if (!isNaN(currSong.duration) && currSong.duration > 0) {
        const percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        currSong.currentTime = (currSong.duration * percent) / 100;
    } else {
        document.querySelector("#duration").value = 0;
    }
}

// Update current song time
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

// Play the next song in the playlist
function playNextSong() {
    let index = songs.indexOf(currSong.src);
    index = index + 1 < songs.length ? index + 1 : 0;
    currSong.src = songs[index];
    currSong.play();
    updateSongDetails();
}

// Play the previous song in the playlist
function playPreviousSong() {
    let index = songs.indexOf(currSong.src);
    index = index > 0 ? index - 1 : songs.length - 1;
    currSong.src = songs[index];
    currSong.play();
    updateSongDetails();
}

// Update song name, artist, and image
function updateSongDetails() {
    const songInfo = currSong.src.split("songs/")[1].split(".mp3")[0];
    const [songArtist, songName] = songInfo.split("/");
    document.querySelector(".current-song").innerHTML = songName.replaceAll("%20", " ");
    document.querySelector(".current-artist").innerHTML = songArtist.replaceAll("%20", " ");
    document.querySelector(".currSong-image").src = currSong.src.replace("mp3", "jpg");
}

// Initialize the music player
main();
greenBtn();

