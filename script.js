let selectedMode = '';

// MOCK BACKEND: Pulls the "Database" of users from storage
const getRegistry = () => JSON.parse(localStorage.getItem('user_registry') || '[]');

function showForm(mode) {
    selectedMode = mode;
    const form = document.getElementById('authForm');
    const extras = document.getElementById('extraFields');
    const title = document.getElementById('formActionTitle');
    
    form.classList.remove('hidden');
    
    extras.innerHTML = '';
    if (mode === 'register') {
        title.innerText = "Register New User";
        extras.innerHTML = '<input type="text" id="fullname" placeholder="Full Name" required>';
    } else {
        title.innerText = "Login Existing User";
    }
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const registry = getRegistry();

    if (selectedMode === 'register') {
        const name = document.getElementById('fullname').value;
        
        if (registry.find(u => u.email === email)) {
            alert("This email is already registered. Please Login.");
            return;
        }

        // Store in "Permanent Backend"
        const newUser = { name, email, password };
        registry.push(newUser);
        localStorage.setItem('user_registry', JSON.stringify(registry));

        // Create Active Session
        localStorage.setItem('active_session', JSON.stringify(newUser));
        window.location.href = 'workbench.html';
    } 
    
    else if (selectedMode === 'login') {
        // Verify against "Backend"
        const user = registry.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('active_session', JSON.stringify(user));
            window.location.href = 'workbench.html';
        } else {
            alert("Error: Invalid email or password.");
        }
    }
});
