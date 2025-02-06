import { authService } from '../services/auth';
import { auth } from '../utils/firebase';
import { createDonationPopup, showSuccessState, initialize } from './index';

export function createAuthForm(successMessage?: string) {
  let isLogin = true;

  const formHtml = `
    <div class="kindly-content">
      ${successMessage ? `
        <div class="kindly-success">
          <svg class="kindly-success-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>Success!</h3>
          <p>${successMessage}</p>
        </div>
      ` : ''}
      <h2 class="kindly-headline">Login to activate your charity donation for this merchant</h2>
      <form id="auth-form" class="kindly-auth-form">
        <div class="kindly-tabs">
          <button type="button" id="login-tab" class="kindly-tab active">Sign In</button>
          <button type="button" id="register-tab" class="kindly-tab">Register</button>
        </div>
        ${!isLogin ? `
          <div class="kindly-form-row">
            <input type="text" id="firstName" placeholder="First Name" required class="kindly-input">
            <input type="text" id="lastName" placeholder="Last Name" required class="kindly-input">
          </div>
        ` : ''}
        <input type="email" id="email" placeholder="Email" required class="kindly-input">
        <input type="password" id="password" placeholder="Password" required class="kindly-input">
        <button type="submit" class="kindly-button kindly-button-primary">
          ${isLogin ? 'Sign In' : 'Register'}
        </button>
      </form>
      <div id="error-message" class="kindly-error" style="display: none;"></div>
    </div>
  `;

  return {
    html: formHtml,
    setupListeners: (container: HTMLElement) => {
      const loginTab = container.querySelector('#login-tab') as HTMLButtonElement;
      const registerTab = container.querySelector('#register-tab') as HTMLButtonElement;
      const form = container.querySelector('#auth-form') as HTMLFormElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const errorMessage = container.querySelector('#error-message') as HTMLDivElement;

      const updateForm = () => {
        // Update tab styles
        loginTab.className = `kindly-tab ${isLogin ? 'active' : ''}`;
        registerTab.className = `kindly-tab ${!isLogin ? 'active' : ''}`;
        submitButton.textContent = isLogin ? 'Sign In' : 'Create Account';

        // Update form fields
        const nameFields = form.querySelector('#name-fields');
        if (nameFields) {
          nameFields.remove();
        }

        if (!isLogin) {
          const emailInput = form.querySelector('#email');
          const nameFieldsHtml = `
            <div id="name-fields" class="kindly-form-row">
              <input type="text" id="firstName" placeholder="First Name" required class="kindly-input">
              <input type="text" id="lastName" placeholder="Last Name" required class="kindly-input">
            </div>
          `;
          emailInput.insertAdjacentHTML('beforebegin', nameFieldsHtml);
        }
      };

      loginTab.addEventListener('click', () => {
        isLogin = true;
        updateForm();
      });

      registerTab.addEventListener('click', () => {
        isLogin = false;
        updateForm();
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (form.querySelector('#email') as HTMLInputElement).value;
        const password = (form.querySelector('#password') as HTMLInputElement).value;

        try {
          submitButton.disabled = true;
          submitButton.classList.add('opacity-70');
          errorMessage.classList.add('hidden');

          if (isLogin) {
            const user = await authService.login(email, password);
            console.log('Kindly DEBUG: Login successful:', user);
            
            // Wait for auth state to be properly stored and verified
            let maxAttempts = 5;
            let authState = null;
            
            while (maxAttempts > 0 && !authState) {
              await new Promise(resolve => setTimeout(resolve, 200));
              
              // First check storage directly
              const stored = await chrome.storage.local.get(['kindlyAuthState']);
              if (stored.kindlyAuthState) {
                authState = stored.kindlyAuthState;
                console.log('Kindly DEBUG: Found auth state in storage:', authState);
                break;
              }
              
              // Then try background script
              authState = await new Promise(resolve => {
                chrome.runtime.sendMessage({ type: 'GET_AUTH_STATE' }, response => {
                  console.log('Kindly DEBUG: Auth state check attempt:', response);
                  resolve(response?.user || null);
                });
              });
              
              maxAttempts--;
            }
            
            if (!authState) {
              throw new Error('Failed to verify auth state after login');
            }
            
            console.log('Kindly DEBUG: Auth state verified after login:', authState);
            
            // Remove existing popup
            const popup = document.querySelector('#kindly-popup');
            if (popup) {
              console.log('Kindly DEBUG: Removing old popup');
              popup.remove();
            }
            
            // Force a small delay to ensure storage is synced
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Re-initialize now that we're sure auth state is stored
            console.log('Kindly DEBUG: Starting re-initialization');
            await initialize();
            
            // Force show success state
            await showSuccessState(currentMerchant);
          } else {
            const firstName = (form.querySelector('#firstName') as HTMLInputElement).value;
            const lastName = (form.querySelector('#lastName') as HTMLInputElement).value;
            const name = `${firstName} ${lastName}`;
            const user = await authService.register(email, password, name);
            console.log('Kindly DEBUG: Registration successful:', user);
            
            // Remove existing popup
            const popup = document.querySelector('#kindly-popup');
            if (popup) {
              console.log('Kindly DEBUG: Removing old popup');
              popup.remove();
            }
            
            // Show donation popup immediately
            await createDonationPopup();
          }
        } catch (error: any) {
          errorMessage.textContent = error.message || 'An error occurred';
          errorMessage.classList.remove('hidden');
        } finally {
          submitButton.disabled = false;
          submitButton.classList.remove('opacity-70');
        }
      });
    }
  };
}
