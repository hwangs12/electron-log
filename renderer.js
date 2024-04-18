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

/* add event listener on chat button */
addChatButton.addEventListener("click", addChatPreview);
