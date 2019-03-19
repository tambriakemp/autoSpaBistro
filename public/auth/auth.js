let STATE = {};
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
  updateAuthenticatedUI();
  $("#sign-up-form").submit(onSignUpSubmit);
  $("#login-form").submit(onLoginSubmit);
}

// LOGOUT USER BUTTON ==========================================
function onLogoutBtnClick(event) {
  const confirmation = confirm("Are you sure you want to logout?");
  if (confirmation) {
    CACHE.deleteAuthenticatedUserFromCache();
    window.open("/", "_self");
  }
}

// REGISTER USER ==========================================
function onSignUpSubmit(event) {
  event.preventDefault();
  const userData = {
    name: $("#name").val(),
    email: $("#email").val(),
    username: $("#username")
      .val()
      .toLowerCase(),
    password: $("#password").val()
  };
  HTTP.signupUser({
    userData,
    onSuccess: user => {
      $(".notification").html(`Registration Successful. You may now login`);
    },
    onError: err => {
      $(".notification").html(
        `There was a problem processing your request, please try again. ${
          err.responseJSON.message
        }`
      );
    }
  });
}

// LOGIN USER  ==========================================
function onLoginSubmit(event) {
  event.preventDefault();

  const userData = {
    username: $("#username-login")
      .val()
      .toLowerCase(),
    password: $("#password-login").val()
  };
  HTTP.loginUser({
    userData,
    onSuccess: res => {
      const authenticatedUser = res.user;
      authenticatedUser.authToken = res.authToken;
      CACHE.saveAuthenticatedUserIntoCache(authenticatedUser);
      window.open("/dashboard/dashboard.html", "_self");
    },
    onError: err => {
      console.log(err);
      alert("Incorrect username or password. Please try again.");
    }
  });
}

// AUTHENTIC USER MENU ==========================================
function updateAuthenticatedUI() {
  const authUser = CACHE.getAuthenticatedUserFromCache();
  if (authUser) {
    STATE.authUser = authUser;
    $(".auth-menu").removeAttr("hidden");
  } else {
    $(".default-menu").removeAttr("hidden");
  }
}
