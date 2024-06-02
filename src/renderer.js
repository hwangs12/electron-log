import { checkBox, addButton } from "./svg.js";

const user = document.getElementById("user");
user.innerText = environment.user();

/* add chat button */
var addChatButton = document.getElementById("add-chat");
var channel = document.getElementById("channel-manager-view");

/**
 * function to add chat button on content loaded
 * author: Jun Hwang
 * @version: 1.0
 */

function addChatButtonOnLoad() {
    addChatButton.innerHTML = addButton();
}

/**
 * function to add chat preview on click
 * author: Jun Hwang
 * @version: 1.0
 */
function addChatPreview(text) {
    var chatPreviewSection = document.getElementById("chat-preview-section");
    var chatPreviewNode = document.createElement("div");
    chatPreviewNode.className = "chat-preview";
    chatPreviewNode.innerHTML += text ?? "";
    chatPreviewSection.appendChild(chatPreviewNode).cloneNode(true);
}

/**
 * function to add channel
 * author: Jun Hwang
 * @version: 1.0
 */
function toggleAddChannel() {
    var addChannelInputForm = channel.childNodes[3];

    // confirmButtonElement.disabled = true;
    if (addChatButton.classList.contains("rotate45")) {
        addChatButton.classList.remove("rotate45");
        channel.removeChild(addChannelInputForm);
    } else {
        addChatButton.classList.add("rotate45");
        createForm();
    }
}

/**
 * function to create form
 * author: Jun Hwang
 * @version: 1.0
 */
function createForm() {
    var channelForm = document.createElement("form");
    var fieldset = document.createElement("fieldset");
    var inputElement = document.createElement("input");
    inputElement.classList.add("channel-input");
    inputElement.setAttribute("name", "channel-name-input");
    channelForm.setAttribute("id", "channel-add-form");
    var confirmButtonElement = document.createElement("button");
    confirmButtonElement.setAttribute("id", "confirm-input-submit");
    confirmButtonElement.classList.add("channel-submit");
    confirmButtonElement.innerHTML = checkBox();
    inputElement.setAttribute("id", "channel-name-input");
    inputElement.setAttribute("placeholder", "Enter Channel Name");
    fieldset.appendChild(inputElement);
    fieldset.appendChild(confirmButtonElement);
    channelForm.appendChild(fieldset);
    channel.appendChild(channelForm);
    disableInputSubmitAtInit();
}

/**
 * function to disable input submit button
 * author: Jun Hwang
 * @version: 1.0
 */
function disableInputSubmitAtInit() {
    let confirmInputSubmitButton = document.getElementById(
        "confirm-input-submit"
    );
    confirmInputSubmitButton.disabled = true;
}

/**
 * function to submit the form
 * author: Jun Hwang
 * @version: 1.0
 */
function confirmSubmitAdd() {
    const formElement = document.getElementById("channel-add-form");
    let formdata = new FormData(formElement);
    let input = formdata.get("channel-name-input");
    addChatPreview(input);
    /* reset input field after submit */
    formElement.reset();
    /* rotate back the add button */
    addChatButton.classList.remove("rotate45");
    /* remove form field */
    formElement.remove();
}

/**
 * validate input value
 * author: Jun Hwang
 * @version: 1.0
 */
function validateInput(inputValue) {
    let confirmInputSubmitButton = document.getElementById(
        "confirm-input-submit"
    );
    confirmInputSubmitButton.disabled = !(
        inputValue.length > 0 && /^[0-9a-zA-Z\-_]*$/.test(inputValue)
    );
}

/**
 * list chatrooms on load
 * author: Jun Hwang
 * @version: 1.0
 */
function listChatrooms() {
    const chatPreview = document.getElementById("chat-preview-section");
    database.listChatrooms((chatrooms) => {
        chatrooms.forEach((chatroom) => {
            const div = document.createElement("div");
            div.classList.add("chat-preview");
            div.innerText = chatroom.chatRoomName;
            chatPreview.appendChild(div);
        });
    });
}

/* add event listener on document load */
document.addEventListener("DOMContentLoaded", () => {
    addChatButtonOnLoad();
    listChatrooms();
});

/* add event listener on add chat button */
addChatButton.addEventListener("click", toggleAddChannel);

/* track the input value for channel add form input */
document.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.target.id === "channel-name-input") {
        validateInput(event.target.value);
    }
});

/* confirm submit when form input is complete and button is pressed */
document.body.addEventListener("submit", function (event) {
    event.preventDefault();
    if (event.target.id === "channel-add-form") {
        const inputElement = document.getElementById("channel-name-input");
        database.sendAddChatRoomSignal(inputElement.value);
        confirmSubmitAdd();
    }
});
