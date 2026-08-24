/* =========================================
   MADZELCLAIVE DEVELOPER
   GLOBAL WEBSITE SCRIPT
========================================= */

"use strict";


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initSidebar();

    initActiveNavigation();

    initTheme();

    initMusic();

    initLanguage();

    initReveal();

    initYear();

});


/* =========================================
   SIDEBAR / MOBILE MENU
========================================= */

function initSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const menuBtn =
        document.getElementById("menuBtn");

    const overlay =
        document.getElementById("sidebarOverlay");


    if (!sidebar) return;


    /* =====================================
       OPEN SIDEBAR
    ===================================== */

    function openSidebar() {

        sidebar.classList.add("open");


        if (overlay) {

            overlay.classList.add("show");

        }


        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );


            const icon =
                menuBtn.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            }

        }


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================
       CLOSE SIDEBAR
    ===================================== */

    function closeSidebar() {

        sidebar.classList.remove("open");


        if (overlay) {

            overlay.classList.remove("show");

        }


        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                menuBtn.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }


        document.body.style.overflow =
            "";

    }


    /* =====================================
       MENU BUTTON
    ===================================== */

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            () => {

                if (
                    sidebar.classList.contains(
                        "open"
                    )
                ) {

                    closeSidebar();

                } else {

                    openSidebar();

                }

            }
        );

    }


    /* =====================================
       OVERLAY
    ===================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =====================================
       NAVIGATION CLICK
    ===================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeSidebar();

            }
        );

    });


    /* =====================================
       ESC KEY
    ===================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================
       RESIZE
    ===================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 1050
            ) {

                closeSidebar();

            }

        }
    );

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function initActiveNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    if (!navLinks.length) return;


    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    /*
       Jika root domain
       gunakan index.html
    */

    if (
        !currentPage ||
        currentPage === "/"
    ) {

        currentPage =
            "index.html";

    }


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        link.classList.remove(
            "active"
        );


        if (
            href === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/* =========================================
   THEME
========================================= */

function initTheme() {

    const themeBtn =
        document.getElementById(
            "themeBtn"
        );


    const themeIcon =
        document.getElementById(
            "themeIcon"
        );


    /*
       Ambil tema dari LocalStorage
    */

    const savedTheme =
        localStorage.getItem(
            "madzel_theme"
        );


    /*
       Terapkan tema
    */

    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light"
        );

    } else {

        document.body.classList.remove(
            "light"
        );

    }


    updateThemeUI();


    /* =====================================
       THEME BUTTON
    ===================================== */

    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light"
                );


                const isLight =
                    document.body.classList.contains(
                        "light"
                    );


                localStorage.setItem(
                    "madzel_theme",
                    isLight
                        ? "light"
                        : "dark"
                );


                updateThemeUI();


                showToast(
                    isLight
                        ? "Light mode aktif"
                        : "Dark mode aktif"
                );

            }
        );

    }


    /* =====================================
       UPDATE UI
    ===================================== */

    function updateThemeUI() {

        const isLight =
            document.body.classList.contains(
                "light"
            );


        if (themeIcon) {

            themeIcon.textContent =
                isLight
                    ? "☀"
                    : "☾";

        }


        if (themeBtn) {

            themeBtn.setAttribute(
                "aria-pressed",
                String(isLight)
            );

        }

    }

}


/* =========================================
   MUSIC SYSTEM
========================================= */

