const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "TRNVINH";
const options = $$(".nav-bottom__btn");
const items = $$(".item");
const switchElement = $(".switch");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const bodyElement =$('body');
const appElement =$('.app');
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Ánh nắng của anh",
      singer: "Đức Phúc",
      path: "./assets/music/AnhNangCuaAnh.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/d/7/d7f34aa6b1112e4b605f6c6e7eccd162_1509437674.jpg",
    },
    {
      name: "Sau tất cả",
      singer: "Erik",
      path: "./assets/music/SauTatCa.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/covers/5/5/55a2e33a5d4d6a70f5144181c28eacb0_1452855672.jpg",
    },
    {
      name: "Ôm trọn nỗi nhớ",
      singer: "Rum",
      path: "./assets/music/OmTronNoiNho.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/0/c/6/6/0c6679e9039d45fd450147c768471457.jpg",
    },
    {
      name: "Chờ anh nhé",
      singer: "Hoàng Dũng",
      path: "./assets/music/ChoAnhNhe.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/covers/a/5/a5770da425db0bd4d1c397badb944075_1465443445.jpg",
    },
    {
      name: "Yêu em rất nhiều",
      singer: "Hoàng Tôn",
      path: "./assets/music/YeuEmRatNhieu.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/6/8/0/7/6807770ea5dc38ceaaa3a70810d804b4.jpg",
    },
    {
      name: "Có hẹn với thanh xuân",
      singer: "MONSTAR & Grey D",
      path: "./assets/music/CoHenVoiThanhXuan.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/2/3/f/e23ff2faaa64eebfc57e0acde247f0db.jpg",
    },
    {
      name: "Lần Hẹn Hò Đầu Tiên",
      singer: "Huyền Tâm Môn",
      path: "./assets/music/LanHenHoDauTien.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/7/e/9/4/7e94b95743998a108ff33beed5bae5c3.jpg",
    },
    {
      name: "Lệ Lưu Ly",
      singer: "Vũ Phụng Tiên & DT",
      path: "./assets/music/LeLuuLy.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/6/9/3/f/693f8f516bfaa717ef4043f11edfdde2.jpg",
    },
    {
      name: "Mang Chủng / 芒种",
      singer: "Âm Khuyết Thi Thính",
      path: "./assets/music/MangChung.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2019/08/05/1/9/9/6/1565016156395_500.jpg",
    },
    {
      name: "Đừng làm trái tim anh đau",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/DungLamTraiTimAnhDau.m4a",
      image: "https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                <div class="song ${
                  index === this.currentIndex ? "active" : ""
                }" data-index="${index}">
                    <div
                        class="thumb"
                        style="
                        background-image: url('${song.image}');
                        "
                    ></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
    });
    playlist.innerHTML = htmls.join("");
  },

  //lấy thuộc tính song hiện tại
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;
    const _this = this;

    /// Xử lý CD quay / dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to/thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newWidth = cdWidth - scrollTop;
      cd.style.width = newWidth > 0 ? newWidth + "px" : 0;
      cd.style.opacity = newWidth / cdWidth;
    };

    // Xử lý khi click play
    playBtn.onclick = function () {
      _this.isPlaying ? audio.pause() : audio.play();
    };

    // Khi song dc play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Xử lý khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.scrollToActiveSong();
    };

    // Xử lý khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý bật / tắt repeat song - giống random song
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) audio.play();
      else {
        nextBtn.click();
      }
    };
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      const option = e.target.closest(".option");
      if (songNode || option) {
        if (option) {
        } else {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
        }
      }
    };
    switchElement.onclick = function () {
      bodyElement.classList.toggle("body-darkMode");
      appElement.classList.toggle("dark-mode");
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) this.currentIndex = 0;
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
    this.loadCurrentSong();
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom || this.isRandom;
    this.isRepeat = this.config.isRepeat || this.isRepeat;
    this.currentIndex = this.config.currentIndex || this.currentIndex;
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    [...$$(".song")].map((s, index) => {
      s.classList.remove("active");
      if (index == this.currentIndex) s.classList.add("active");
    });
    this.setConfig("currentIndex", this.currentIndex);
  },
  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
    repeatBtn.classList.toggle("active", this.isRepeat);
    randomBtn.classList.toggle("active", this.isRandom);
  },
};
app.start();
