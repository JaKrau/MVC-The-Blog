const loginFormHandler = async (event) => {
  event.preventDefault();

 
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/feed');
    } else {
      alert('Incorrect username or password');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/feed');
    } else {
      alert('Incorrect username or password');
    }
  }
};

const login_form = document.querySelector('#login_form');

login_form.addEventListener('submit', loginFormHandler);

const signup_form = document.querySelector('#signup_form');

signup_form.addEventListener('submit', signupFormHandler);

document.querySelector('#new_user_signup').addEventListener('click', (e) => {
  e.preventDefault();
  if (signup_form.style.display === 'none') {
    signup_form.style.display = 'flex';
    login_form.style.display = 'none';
  }
});

document
  .querySelector('#already_have_account')
  .addEventListener('click', (e) => {
    e.preventDefault();
    if (login_form.style.display === 'none') {
      signup_form.style.display = 'none';
      login_form.style.display = 'flex';
    }
  });
