const user = document.getElementById("user");
user.innerText = environment.user();

/**
 * add chat preview on click
 */
function addChatPreview() {
    var addChatButton = document.getElementById("add-chat");
    var chatPreviewSection = document.getElementById("chat-preview-section");
    var chatPreviewNode = document.createElement("div");
    chatPreviewNode.className = "chat-preview";
    chatPreviewNode.innerHTML += "yolo";
    addChatButton.addEventListener("click", () => {
        chatPreviewSection.appendChild(chatPreviewNode);
    });
}

addChatPreview();
