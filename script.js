let selectedMode = '';

function showForm(mode) {
    selectedMode = mode;
    const form = document.getElementById('authForm');
    const extras = document.getElementById('extraFields');
    const passField = document.getElementById('password');
    const btns = document.querySelectorAll('.nav-btn');
    
    form.classList.remove('hidden');
    btns.forEach(b => b.classList.remove('active-btn'));
    
    // Highlight the selected button
    event.currentTarget.classList.add('active-btn');

    extras.innerHTML = '';
    passField.classList.remove('hidden');
    passField.required = true;

    if (mode === 'register') {
        document.getElementById('formTitle').innerText = "Create Account";
        extras.innerHTML = '<input type="text" id="fname" placeholder="First Name" required>' +
                          '<input type="text" id="lname" placeholder="Last Name" required>';
    } else if (mode === 'login') {
        document.getElementById('formTitle').innerText = "Existing User Login";
    } else if (mode === 'guest') {
        document.getElementById('formTitle').innerText = "Continue as Guest";
        passField.classList.add('hidden');
        passField.required = false;
        extras.innerHTML = '<input type="text" id="fname" placeholder="Display Name (Optional)">';
    }
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Capture data
    const payload = {
        intent: selectedMode,
        user_info: {
            first_name: document.getElementById('fname')?.value || 'Guest',
            last_name: document.getElementById('lname')?.value || '',
            email: document.getElementById('email').value,
            login_date: new Date().toLocaleDateString()
        }
    };

    // 1. Store locally so it persists for next time
    localStorage.setItem('surescripts_user', JSON.stringify(payload));
    
    // 2. Redirect to the new page
    window.location.href = 'workbench.html';
});
