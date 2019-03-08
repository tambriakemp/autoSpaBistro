// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
    $('#sign-up-form').submit(onSignUpSubmit);
    $('#login-form').submit(onLoginSubmit);
    console.log('ready');
}

function onSignUpSubmit(event) {
    event.preventDefault();

    const userData = {
        name: $('#name').val(),
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val()
    };
    
    HTTP.signupUser({
        userData,
        onSuccess: user => {
            alert(`User "${user.username}" created, you may now log in.`);
            window.open('/login.html', '_self');
        },
        onError: err => {
            alert('There was a problem processing your request, please try again later.');
        }
    });
}

function onLoginSubmit(event) {
    event.preventDefault();

    const userData = {
        username: $('#username-login').val(),
        password: $('#password-login').val()
    };

    HTTP.loginUser({
        userData,
        onSuccess: res => {
            const authenticatedUser = res.user;
            console.log(authenticatedUser);
            authenticatedUser.authToken = res.authToken;
            CACHE.saveAuthenticatedUserIntoCache(authenticatedUser);
            alert('Login succesful, redirecting you to homepage ...');
            window.open('/dashboard.html', '_self');
        },
        onError: err => {
            alert('Incorrect username or password. Please try again.');
        }
    });

    console.log(userData); 

}