var widget = document.getElementById('widget-container');
let messageData = [];

function storeMessage(content, sender) {
    const message = {
        content: content,
        sender: sender
    };
    messageData.push(message);
}

function handleUserInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage(mandatory_response = 0) {
    const userInput = document.getElementById("user-input");
    let message = userInput.value;
    if (isNaN(mandatory_response) || mandatory_response === "") { //Mandatory response is a string meaning we're bringing it back
        message = mandatory_response;
    } else { // Mandatory response is a number meaning its a user message
        storeMessage(message, 'user');
    }
    if (message.trim() === "") {
        return;
    }

    const chatMessages = document.getElementById("chat-messages");
    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("user-message");
    userMessageElement.textContent = message;

    userMessageElement.style.backgroundColor = '#007bff';
    userMessageElement.style.color = 'white';
    userMessageElement.style.borderRadius = '10px';
    userMessageElement.style.padding = '5px 10px';
    userMessageElement.style.maxWidth = '70%';
    userMessageElement.style.overflowWrap = 'break-word';
    userMessageElement.style.width = 'fit-content';
    userMessageElement.style.marginLeft = 'auto';
    userMessageElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif';
    userMessageElement.style.fontSize = '15px';

    chatMessages.appendChild(userMessageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!isNaN(mandatory_response)) {
        BotResponse(first_message = false, user_response = message);
    }
    userInput.value = "";
}

function BotResponse(first_message = false, user_response = 0, mandatory_response = 0) {
    const chatMessages = document.getElementById("chat-messages");
    const botMessageElement = document.createElement("div");
    botMessageElement.classList.add("bot-message");

    botMessageElement.style.backgroundColor = 'blue';
    botMessageElement.style.color = 'white';
    botMessageElement.style.borderRadius = '10px';
    botMessageElement.style.padding = '5px 10px';
    botMessageElement.style.margin = '5px 0';
    botMessageElement.style.maxWidth = '70%';
    botMessageElement.style.overflowWrap = 'break-word';
    botMessageElement.style.width = 'fit-content';
    botMessageElement.style.marginRight = 'auto';
    botMessageElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif';
    botMessageElement.style.fontSize = '15px';

    let message = '';
    if (first_message === true) {
        message = "Bonjour ~ I'm Jacques, an AI suit connoisseur. What brings you to League of Rebels today?";
        storeMessage(message, 'bot');
    }
    else if (isNaN(user_response)) {
        message = '"' + user_response + '"';
        storeMessage(message, 'bot');
    }
    else if (isNaN(mandatory_response)) {
        message = mandatory_response;
    }
    botMessageElement.textContent = message;
    chatMessages.appendChild(botMessageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function closeWidget() {
    var widgetHTML = `
        <button id="open-button">Open</button>
    `
    widget.innerHTML = widgetHTML;
    widget.style.all = 'initial';
    widget.style.border = '1px solid #ccc';
    widget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    widget.style.position = 'fixed';
    widget.style.height = '50px';
    widget.style.width = '110px';
    widget.style.bottom = '0px';
    widget.style.right = '20px';
    widget.style.borderRadius = '5px';
    
    var openButton = document.getElementById('open-button');
    openButton.style.opacity = '0';
    openButton.style.width = '100%';
    openButton.style.height = '100%';
    openButton.style.cursor = 'pointer';
    openButton.addEventListener('click', openWidget);
}

function openWidget() {
    var widgetHTML = `
    <div id="browsing-panel">
        <div id="browsing-header">Recommendations</div>
        <div id="browsing-area">(Where recommendations show up)</div>
    </div>
    <div id='chatbot'>
        <div id="chat-header">
            <div id="chat-title">Jacques, the AI Stylist</div>
            <button id="close-button" onclick="closeWidget()">X</button>
        </div>
        <div id="chat-messages">
            <!-- Chat messages will appear here -->
        </div>
        <div id="chat-input">
            <input type="text" id="user-input" placeholder="Type your message..." onkeydown="handleUserInput(event)">
            <button id="send-button" onclick="sendMessage()">Send</button>
        </div>
    </div>
    `;
    widget.style.position = 'fixed';
    widget.style.bottom = '20px';
    widget.style.right = '20px';
    widget.style.height = '500px'
    widget.style.width = '800px';
    widget.style.border = '1px solid #ccc';
    widget.style.borderRadius = '10px';
    widget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    widget.style.display = 'grid';
    widget.style.gridTemplateColumns = '1fr 1fr';
    widget.style.gridAutoRows = '100%';
    widget.innerHTML = widgetHTML;

    // Browsing Panel CSS
    var browsingPanel = document.getElementById('browsing-panel');
    browsingPanel.style.backgroundColor = '#f0ede5';
    
    var browsingHeader = document.getElementById('browsing-header');
    browsingHeader.style.padding = '10px';
    browsingHeader.style.color = 'black';
    browsingHeader.style.fontSize = '18px';
    browsingHeader.style.height = '20px';
    browsingHeader.style.boxShadow = '0 4px 2px -2px gray';

    // Chatbot CSS
    var chatbot = document.getElementById('chatbot');
    chatbot.style.backgroundColor = 'rgb(30,30,30)';

    var chatHeader = document.getElementById('chat-header');
    chatHeader.style.backgroundColor = 'black';
    chatHeader.style.padding = '10px';
    chatHeader.style.height = '20px';
    chatHeader.style.color = 'white';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.fontSize = '18px';
    chatHeader.style.boxShadow = '0 4px 2px -2px gray';

    var closeButton = document.getElementById('close-button');
    closeButton.style.marginLeft = '10px';
    closeButton.style.height = '100%';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', closeWidget);

    var chatMessages = document.getElementById('chat-messages');
    chatMessages.style.padding = '10px';
    chatMessages.style.overflowY = 'auto';
    chatMessages.style.flex = '1';
    chatMessages.style.height = '77%';

    var inputArea = document.getElementById('chat-input');
    inputArea.style.position = 'relative';
    inputArea.style.padding = '5px';
    inputArea.style.marginBottom = '0px';

    var inputBox = document.getElementById('user-input');
    inputBox.style.height = '30px';
    inputBox.style.width = '75%';
    inputBox.style.padding = '5px 10px';
    inputBox.style.backgroundColor = 'rgb(60,60,60)';
    inputBox.style.color = 'white';
    inputBox.style.border = '1px solid';

    var sendButton = document.getElementById('send-button');
    sendButton.style.display = 'inline-block'
    sendButton.style.height = '100%';
    sendButton.style.width = '17%';
    sendButton.style.padding = '5px 10px';
    sendButton.style.cursor = 'pointer';

    if (messageData.length == 0) {
        BotResponse(first_message = true);
    }
    else {
        console.log(messageData.length);
        for (var message of messageData) {
            if (message.sender == 'bot') {
                console.log('loading bot message...' + message.content);
                BotResponse(first_message = false, user_response = 0, mandatory_response = String(message.content));
            }
            else if (message.sender == 'user') {
                console.log('loading user message...' + message.content);
                sendMessage(mandatory_response = String(message.content));
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    openWidget();
});
  