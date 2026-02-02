console.log("hello world!")

const socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

function createElementTitle() {
    const streamtimTitle = "Stream Tim";

    const container = document.getElementById("container");

    const streamtimTitleDiv = document.createElement('div');

    streamtimTitleDiv.id = "title";

    streamtimTitleDiv.className = "streamtimTitle";

    streamtimTitleDiv.textContent = streamtimTitle;

    container.appendChild(streamtimTitleDiv);
}


function createElementDescription() {
    const slogan = "Streamtim : ton chat Twitch prend vie !";
    const description = "Streamtim écoute les messages de ton chat et déclenche sons, images et animations en direct pour rendre ton stream interactif.";

    const container = document.getElementById("container");

    // Création du div pour le slogan
    const sloganDiv = document.createElement('div');
    sloganDiv.id = "slogan";
    sloganDiv.className = "streamtimSlogan";
    sloganDiv.textContent = slogan;
    container.appendChild(sloganDiv);

    // Création du div pour le texte explicatif
    const descriptionDiv = document.createElement('div');
    descriptionDiv.id = "description";
    descriptionDiv.className = "streamtimDescription";
    descriptionDiv.textContent = description;
    container.appendChild(descriptionDiv);
}

function createElementSearchInput() {
    // Création du label

    const searchInputPlaceholderText = "Ex : nomDeTaChaine ou lienDeTaChaine";

    const container = document.getElementById("container");
    const label = document.createElement('div');
    label.id = "channelLabel";
    label.className = "streamtimLabel";
    label.textContent = "Sélectionne ta chaîne Twitch (pseudo ou lien) :";
    container.appendChild(label);
    const searchInput = document.createElement('input');

    searchInput.id = "searchInput";

    searchInput.className = "searchInput";

    searchInput.placeholder = searchInputPlaceholderText;

    const valideChanelButton = document.createElement("button");

    valideChanelButton.textContent = "valide";


    container.appendChild(searchInput);
    container.appendChild(valideChanelButton);



    valideChanelButton.addEventListener("click", function () {
        valideChannel(searchInput)
    })

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            valideChannel(searchInput)
        }
    })

}


createElementTitle()
createElementDescription()
createElementSearchInput()


function valideChannel(searchInput) {
    let channelName = ""

    channelName = searchInput.value.trim().toLowerCase()

    console.log("JOIN #" + channelName);
    socket.send(`JOIN #${channelName}`);

    searchInput.value = "";
}

socket.onopen = () => {
    socket.send("PASS SCHMOOPIIE"); // lecture seule
    socket.send("NICK justinfan12345");
    console.log("Connecté à Twitch");
};

let chatMessageSoundLink = "assets/sounds/messageSounds/message-13716.mp3"

const chatMessageSound = new Audio(chatMessageSoundLink);

socket.onmessage = (event) => {

    const message = event.data;
    message.startsWith("PING")
    console.log(message)
    if (message.includes("PRIVMSG")) {
        console.log("Message chat :", message);
        // Joue le son
        chatMessageSound.play();
    }
    socket.send("PONG :tmi.twitch.tv");
};

function createElementCheckboxOptionMessageSounds() {


    const opitonMessageSoundsCheckboxLabelText = "opitonMessageSounds";

    const container = document.getElementById("container");
    const label = document.createElement('div');
    label.id = "opitonMessageSoundsCheckboxLabel";
    label.className = "opitonCheckboxLabel";
    label.textContent = "opitonMessageSounds";
    container.appendChild(label);

    const opitonMessageSoundsCheckbox = document.createElement('input');
    opitonMessageSoundsCheckbox.setAttribute("type","checkbox")
    opitonMessageSoundsCheckbox.setAttribute("name","checkbox")
    opitonMessageSoundsCheckbox.id = "opitonMessageSoundsCheckbox";
    opitonMessageSoundsCheckbox.className = "opitonCheckbox";
    container.appendChild(opitonMessageSoundsCheckbox);

    opitonMessageSoundsCheckbox.addEventListener("click", function () {
        if (opitonMessageSoundsCheckbox.checked) {
            // activer le option bruit de message 
        } else {
            //desactiver option bruit de mssage
        }
    })


}
createElementCheckboxOptionMessageSounds()