// Jacques chatbot.js
var widget = document.getElementById('widget-container');
let messageData = [];
let recommendationData = [];

function storeMessage(content, sender) {
    const message = {
        content: content,
        sender: sender
    };
    messageData.push(message);
}

function storeRecs(image_link, name, price) {
    const rec = {
        image_link: image_link,
        name: name,
        price: price
    };
    recommendationData.push(rec);
}

async function getModelOutput(message, chat_history) {
    let response = await fetch("https://stylist-api.vercel.app/get-response/" + message.replace(/\s/g, '-') + "?history=" + chat_history.map(item => item.content).slice(0,chat_history.length-1).join("+$+").replace(/\s/g, '-'));
    let output = await response.json();
    console.log(output);
    return [output['bot_response'], output['side_bar'][0], output['side_bar'][1], output['side_bar'][2]]
}

function handleUserInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage(mandatory_response = 0) {
    const userInput = document.getElementById("user-input");
    let message = userInput.value;
    if (isNaN(mandatory_response) || mandatory_response === "") {
        message = mandatory_response;
    } else {
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
        BotResponse(user_response = message);
    }
    userInput.value = "";
}

function BotResponse(user_response = 0, mandatory_response = 0) {
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
    if (isNaN(mandatory_response)) {
        message = mandatory_response;
        botMessageElement.textContent = message;
        chatMessages.appendChild(botMessageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    else {
        const loading_text_list = ["Let's see here...", "One sec...", "Pulling up some items...", "Browsing our options...", "Thinking super hard...", "Hmm..."]
        const loadingText = document.createElement("div");
        loadingText.classList.add("loading-text");
        loadingText.textContent = loading_text_list[Math.floor(Math.random() * loading_text_list.length)];
        loadingText.style.color = "gray";
        loadingText.style.fontSize = "12px";
        loadingText.style.marginBottom = "5px";
        loadingText.style.marginRight = "50%";
        chatMessages.appendChild(loadingText);

        getModelOutput(user_response, messageData)
            .then(output => {
                message = output[0];
                console.log("Api Done: "+new Date());
                return output;
            })
            .then(output => {
                storeMessage(message, 'bot');
                clearRecommendations();
                addRecommendation(image_link=output[1]['img-url'], product_title=output[1]['name'], product_price=output[1]['price'], product_link=output[1]['link']);
                addRecommendation(image_link=output[2]['img-url'], product_title=output[2]['name'], product_price=output[2]['price'], product_link=output[2]['link']);
                addRecommendation(image_link=output[3]['img-url'], product_title=output[3]['name'], product_price=output[3]['price'], product_link=output[3]['link']);
                storeRecs();
                botMessageElement.textContent = message;
                chatMessages.appendChild(botMessageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                chatMessages.removeChild(loadingText);
            })
            .catch(error => {
                message = "Sorry, I spazzed out there for a second. Could you say that again?";
                console.log(error);
                botMessageElement.textContent = message;
                chatMessages.appendChild(botMessageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                chatMessages.removeChild(loadingText);
            });
    }
}

function clearRecommendations() {
    var elementsToRemove = document.querySelectorAll('.recommendation');

    for (var i = 0; i < elementsToRemove.length; i++) {
        var element = elementsToRemove[i];
        element.parentNode.removeChild(element);
    }
}

function addRecommendation(image_link="https://cdn.shoplightspeed.com/shops/639523/files/54751377/465x620x2/sb2-spelman-jacket.jpg",
                            product_title="SB2 Spelman Jacket Astafirullagh",
                            product_price="$349.00",
                            product_link="https://www.leagueofrebels.com/sb2-spelman-jacket.html") {
    const browsingArea = document.getElementById("browsing-area");
    const recElement = document.createElement("a");
    recElement.classList.add("recommendation");
    recElement.href = product_link;
    recElement.target = "_blank";

    recElement.style.margin = '15px';
    recElement.style.backgroundColor = '#f0eee9';
    recElement.style.width = '42%';
    recElement.style.height = '50%';
    recElement.style.borderRadius = '5px';
    recElement.style.boxShadow = '0 4px 10px -2px black';
    recElement.style.textDecoration = 'none';

    const image = document.createElement("img");
    image.classList.add("recommendation_image");
    image.src = image_link;
    image.style.width = '100%';
    image.style.height = '80%';

    const title = document.createElement("div");
    title.classList.add("recommendation_info");
    title.textContent = product_title ;
    title.style.fontFamily = 'Arial Black, Times, serif';
    title.style.fontSize = '16px';
    title.style.marginLeft = '3px';
    title.style.overflow = 'hidden';
    title.style.textOverflow = 'ellipsis';
    title.style.whiteSpace = 'nowrap';

    const price = document.createElement("div");
    price.classList.add("recommendation_info");
    price.textContent = product_price ;
    price.style.fontFamily = 'Arial Black, Times, serif';
    price.style.fontSize = '13px';
    price.style.marginLeft = '3px';
    price.style.overflow = 'hidden';
    price.style.textOverflow = 'ellipsis';
    price.style.whiteSpace = 'nowrap';

    recElement.appendChild(image);
    recElement.appendChild(title);
    recElement.appendChild(price);
    browsingArea.appendChild(recElement);
}

function closeWidget() {
    var widgetHTML = `
        <button id="open-button" onclick="openWidget()"><img src="https://cdn-icons-png.flaticon.com/512/24/24883.png" width="70" height="100"></button>
    `
    widget.innerHTML = widgetHTML;
    widget.style.all = 'initial';
    widget.style.backgroundColor = 'transparent';
    widget.style.position = 'fixed';
    widget.style.height = '100px';
    widget.style.width = '100px';
    widget.style.bottom = '20px';
    widget.style.right = '20px';
    widget.style.borderRadius = '3px';
    widget.style.zIndex = '2147483647';

    var openButton = document.getElementById('open-button');
    openButton.style.borderRadius = '100px';
    openButton.style.border = '0px solid';
    openButton.style.width = '100%';
    openButton.style.height = '100%';
    openButton.style.cursor = 'pointer';
    openButton.style.backgroundColor = '#f6ead1';
    openButton.addEventListener('mouseover', function() {openButton.style.backgroundColor = '#b8aa85';});
    openButton.addEventListener('mouseout', function() {openButton.style.backgroundColor = '#f6ead1';});
}

function openWidget() {
    var widgetHTML = `
    <div id="browsing-panel">
        <div id="browsing-header">Recommendations</div>
        <div id="browsing-area"></div>
        <div id="bottom-text">Responds within 2-3 seconds · jacques.ai.stylist@gmail.com</div>
    </div>
    <div id='chatbot'>
        <div id="chat-header">
            <div id="chat-title">Jacques, the AI Stylist</div>
            <button id="close-button" onclick="closeWidget()"></button>
        </div>
        <div id="chat-messages"></div>
        <div id="chat-input">
            <input type="text" id="user-input" placeholder="Type your message..." onkeydown="handleUserInput(event)">
            <button id="send-button" onclick="sendMessage()"><img src="https://cdn-icons-png.flaticon.com/512/60/60525.png" width="16" height="16"></button>
        </div>
    </div>
    `;
    widget.style.position = 'fixed';
    widget.style.bottom = '20px';
    widget.style.right = '20px';
    widget.style.height = '600px';
    widget.style.width = '800px';
    widget.style.border = '1px solid #ccc';
    widget.style.borderRadius = '10px';
    widget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    widget.style.display = 'grid';
    widget.style.gridTemplateColumns = '1fr 1fr';
    widget.style.gridAutoRows = '100%';
    widget.style.zIndex = '2147483647';
    widget.innerHTML = widgetHTML;

    // Browsing Panel CSS
    var browsingPanel = document.getElementById('browsing-panel');
    browsingPanel.style.backgroundColor = '#f0ede5';
    browsingPanel.style.display = 'flex';
    browsingPanel.style.flexDirection = 'column';

    var browsingHeader = document.getElementById('browsing-header');
    browsingHeader.style.padding = '10px';
    browsingHeader.style.color = 'black';
    browsingHeader.style.fontSize = '17px';
    browsingHeader.style.boxShadow = '0 4px 2px -2px gray';
    browsingHeader.style.position = 'relative';
    browsingHeader.style.fontFamily = 'Arial Black, Times, serif';

    var browsingArea = document.getElementById('browsing-area');
    browsingArea.style.height = '100%';
    browsingArea.style.overflowY = 'auto';
    browsingArea.style.display = 'flex';
    browsingArea.style.flexWrap = 'wrap';

    var bottomText = document.getElementById('bottom-text');
    bottomText.style.textAlign = 'center';
    bottomText.style.color = 'gray';
    bottomText.style.fontSize = '12px';

    // Chatbot CSS
    var chatbot = document.getElementById('chatbot');
    chatbot.style.backgroundColor = 'rgb(30,30,30)';
    chatbot.style.display = 'flex';
    chatbot.style.flexDirection = 'column';

    var chatHeader = document.getElementById('chat-header');
    chatHeader.style.backgroundColor = 'black';
    chatHeader.style.padding = '10px';
    chatHeader.style.color = 'white';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.fontSize = '17px';
    chatHeader.style.boxShadow = '0 4px 2px -2px gray';
    chatHeader.style.fontFamily = 'Arial Black, Times, serif';

    var closeButton = document.getElementById('close-button');
    closeButton.style.width = '6%';
    closeButton.style.cursor = 'pointer';
    closeButton.style.border = '1px solid';
    closeButton.style.borderRadius = '10px';
    closeButton.style.backgroundColor = '#ed4040';
    closeButton.addEventListener('mouseover', function() {closeButton.style.backgroundColor = '#d12424';});
    closeButton.addEventListener('mouseout', function() {closeButton.style.backgroundColor = '#ed4040';});

    var chatMessages = document.getElementById('chat-messages');
    chatMessages.style.padding = '10px';
    chatMessages.style.overflowY = 'auto';
    chatMessages.style.flexGrow = '1';

    var inputArea = document.getElementById('chat-input');
    inputArea.style.position = 'relative';
    inputArea.style.padding = '5px';
    inputArea.style.display = 'flex';
    inputArea.style.justifyContent = 'space-between';

    var inputBox = document.getElementById('user-input');
    inputBox.style.width = '83%';
    inputBox.style.padding = '3% 2%';
    inputBox.style.backgroundColor = 'rgb(60,60,60)';
    inputBox.style.color = 'white';
    inputBox.style.border = '1px solid';

    var sendButton = document.getElementById('send-button');
    sendButton.style.padding = '3%';
    sendButton.style.cursor = 'pointer';

    if (messageData.length == 0) {
        BotResponse(user_response = 0, mandatory_response = "Welcome to the League of Rebels store ~ I'm Jacques, an AI suit connoisseur. What are you looking for today?");
        storeMessage("Welcome to the League of Rebels store ~ I'm Jacques, an AI suit connoisseur. What are you looking for today?", 'bot');
    }
    else {
        console.log(messageData.length);
        for (var message of messageData) {
            if (message.sender == 'bot') {
                console.log('loading bot message...' + message.content);
                BotResponse(user_response = 0, mandatory_response = String(message.content));
            }
            else if (message.sender == 'user') {
                console.log('loading user message...' + message.content);
                sendMessage(mandatory_response = String(message.content));
            }
        }
    }
    for (var rec of recommendationData) {
        addRecommendation(rec.image_link, rec.name, rec.price);
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    if (window.innerWidth >= 1024) {
        closeWidget();
    }
});