function initMusic() {

    const music =
        document.getElementById(
            "bgMusic"
        );


    const musicBtn =
        document.getElementById(
            "musicBtn"
        );


    const musicStatus =
        document.getElementById(
            "musicStatus"
        );


    const musicSelect =
        document.getElementById(
            "musicSelect"
        );


    if (!music) return;


    /* =====================================
       MUSIC STATE
    ===================================== */

    let musicEnabled =
        localStorage.getItem(
            "madzel_music"
        );


    /*
       Default ON
    */

    if (
        musicEnabled === null
    ) {

        musicEnabled = "on";

    }


    musicEnabled =
        musicEnabled === "on";


    /* =====================================
       VOLUME
    ===================================== */

    music.volume = 0.35;


    /* =====================================
       SAVED TRACK
    ===================================== */

    const savedTrack =
        localStorage.getItem(
            "madzel_music_track"
        );


    if (
        savedTrack &&
        musicSelect
    ) {

        const exists =
            Array.from(
                musicSelect.options
            ).some(
                option =>
                    option.value ===
                    savedTrack
            );


        if (exists) {

            musicSelect.value =
                savedTrack;


            music.src =
                savedTrack;

        }

    }


    updateMusicUI();


    /* =====================================
       MUSIC BUTTON
    ===================================== */

    if (musicBtn) {

        musicBtn.addEventListener(
            "click",
            async () => {

                musicEnabled =
                    !musicEnabled;


                localStorage.setItem(
                    "madzel_music",
                    musicEnabled
                        ? "on"
                        : "off"
                );


                if (musicEnabled) {

                    try {

                        await music.play();

                    } catch (error) {

                        /*
                           Browser dapat
                           memblokir playback.
                        */

                    }


                    showToast(
                        "Music ON"
                    );

                } else {

                    music.pause();


                    showToast(
                        "Music OFF"
                    );

                }


                updateMusicUI();

            }
        );

    }


    /* =====================================
       MUSIC SELECT
    ===================================== */

    if (musicSelect) {

        musicSelect.addEventListener(
            "change",
            () => {

                const selected =
                    musicSelect.value;


                localStorage.setItem(
                    "madzel_music_track",
                    selected
                );


                music.src =
                    selected;


                music.load();


                if (musicEnabled) {

                    music.play()
                        .catch(() => {});

                }


                showToast(
                    "Musik diganti"
                );

            }
        );

    }


    /* =====================================
       AUTOPLAY FALLBACK
    ===================================== */

    const startMusic =
        () => {

            if (
                musicEnabled &&
                music.paused
            ) {

                music.play()
                    .catch(() => {});

            }

        };


    document.addEventListener(
        "click",
        startMusic,
        {
            once: true
        }
    );


    document.addEventListener(
        "touchstart",
        startMusic,
        {
            once: true
        }
    );


    /* =====================================
       UPDATE MUSIC UI
    ===================================== */

    function updateMusicUI() {

        if (musicStatus) {

            musicStatus.textContent =
                musicEnabled
                    ? "ON"
                    : "OFF";

        }


        if (musicBtn) {

            musicBtn.setAttribute(
                "aria-pressed",
                String(musicEnabled)
            );

        }

    }

}


/* =========================================
   LANGUAGE
========================================= */

function initLanguage() {

    const buttons =
        document.querySelectorAll(
            "[data-lang]"
        );


    if (!buttons.length) return;


    let language =
        localStorage.getItem(
            "madzel_language"
        );


    /*
       Default Indonesia
    */

    if (
        language !== "id" &&
        language !== "en"
    ) {

        language = "id";


        localStorage.setItem(
            "madzel_language",
            language
        );

    }


    updateLanguageButtons();


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selected =
                    button.dataset.lang;


                if (
                    selected !== "id" &&
                    selected !== "en"
                ) {

                    return;

                }


                language =
                    selected;


                localStorage.setItem(
                    "madzel_language",
                    language
                );


                updateLanguageButtons();


                showToast(
                    language === "id"
                        ? "Bahasa Indonesia dipilih"
                        : "English selected"
                );

            }
        );

    });


    /* =====================================
       UPDATE LANGUAGE BUTTON
    ===================================== */

    function updateLanguageButtons() {

        buttons.forEach(button => {

            button.classList.toggle(
                "active-lang",
                button.dataset.lang ===
                language
            );

        });

    }

}


/* =========================================
   REVEAL ANIMATION
========================================= */

function initReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    /*
       Fallback browser
    */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element =>
                element.classList.add(
                    "show"
                )
        );


        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element =>
            observer.observe(
                element
            )
    );

}


/* =========================================
   FOOTER YEAR
========================================= */

function initYear() {

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.madzelToastTimer
    );


    window.madzelToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}