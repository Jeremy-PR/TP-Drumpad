document.addEventListener('keydown', sonEtAnimation);
document.addEventListener('keyup', removeAudioAndAnimation);

let recording = false;
let sounds = [];
let tempo = [];

function sonEtAnimation(event) {
    if (event.repeat) return;

    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);

    if (!key) return;

    key.classList.toggle('playing');

    const audio = document.querySelector('audio[data-key="' + event.keyCode + '"]');

    if (!audio) {

        if (event.keyCode === 82) {
            TriggerRecord(event);
        };

        
        return;
    };

    if (audio) {

        audio.currentTime = 0;
        audio.play();

        if (recording === true) {
            record(event);
        };
    };
};

function removeAudioAndAnimation(event) {
    let keySelect = document.querySelector(`.key[data-key="${event.keyCode}"]`);

    if (!keySelect) return;

    let audio = document.querySelector('audio[data-key="' + event.keyCode + '"]');

    if (keySelect && audio) {
        keySelect.classList.toggle('playing');
    }
};

function TriggerRecord(event) {
    if (event.keyCode === 82 && recording === false) {
        recording = true;
    }
    else {
        recording = false;
    };
};

function record(event) {
            sounds.push(event.keyCode);
            console.log(sounds);
            
};