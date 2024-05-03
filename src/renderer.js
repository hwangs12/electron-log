import { checkBox, addButton } from "./svg.js";
import * as Realm from "realm";

const app = new Realm.App({ id: "mongo-to-electron-jzutigk" }); // create a new instance of the Realm.App
export async function run() {
    // login with an anonymous credential
    await app.logIn(Realm.Credentials.anonymous());
    const DogSchema = {
        name: "Dog",
        properties: {
            _id: "int",
            name: "string",
            age: "int",
        },
        primaryKey: "_id",
    };
    const realm = await Realm.open({
        schema: [DogSchema],
        sync: {
            user: app.currentUser,
            partitionValue: "myPartition",
        },
    });
    // The myPartition realm is now synced to the device. You can
    // access it through the `realm` object returned by `Realm.open()`
    // write to the realm
    const dogs = realm.objects("Dog");
    console.log(`Renderer: Number of Dog objects: ${dogs.length}`);

    realm.write(() => {
        realm.create("Dog", {
            _id: 1,
            name: "Spot",
            age: 2,
        });
    });
}

run().catch((err) => {
    console.error("Failed to open realm: ", err);
});

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

/* add event listener on document load */
document.addEventListener("DOMContentLoaded", addChatButtonOnLoad);

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
        confirmSubmitAdd();
    }
});
