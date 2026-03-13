let selectedMode = '';

// Helper to get all registered users from "Database"
const getRegistry = () => JSON.parse(localStorage.getItem('surescripts_registry') || '[]');

function showForm(mode) {
    selectedMode = mode;
    const form = document.getElementById('authForm');
    const extras = document.getElementById('extraFields');
    const passField = document.getElementById('password');
    const btns = document.querySelectorAll('.nav-btn');
    
    form.classList.remove('hidden');
    btns.forEach(b => b.classList.remove('active-btn'));
    event.currentTarget.classList.add('active-btn');

    extras.innerHTML = '';
    passField.classList.remove('hidden');
    passField.required = true;

    if (mode === 'register') {
        extras.innerHTML = '<input type="text" id="fname" placeholder="Full Name" required>';
    } else if (mode === 'guest') {
        passField.classList.add('hidden');
        passField.required = false;
        extras.innerHTML = '<input type="text" id="fname" placeholder="Guest Display Name">';
    }
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const registry = getRegistry();

    if (selectedMode === 'register') {
        const name = document.getElementById('fname').value;
        // Check if user exists
        if (registry.some(u => u.email === email)) {
            alert("User already exists! Please Login.");
            return;
        }
        // Save to registry
        registry.push({ name, email, password });
        localStorage.setItem('surescripts_registry', JSON.stringify(registry));
        alert("Registration Successful! Now please login.");
        location.reload();
    } 
    
    else if (selectedMode === 'login') {
        const user = registry.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('active_session', JSON.stringify(user));
            window.location.href = 'workbench.html';
        } else {
            alert("Incorrect email or password.");
        }
    } 
    
    else if (selectedMode === 'guest') {
        const guestName = document.getElementById('fname').value || "Guest";
        localStorage.setItem('active_session', JSON.stringify({ name: guestName, email: email, isGuest: true }));
        window.location.href = 'workbench.html';
    }
});
