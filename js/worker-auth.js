// Import Firebase authentication
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Get DOM elements
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email:', email);
    
    try {
        // Clear any previous errors
        errorMessage.classList.add('d-none');
        console.log('Attempting to sign in...');
        
        // Attempt to sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', userCredential.user.email);
        
        // If login successful, redirect to dashboard
        console.log('Redirecting to dashboard...');
        window.location.href = '/worker/dashboard.html';
    } catch (error) {
        // Handle specific error cases
        let errorText = 'Login failed. Please try again.';
        
        switch (error.code) {
            case 'auth/invalid-email':
                errorText = 'Invalid email address.';
                break;
            case 'auth/user-disabled':
                errorText = 'This account has been disabled.';
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorText = 'Invalid email or password.';
                break;
        }
        
        showError(errorText);
    }
});

// Function to display error messages
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}
