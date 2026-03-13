let selectedMode = '';

// MOCK BACKEND: Pulls the "Database" of users from storage
function getRegistry() {
    return JSON.parse(localStorage.getItem('user_registry') || '[]');
}

// Show the relevant form based on user choice
function showForm(mode) {
    selectedMode = mode;
    const form = document.getElementById('authForm');
    const extras = document.getElementById('extraFields');
    const title = document.getElementById('formActionTitle');
    const btns = document.querySelectorAll('.nav-btn');
    
    form.classList.remove('hidden');
    btns.forEach(b => b.classList.remove('active-btn'));
    
    if (mode === 'register') {
        title.innerText = "Create Your Account";
        extras.innerHTML = '<input type="text" id="fullname" placeholder="Full Name" required>';
    } else {
        title.innerText = "Login to Workbench";
        extras.innerHTML = '';
    }
}

// GUEST PATH: Immediate redirect, no credentials needed
function handleGuest() {
    const guestSession = { name: "Guest User", email: "guest@surescripts.com", isGuest: true };
    localStorage.setItem('active_session', JSON.stringify(guestSession));
    window.location.href = 'workbench.html';
}

// FORM HANDLING: Registration and Login Logic
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const registry = getRegistry();

    if (selectedMode === 'register') {
        const name = document.getElementById('fullname').value;
        
        // Prevent duplicate emails
        if (registry.find(u => u.email === email)) {
            alert("This email is already registered. Please login.");
            return;
        }

        // 1. Store in "Backend" (Registry)
        const newUser = { name, email, password };
        registry.push(newUser);
        localStorage.setItem('user_registry', JSON.stringify(registry));

        // 2. Automatically log them in (Session)
        localStorage.setItem('active_session', JSON.stringify(newUser));
        window.location.href = 'workbench.html';
    } 
    
    else if (selectedMode === 'login') {
        // Find user and verify password
        const user = registry.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Success: create session and redirect
            localStorage.setItem('active_session', JSON.stringify(user));
            window.location.href = 'workbench.html';
        } else {
            alert("Error: Invalid email or password. Please check your credentials.");
        }
    }
});
