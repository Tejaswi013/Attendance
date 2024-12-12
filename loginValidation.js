async function validateLogin(username, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            return true; // Login successful
        } else {
            return false; // Login failed
        }
    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}
