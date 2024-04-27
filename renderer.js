import { checkBox, addButton } from "./svg.js";

const user = document.getElementById("user");
user.innerText = environment.user();

/* add chat button */
var addChatButton = document.getElementById("add-chat");
var channel = document.getElementById("channel-manager-view");
var confirmInputSubmitButton = document.getElementById("confirm-input-submit");

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
    var confirmInputSubmit = document.getElementById("confirm-input-submit");
    confirmInputSubmit.disabled = true;
}

/**
 * function to submit the form
 * author: Jun Hwang
 * @version: 1.0
 */
function confirmSubmitAdd() {
    let formdata = new FormData(document.getElementById("channel-add-form"));
    let input = formdata.get("channel-name-input");
    addChatPreview(input);
}

/* add event listener on document load */
document.addEventListener("DOMContentLoaded", addChatButtonOnLoad);

/* add event listener on add chat button */
addChatButton.addEventListener("click", toggleAddChannel);

document.body.addEventListener("submit", function (event) {
    event.preventDefault();
    if (event.target.id === "channel-add-form") {
        confirmSubmitAdd();
    }
});
