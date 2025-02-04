import { supabase } from '../utils/supabase';
import { getUniqueUserId } from '../utils/user';

export function createAuthForm() {
  let isLogin = true;

  const formHtml = `
    <div style="padding: 24px;">
      <div style="margin-bottom: 24px; text-align: center;">
        <div style="display: flex; gap: 2px; border-radius: 6px; background: #f3f4f6; padding: 2px; margin-bottom: 24px;">
          <button id="login-tab" style="
            flex: 1;
            padding: 8px;
            border: none;
            border-radius: 4px;
            font-size: 14px !important;
            font-weight: 500 !important;
            background: white;
            color: #2D3648;
            cursor: pointer;
          ">Login</button>
          <button id="register-tab" style="
            flex: 1;
            padding: 8px;
            border: none;
            border-radius: 4px;
            font-size: 14px !important;
            font-weight: 500 !important;
            background: transparent;
            color: #6B7280;
            cursor: pointer;
          ">Register</button>
        </div>
        <h3 style="
          color: #2D3648;
          font-size: 20px !important;
          font-weight: 600 !important;
          margin-bottom: 8px;
          line-height: 1.2 !important;
          letter-spacing: normal !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        ">Login to your account to activate your donations</h3>
      </div>
      <form id="auth-form">
        ${!isLogin ? `
          <div style="display: flex; gap: 8px; margin-bottom: 16px;">
            <input type="text" id="firstName" placeholder="First Name" required style="
              flex: 1;
              padding: 8px 12px;
              border: 1px solid #E5E7EB;
              border-radius: 6px;
              font-size: 14px !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            ">
            <input type="text" id="lastName" placeholder="Last Name" required style="
              flex: 1;
              padding: 8px 12px;
              border: 1px solid #E5E7EB;
              border-radius: 6px;
              font-size: 14px !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            ">
          </div>
        ` : ''}
        <div style="margin-bottom: 16px;">
          <input type="email" id="email" placeholder="Email" required style="
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #E5E7EB;
            border-radius: 6px;
            font-size: 14px !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          ">
        </div>
        <div style="margin-bottom: 24px;">
          <input type="password" id="password" placeholder="Password" required style="
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #E5E7EB;
            border-radius: 6px;
            font-size: 14px !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          ">
        </div>
        <button type="submit" style="
          width: 100%;
          background: #e11d48;
          color: white;
          padding: 12px;
          border-radius: 6px;
          font-weight: 600 !important;
          font-size: 14px !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          border: none;
          cursor: pointer;
        ">Login</button>
      </form>
      <div id="error-message" style="
        color: #e11d48;
        font-size: 14px !important;
        margin-top: 16px;
        text-align: center;
        display: none;
      "></div>
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
        loginTab.style.background = isLogin ? 'white' : 'transparent';
        loginTab.style.color = isLogin ? '#2D3648' : '#6B7280';
        registerTab.style.background = !isLogin ? 'white' : 'transparent';
        registerTab.style.color = !isLogin ? '#2D3648' : '#6B7280';
        submitButton.textContent = isLogin ? 'Login' : 'Register';

        // Update form fields
        const nameFields = form.querySelector('#name-fields');
        if (nameFields) {
          nameFields.remove();
        }

        if (!isLogin) {
          const emailInput = form.querySelector('#email');
          const nameFieldsHtml = `
            <div id="name-fields">
              <div style="margin-bottom: 16px;">
                <input type="text" id="firstName" placeholder="First Name" required style="
                  width: 100%;
                  padding: 8px 12px;
                  border: 1px solid #E5E7EB;
                  border-radius: 6px;
                  font-size: 14px !important;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                ">
              </div>
              <div style="margin-bottom: 16px;">
                <input type="text" id="lastName" placeholder="Last Name" required style="
                  width: 100%;
                  padding: 8px 12px;
                  border: 1px solid #E5E7EB;
                  border-radius: 6px;
                  font-size: 14px !important;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                ">
              </div>
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
          submitButton.style.opacity = '0.7';
          errorMessage.style.display = 'none';

          if (isLogin) {
            const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;

            // Check if user profile exists
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single();

            // If no profile exists, create one (this happens after email confirmation)
            if (!profile) {
              const userId = await getUniqueUserId();
              let name = user.email;
              try {
                const storedData = localStorage.getItem(`pending_registration_${user.email}`);
                if (storedData) {
                  const { firstName, lastName } = JSON.parse(storedData);
                  name = `${firstName} ${lastName}`;
                }
              } catch (e) {
                console.log('Error parsing stored registration data:', e);
              }
              
              const { error: profileError } = await supabase
                .from('users')
                .insert({
                  id: user.id,
                  user_id: userId,
                  email: user.email,
                  name: name,
                });
              if (profileError) throw profileError;
              localStorage.removeItem(`pending_registration_${user.email}`);
            }
          } else {
            const firstName = (form.querySelector('#firstName') as HTMLInputElement).value;
            const lastName = (form.querySelector('#lastName') as HTMLInputElement).value;
            const { data: { user }, error: signUpError } = await supabase.auth.signUp({ email, password });
            
            // Check if it's a critical error
            if (signUpError) {
              // These are non-critical errors we want to ignore
              const nonCriticalErrors = [
                'Email rate limit exceeded',  // Rate limiting
                'Email confirmation required', // Expected with email confirmation
                'A confirmation email has been sent' // Also expected
              ];
              
              // Log the error for debugging
              console.log('Signup response:', { user, error: signUpError });
              
              // Only throw if it's a critical error
              if (!nonCriticalErrors.some(msg => signUpError.message?.includes(msg))) {
                throw signUpError;
              }
            }
            
            // Store the registration data in localStorage
            const registrationData = {
              firstName,
              lastName,
              email
            };
            localStorage.setItem(`pending_registration_${email}`, JSON.stringify(registrationData));
            
            // Show confirmation message
            errorMessage.style.color = '#10b981';
            errorMessage.textContent = 'Please check your email to confirm your account';
            errorMessage.style.display = 'block';
            submitButton.disabled = true;
            return; // Don't refresh the page
          }

          // Refresh the page to update the UI
          window.location.reload();
        } catch (error: any) {
          errorMessage.textContent = error.message || 'An error occurred';
          errorMessage.style.display = 'block';
        } finally {
          submitButton.disabled = false;
          submitButton.style.opacity = '1';
        }
      });
    }
  };
}
