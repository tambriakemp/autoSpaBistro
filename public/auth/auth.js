// All these modules are are defined in /public/utilities
let STATE = {};
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
    updateAuthenticatedUI();
    $('#sign-up-form').submit(onSignUpSubmit);
    $('#login-form').submit(onLoginSubmit);
}

function onSignUpSubmit(event) {
    event.preventDefault();
    const userData = {
        name: $('#name').val(),
        email: $('#email').val(),
        username: $('#username').val().toLowerCase(),
        password: $('#password').val()
    };
    HTTP.signupUser({
        userData,
        onSuccess: user => {
            $('.notification').html(`Registration Successful. You may now login`);
        },
        onError: err => {
            $('.notification').html(`There was a problem processing your request, please try again.`);
        }
    });
}

function onLoginSubmit(event) {
    event.preventDefault();

    const userData = {
        username: $('#username-login').val().toLowerCase(),
        password: $('#password-login').val()
    };
    HTTP.loginUser({
        userData,
        onSuccess: res => {
            const authenticatedUser = res.user;
            authenticatedUser.authToken = res.authToken;
            CACHE.saveAuthenticatedUserIntoCache(authenticatedUser);
            window.open('/dashboard/dashboard.html', '_self');
        },
        onError: err => {
            alert('Incorrect username or password. Please try again.');
        }
    });
}

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();
    if (authUser) {
        STATE.authUser = authUser;
        // $('#nav-greeting').html(`Welcome, ${authUser.name}`);
        $('.auth-menu').removeAttr('hidden');
    } else {
        $('.default-menu').removeAttr('hidden');
    }
}