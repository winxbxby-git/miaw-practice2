let selectedMode = '';

// The "Database" of all registered users
const getRegistry = () => JSON.parse(localStorage.getItem('user_registry') || '[]');

function showForm(mode) {
    selectedMode = mode;
    const form = document.getElementById('authForm');
    const extras = document.getElementById('extraFields');
    const title = document.getElementById('formActionTitle');
    const btns = document.querySelectorAll('.nav-btn');
    
    // UI Updates
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

// THE GUEST PATH: Zero prompts, immediate redirect
function handleGuest() {
    console.log("Guest path triggered");
    const guestData = {
        name: "Guest User",
        email: "guest@surescripts.com"
    };
    // Save as current session
    localStorage.setItem('active_session', JSON.stringify(guestData));
    // Move to workbench
    window.location.href = 'workbench.html';
}

// Handle Form Submission for New/Existing Users
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
        // Save to permanent "Database"
        const newUser = { name, email, password };
        registry.push(newUser);
        localStorage.setItem('user_registry', JSON.stringify(registry));
        
        // Start Session
        localStorage.setItem('active_session', JSON.stringify(newUser));
        window.location.href = 'workbench.html';
    } 
    
    else if (selectedMode === 'login') {
        // Verify against permanent "Database"
        const user = registry.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('active_session', JSON.stringify(user));
            window.location.href = 'workbench.html';
        } else {
            alert("Error: Incorrect credentials or user does not exist.");
        }
    }
});
