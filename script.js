/* =====================================================
   HELPERS
===================================================== */

const $ = selector =>
    document.querySelector(selector);


const screens =
    [
        ...document.querySelectorAll(".screen")
    ];


function showScreen(id) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const target =
        document.getElementById(id);


    if (target) {

        target.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}



/* =====================================================
   LOGIN
===================================================== */

/* =====================================================
   LOGIN
===================================================== */

const SECRET_CODE = "3092007";

$("#loginForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            $("#nameInput")
            .value
            .trim();

        const password =
            $("#passwordInput")
            .value
            .trim();


        if (name.length < 2) {

            $("#loginError").textContent =
                "Please enter your name.";

            return;
        }


        if (password !== SECRET_CODE) {

            $("#loginError").textContent =
                "Hmm... wrong secret code 👀";

            shakeLogin();

            return;
        }


        $("#navName").textContent =
            name;

        $("#heroName").textContent =
            name;

        $("#finalName").textContent =
            name;


        createConfetti(45);


        setTimeout(
            () => {

                showScreen(
                    "introScreen"
                );

            },
            700
        );

    }
);


/* =====================================================
   LOGIN SHAKE
===================================================== */

function shakeLogin() {

    const card =
        document.querySelector(
            ".login-card"
        );


    card.animate(
        [

            {
                transform:
                    "translateX(0)"
            },

            {
                transform:
                    "translateX(-8px)"
            },

            {
                transform:
                    "translateX(8px)"
            },

            {
                transform:
                    "translateX(-6px)"
            },

            {
                transform:
                    "translateX(6px)"
            },

            {
                transform:
                    "translateX(0)"
            }

        ],
        {
            duration: 400
        }
    );

}



/* =====================================================
   INTRO + MUSIC
===================================================== */

const birthdayMusic =
    new Audio("assets/birthday.m4a");

birthdayMusic.loop = true;

$("#enterWorldButton")
    .addEventListener(
        "click",
        () => {

            /*
                Start the music immediately
                after the user interaction.
            */
            birthdayMusic
                .play()
                .catch(error => {
                    console.log(
                        "Music could not start:",
                        error
                    );
                });

            /*
                Go to the main world
            */
            showScreen(
                "homeScreen"
            );

        }
    );



/* =====================================================
   HOME
===================================================== */

$("#discoverButton")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "memoriesScreen"
            );

        }
    );



/* =====================================================
   NEXT BUTTONS
===================================================== */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showScreen(
                    button.dataset.next
                );

            }
        );

    });



/* =====================================================
   MEMORY GALLERY
===================================================== */

const memoryPhotos =
    document.querySelectorAll(
        ".memory-photo"
    );


memoryPhotos.forEach(photo => {

    photo.addEventListener(
        "click",
        () => {

            const image =
                photo.dataset.image;


            const title =
                photo.dataset.title;


            $("#modalImage")
                .src = image;


            $("#modalImage")
                .alt = title;


            $("#imageTitle")
                .textContent = title;


            $("#imageModal")
                .classList
                .add("show");

        }
    );

});



/* =====================================================
   CLOSE IMAGE
===================================================== */

$("#closeImage")
    .addEventListener(
        "click",
        () => {

            $("#imageModal")
                .classList
                .remove("show");

        }
    );


$("#imageModal")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "imageModal"
            ) {

                $("#imageModal")
                    .classList
                    .remove("show");

            }

        }
    );



/* =====================================================
   SECRET MESSAGES
===================================================== */

document
    .querySelectorAll("[data-message]")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                $("#modalMessage")
                    .textContent =
                    card.dataset.message;


                $("#messageModal")
                    .classList
                    .add("show");

            }
        );

    });



/* =====================================================
   CLOSE MESSAGE
===================================================== */

$("#closeModal")
    .addEventListener(
        "click",
        () => {

            $("#messageModal")
                .classList
                .remove("show");

        }
    );


$("#messageModal")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "messageModal"
            ) {

                $("#messageModal")
                    .classList
                    .remove("show");

            }

        }
    );



/* =====================================================
   ENVELOPE
===================================================== */

const envelope =
    $("#envelope");


const letterTyping =
    $("#letterTyping");


const letterSignature =
    document.querySelector(
        ".paper-signature"
    );


let envelopeOpened =
    false;


envelope.addEventListener(
    "click",
    () => {

        if (envelopeOpened) {

            return;

        }


        envelopeOpened =
            true;


        /*
            Open envelope
        */

        envelope.classList.add(
            "open"
        );


        /*
            Small celebration
        */

        setTimeout(
            () => {

                createConfetti(30);

            },
            500
        );


        /*
            Wait until the paper
            has started moving.
        */

        setTimeout(
            () => {

                startTypewriter();

            },
            950
        );

    }
);



