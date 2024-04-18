const user = document.getElementById("user");
user.innerText = environment.user();

/* add chat button */
var addChatButton = document.getElementById("add-chat");

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
    var channelInput = document.createElement("input");
    channelInput.classList.add("input-style");
    channel.appendChild(channelInput);
    addChatButton.disabled = true;
}

/* add event listener on chat button */
addChatButton.addEventListener("click", addChannel);
