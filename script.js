const form = document.getElementById('signupForm');
const emailInput = document.getElementById('emailInput');
const pswdInput = document.getElementById('pswdInput');
const pswdInput2 = document.getElementById('pswdInput2');
const errorMsg = document.getElementById('errorMsg');

function getUsers() {
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
}

function saveUser(email, password) {
    const users = getUsers();
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
}

function userExists(email) {
    return getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
}

function showMessage(text, isSuccess = false) {
    errorMsg.textContent = text;
    errorMsg.classList.toggle('success', isSuccess);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = pswdInput.value;
    const repeatPassword = pswdInput2.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage('Введите корректный email.');
        return;
    }

    if (password.length < 6) {
        showMessage('Пароль должен быть не короче 6 символов.');
        return;
    }

    if (password !== repeatPassword) {
        showMessage('Пароли не совпадают.');
        return;
    }

    if (userExists(email)) {
        showMessage('Пользователь с таким email уже зарегистрирован.');
        return;
    }

    saveUser(email, password);
    showMessage('Регистрация прошла успешно!', true);
    form.reset();
});
