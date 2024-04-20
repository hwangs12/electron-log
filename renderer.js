import { checkBox, addButton } from "./svg.js";

const user = document.getElementById("user");
user.innerText = environment.user();

/* add chat button */
var addChatButton = document.getElementById("add-chat");

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
function addChatPreview() {
    var chatPreviewSection = document.getElementById("chat-preview-section");
    var chatPreviewNode = document.createElement("div");
    chatPreviewNode.className = "chat-preview";
    chatPreviewNode.innerHTML += "pikachu";
    chatPreviewSection.appendChild(chatPreviewNode).cloneNode(true);
}

/**
 * function to add channel
 * author: Jun Hwang
 * @version: 1.0
 */
function addChannel() {
    var channel = document.getElementById("channel-manager-view");
    var channelForm = document.createElement("form");
    var fieldset = document.createElement("fieldset");
    var inputElement = document.createElement("input");
    inputElement.classList.add("channel-input");
    var confirmButtonElement = document.createElement("button");
    confirmButtonElement.classList.add("channel-submit");
    confirmButtonElement.innerHTML = checkBox();
    inputElement.setAttribute("placeholder", "Enter Channel Name");
    fieldset.appendChild(inputElement);
    fieldset.appendChild(confirmButtonElement);
    channelForm.appendChild(fieldset);
    channel.appendChild(channelForm);
    addChatButton.style.transform = "rotate(90deg)";
}

/* add event listener on document load */
document.addEventListener("DOMContentLoaded", addChatButtonOnLoad);

/* add event listener on chat button */
addChatButton.addEventListener("click", addChannel);
