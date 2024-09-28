const responses = {
    "hello": "Hi there! How can I assist you today?",
    "coding hubs": "Here you will get Notes, Ebooks, project source Code, Interview questions. Visit Coding Hubs.<a href='https://thecodinghubs.com' target='_blank'>Visit Website</a>",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "how are you?": "I'm just a bot, but I'm here to help you!",
    "need help": "How can I help you today?",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Want to connect with an expert?",
    "expert": "Great! Please wait a moment while we connect you with an expert.",
    "no": "Okay, if you change your mind, just let me know!",
    "thanks": "You're welcome! If you have any more questions, feel free to ask.",
    "cradit": "This Website and Chatbot Created by Sanjib Kobir",
    "hi": "Hello! How can I assist you today?",
    "good morning": "Good morning! Hope you have a wonderful day!",
    "good night": "Good night! Sleep well!",
    "what is your name": "I'm your helpful chatbot, created to assist you!",
    "who created you": "I was created by Sanjib Kobir.",
    "what is html": "HTML stands for HyperText Markup Language, which is used to structure web content.",
    "what is css": "CSS stands for Cascading Style Sheets, used to style and layout web pages.",
    "what is javascript": "JavaScript is a programming language used to make web pages interactive.",
    "contact": "You can reach Sanjib Kobir via email at sanjibkobir@example.com.",
    "portfolio": "Check out Sanjib Kobir's portfolio here: <a href='https://sanjibkobir.com' target='_blank'>Visit Portfolio</a>",
    "about coding": "Coding involves writing instructions for computers using programming languages like HTML, CSS, and JavaScript.",
    "services": "We offer web development, app design, SEO, and e-commerce solutions. Feel free to ask more!",
    "projects": "Visit our projects section to explore recent works. <a href='https://sanjibkobir.com/projects' target='_blank'>Visit Projects</a>",
    "blog": "Check out our blog for the latest updates and tutorials. <a href='https://sanjibkobir.com/blog' target='_blank'>Visit Blog</a>",
    "help": "Sure, let me know what assistance you need!",
    "learn": "You can learn web development from our tutorials. What topic are you interested in?",
};

document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
document.getElementById('close-btn').addEventListener('click', toggleChatbot);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Suggestion related variables
const userInputElement = document.getElementById('user-input');
const suggestionsList = document.getElementById('suggestionsList');

// Event listener for input changes
userInputElement.addEventListener('keyup', () => {
    const inputValue = userInputElement.value.trim().toLowerCase();
    showSuggestions(inputValue);
});

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    const toggleButton = document.getElementById('chatbot-toggle-btn');
    if (chatbotPopup.style.display === 'none' || chatbotPopup.style.display === '') {
        chatbotPopup.style.display = 'block';
        toggleButton.textContent = 'CLOSE CHAT';
    } else {
        chatbotPopup.style.display = 'none';
        toggleButton.textContent = 'START CHAT';
    }
}

function sendMessage() {
    let userInput = userInputElement.value.trim().toLowerCase(); // ছোট অক্ষরে কনভার্ট করা হয়েছে
    if (userInput !== '') {
        appendMessage('user', userInputElement.value.trim()); // আসল ইনপুট দেখানো হবে
        respondToUser(userInput);
        userInputElement.value = '';
        suggestionsList.style.display = 'none'; // সাজেশন লিস্ট হাইড করা
    }
}

function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function() {
        appendMessage('bot', response);
    }, 500);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === 'bot' && message === responses["default"]) {
        const buttonYes = document.createElement('button');
        buttonYes.textContent = '✔ Yes';
        buttonYes.onclick = function() {
            appendMessage('bot', responses["expert"]);
        };
        const buttonNo = document.createElement('button');
        buttonNo.textContent = '✖ No';
        buttonNo.onclick = function() {
            appendMessage('bot', responses["no"]);
        };
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        chatBox.appendChild(buttonContainer);
    }
}

// Function to show suggestions
function showSuggestions(inputValue) {
    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    // Get all keys from responses
    const possibleQuestions = Object.keys(responses);

    // Filter questions based on input
    const filteredQuestions = possibleQuestions.filter(question =>
        question.toLowerCase().includes(inputValue)
    );

    // Show the filtered suggestions
    if (inputValue && filteredQuestions.length > 0) {
        suggestionsList.style.display = 'block';
        filteredQuestions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = question;
            li.addEventListener('click', () => {
                userInputElement.value = question;  // Set clicked suggestion in the input box
                suggestionsList.style.display = 'none';  // Hide suggestions after click
                userInputElement.focus(); // Keep focus on input
            });
            suggestionsList.appendChild(li);
        });
    } else {
        suggestionsList.style.display = 'none';  // Hide if no suggestions
    }
}