/* =====================================================
   TYPEWRITER
===================================================== */

function startTypewriter() {

    if (!letterTyping) {
        return;
    }


    const text =
        letterTyping.dataset.text;


    /*
        Clear the old text
    */

    letterTyping.textContent = "";


    /*
        Show cursor
    */

    letterTyping.classList.add(
        "typing"
    );


    /*
        Hide signature
        until typing finishes
    */

    letterSignature.classList.remove(
        "show"
    );


    let index = 0;


    /*
        Typing speed.

        25 = fast
        32 = normal
        45 = slow
    */

    const typingSpeed = 32;


    function typeNextCharacter() {

        if (
            index <
            text.length
        ) {

            letterTyping.textContent +=
                text.charAt(index);


            index++;


            setTimeout(
                typeNextCharacter,
                typingSpeed
            );

        }

        else {

            /*
                Typing finished
            */

            letterTyping.classList.remove(
                "typing"
            );


            /*
                Show signature
            */

            setTimeout(
                () => {

                    letterSignature.classList.add(
                        "show"
                    );

                },
                500
            );

        }

    }


    typeNextCharacter();

}



/* =====================================================
   FINAL SURPRISE
===================================================== */

$("#celebrateButton")
    .addEventListener(
        "click",
        () => {

            createConfetti(180);

            createHearts(35);


            setTimeout(
                () => {

                    showFinalMessage();

                },
                700
            );

        }
    );



/* =====================================================
   FINAL POPUP
===================================================== */

function showFinalMessage() {

    const name =
        $("#finalName")
        .textContent;


    const popup =
        document.createElement(
            "div"
        );


    popup.className =
        "final-popup";


    popup.innerHTML = `

        <div class="final-popup-content">

            <div class="popup-heart">
                ♥
            </div>

            <h3>
                Happy Birthday,
                ${name}! 🎂
            </h3>

            <p>
                Here's to another year
                of beautiful memories,
                big dreams and little moments
                worth remembering.
            </p>

            <button
                id="closeFinalPopup"
            >
                Keep this memory ♡
            </button>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    document
        .getElementById(
            "closeFinalPopup"
        )
        .addEventListener(
            "click",
            () => {

                popup.remove();

            }
        );

}



/* =====================================================
   CONFETTI
===================================================== */

function createConfetti(amount) {

    const symbols = [
        "♥",
        "✦",
        "✧",
        "◆",
        "●"
    ];


    const colors = [
        "#ff83b7",
        "#ffb4d4",
        "#9d82ff",
        "#ffd166",
        "#ffffff"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "confetti";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 +
            "vw";


        piece.style.color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.fontSize =
            (
                8 +
                Math.random() * 18
            ) + "px";


        piece.style.animationDuration =
            (
                2.5 +
                Math.random() * 2
            ) + "s";


        piece.style.animationDelay =
            (
                Math.random() * 1.5
            ) + "s";


        document.body.appendChild(
            piece
        );


        setTimeout(
            () => {

                piece.remove();

            },
            5000
        );

    }

}



/* =====================================================
   HEARTS
===================================================== */

function createHearts(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "confetti";


        heart.textContent =
            "♥";


        heart.style.left =
            Math.random() * 100 +
            "vw";


        heart.style.color =
            "#ff83b7";


        heart.style.fontSize =
            (
                12 +
                Math.random() * 20
            ) + "px";


        heart.style.animationDuration =
            (
                3 +
                Math.random() * 2
            ) + "s";


        document.body.appendChild(
            heart
        );


        setTimeout(
            () => {

                heart.remove();

            },
            6000
        );

    }

}



/* =====================================================
   MUSIC
===================================================== */

const music =
    $("#birthdayMusic");


const musicButton =
    $("#musicButton");


let musicPlaying =
    false;


musicButton.addEventListener(
    "click",
    async () => {

        try {

            if (musicPlaying) {

                music.pause();

                musicPlaying =
                    false;


                musicButton.innerHTML =
                    "♫ <span>Music</span>";

            }

            else {

                await music.play();

                musicPlaying =
                    true;


                musicButton.innerHTML =
                    "♫ <span>Playing</span>";

            }

        }

        catch (error) {

            console.error(
                "Music error:",
                error
            );

        }

    }
);



/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            $("#imageModal")
                .classList
                .remove("show");


            $("#messageModal")
                .classList
                .remove("show");

        }

    }
);