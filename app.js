

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = "en-GB";
    window.speechSynthesis.speak(textSpeak);
}

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onstart = () => {
    voice.style.display = "block";
};

recognition.onend = () => {
    btn.style.display = "flex";
    voice.style.display = "none";
};

recognition.onerror = (event) => {
    speak("Sorry, I didn't catch that. Please try again.");
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    }   else if (message.includes("how are you")) {
        speak("I am fine what about you");
    }   else if (message.includes("what are you doing")) {
        speak("I'm here, ready to help you with any questions or tasks you have! What's on your mind?");
    }
    
    else if (message.includes("who are you")) {
        speak("I am your personal assistant, created by Farhan.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter...");
        window.open("https://www.twitter.com");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak(`The time is ${time}.`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak(`Today's date is ${date}.`);
    } else {
        let searchTerm = message.replace(/alina/i, "").trim();
        if (searchTerm) {
            let finalText = `This is what I found on the internet regarding "${searchTerm}".`;
            speak(finalText);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, "_blank");
        } else {
            speak("Please provide a search query after 'Alina'.");
        }
    }
}
