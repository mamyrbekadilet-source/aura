const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactTopic = document.getElementById('contactTopic');
const contactMessage = document.getElementById('contactMessage');
const contactStatus = document.getElementById('contactStatus');

function getMessages() {
    const raw = localStorage.getItem('messages');
    return raw ? JSON.parse(raw) : [];
}

function saveMessage(data) {
    const messages = getMessages();
    messages.push(data);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function showStatus(text, isSuccess = false) {
    contactStatus.textContent = text;
    contactStatus.classList.toggle('success', isSuccess);
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const message = contactMessage.value.trim();

    if (name.length < 2) {
        showStatus('Введите ваше имя.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Введите корректный email.');
        return;
    }

    if (message.length < 10) {
        showStatus('Сообщение должно быть не короче 10 символов.');
        return;
    }

    saveMessage({
        name,
        email,
        topic: contactTopic.value,
        message,
        date: new Date().toISOString()
    });

    showStatus('Сообщение отправлено. Мы ответим на ваш email.', true);
    contactForm.reset();
});
