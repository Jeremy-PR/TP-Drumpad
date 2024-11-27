
document.addEventListener('keydown', sonEtAnimation);
document.addEventListener('keyup', stopAudioAndAnimation);

let isRecording = false;
let soundsRecording = [];
let startRecord;

function sonEtAnimation(event) {
    if (event.repeat) return;

    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);

    if (!key) return;

    key.classList.toggle('playing');

    const keyAudio = document.querySelector('audio[data-key="' + event.keyCode + '"]');

    if (!keyAudio) {

        if (event.keyCode === 82) {
            TriggerRecord(event);
        };

        if(event.keyCode === 80){
            startPlay(event);
        }

        return;
    };

    if (keyAudio) {

        keyAudio.currentTime = 0;
        keyAudio.play();

        if (isRecording === true) {
            record(event);
        };
    };
};

function stopAudioAndAnimation(event) {
    let keySelect = document.querySelector(`.key[data-key="${event.keyCode}"]`);

    if (!keySelect) return;

    let keyAudio = document.querySelector('audio[data-key="' + event.keyCode + '"]');

    if (keySelect && keyAudio) {
        keySelect.classList.toggle('playing');
    }
};

function TriggerRecord(event) {
    if (event.keyCode === 82 && isRecording === false) {
        isRecording = true;
        soundsRecording = [];
        startRecord = Date.now();
    }
    else {
        isRecording = false;
    };
};

function record(event) {
            soundsRecording.push({
                keyCode: event.keyCode,
               timeCode: Date.now() - startRecord 
            })    
            console.log(soundsRecording);
                
};

function startPlay() {
    const playButton = document.querySelector('.play-button');
    if (playButton) playButton.classList.add('playing'); // Enfoncer le bouton play

    let lastTime = 0; // Variable pour suivre la dernière durée

    soundsRecording.forEach((sound) => {
        setTimeout(() => {
            const key = document.querySelector(`.key[data-key="${sound.keyCode}"]`);
            const keyAudio = document.querySelector(`audio[data-key="${sound.keyCode}"]`);

            if (key && keyAudio) {
                keyAudio.currentTime = 0;
                keyAudio.play();
                key.classList.add('playing');
                setTimeout(() => key.classList.remove('playing'), 300); // Retirer l'animation
            }
        }, sound.timeCode);

        // Mettre à jour lastTime pour la durée totale
        lastTime = Math.max(lastTime, sound.timeCode + 300);
    });

    setTimeout(() => {
        if (playButton) playButton.classList.remove('playing'); // Relâcher le bouton play après la lecture
    }, lastTime);
}
