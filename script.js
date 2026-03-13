let selectedMode = '';

// Pulls our "Permanent Database" from localStorage
const getRegistry = () => JSON.parse(localStorage.getItem('user_registry') || '[]');

function showForm(mode) {
    selectedMode = mode;
    const form = document.getElementById('authForm');
    const extras = document.getElementById('extraFields');
    const title = document.getElementById('formActionTitle');
    const btns = document.querySelectorAll('.nav-btn');
    
    form.classList.remove('hidden');
    btns.forEach(b => b.classList.remove('active-btn'));

    extras.innerHTML = '';
    if (mode === 'register') {
        title.innerText = "Register New User";
        extras.innerHTML = '<input type="text" id="fullname" placeholder="Full Name" required>';
    } else {
        title.innerText = "Login Existing User";
    }
}

// THE GUEST PATH: Zero prompts, direct redirect
function handleGuest() {
    const guestData = {
        name: "Guest User",
        email: "guest@surescripts.com",
        role: "Guest"
    };
    // Set session so workbench knows it's a guest
    localStorage.setItem('active_session', JSON.stringify(guestData));
    window.location.href = 'workbench.html';
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const registry = getRegistry();

    if (selectedMode === 'register') {
        const name = document.getElementById('fullname').value;
        if (registry.find(u => u.email === email)) {
            alert("Email already registered!"); return;
        }
        const newUser = { name, email, password };
        registry.push(newUser);
        localStorage.setItem('user_registry', JSON.stringify(registry));
        localStorage.setItem('active_session', JSON.stringify(newUser));
        window.location.href = 'workbench.html';
    } 
    
    else if (selectedMode === 'login') {
        const user = registry.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('active_session', JSON.stringify(user));
            window.location.href = 'workbench.html';
        } else {
            alert("Error: User not found or incorrect password.");
        }
    }
});
