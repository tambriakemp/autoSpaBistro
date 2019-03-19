let STATE = {};
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onReady);

function onReady() {
  updateAuthenticatedUI();

  STATE.authUser = CACHE.getAuthenticatedUserFromCache();
  pastSubmittedTestimonies();
  $("body").on("click", "#logout-btn", onLogoutBtnClick);
  $("#testimony-form").on("submit", onCreateSubmit);
  $("body").on("click", "#delete-testimony", onDeleteTestimony);
  $("body").on("click", "#edit-testimony", onEditTestimony);
  $("body").on("submit", "#testimony-edit-form", onSubmitEditTestimony);
  $("body").on("click", ".refresh", pastSubmittedTestimonies);

  loggedinUser();
}

// LOGOUT USER BUTTON ==========================================
function onLogoutBtnClick(event) {
  const confirmation = confirm("Are you sure you want to logout?");
  if (confirmation) {
    CACHE.deleteAuthenticatedUserFromCache();
    window.open("/", "_self");
  }
}

// LOGGED IN USER ==========================================
function loggedinUser() {
  $(".loggedin-user").append(`Welcome ${STATE.authUser.name}!`);
}

// SUBMIT NEW TESTIMONY ==========================================
function onCreateSubmit(event) {
  event.preventDefault();
  const newTestimony = {
    userTestimony: $("#userTestimony").val(),
    userDisplayName: $("#userDisplayName").val()
  };
  HTTP.createTestimony({
    authToken: STATE.authUser.authToken,
    newTestimony: newTestimony,
    onSuccess: function() {
      $(".notification").html(` Testimony was submitted successfully`);
      pastSubmittedTestimonies();
    },
    onError: err => {
      $(".notification").html(
        `ERROR: Testimony was not submitted successfully`
      );
    }
  });
}

// PAST SUBMITTED TESTIMONIES ==========================================
function pastSubmittedTestimonies(event) {
  const testimonies = HTTP.getUserTestimonies({
    authToken: STATE.authUser.authToken,
    onSuccess: function(data) {
      $(".testimony-list").html("");
      for (let i = 0; i < data.length; i++) {
        $(".testimony-list").append(`
                  <tr id="user-testimony" data-note-id="${data[i].id}">
                  <td class="user-edit-testimony">${data[i].userTestimony}</td>
                  <td class="user-display-name">${data[i].userDisplayName}</td>
                  <td><a href id="edit-testimony"><img class="icon" src="/images/pencil.svg"></a></td> 
                  <td><a href id="delete-testimony"><img class="icon" src="/images/trash.svg"></a></td>
              </tr>
          `);
      }
    },
    onError: function() {
      console.log("error");
    }
  });
}

// EDIT TESTIMONY BUTTON ==========================================
function onEditTestimony(event) {
  event.preventDefault();

  const testimonyID = $(event.currentTarget)
    .parent()
    .parent()
    .attr("data-note-id");

  const userEditTestimony = $(event.currentTarget)
    .parent()
    .parent()
    .children(".user-edit-testimony")
    .text();

  const userDisplayName = $(event.currentTarget)
    .parent()
    .parent()
    .children(".user-display-name")
    .text();

  $(".user-testimony-forms").html(`
            <form id="testimony-edit-form" data-note-id="${testimonyID}">
            <textarea name="userTestimony" id="userTestimony">${userEditTestimony}</textarea>
            <input type="text" id="userDisplayName" name="userDisplayName" value="${userDisplayName}" placeholder="Choose Display Name">
            <input type="submit" value="Edit Testimony">
            </form>`);
  $(window).scrollTop($(".user-testimony-forms").offset().top);
}

// SUBMIT EDIT TESTIMONY ==========================================
function onSubmitEditTestimony(event) {
  event.preventDefault();

  const updateTestimony = {
    userTestimony: $("#userTestimony").val(),
    userDisplayName: $("#userDisplayName").val(),
    testimonyID: $(event.target).attr("data-note-id")
  };

  HTTP.updateTestimony({
    testimonyID: updateTestimony.testimonyID,
    authToken: STATE.authUser.authToken,
    updateTestimony: updateTestimony,
    onSuccess: function() {
      $(".notification").html(` Testimony was edited successfully`);
      pastSubmittedTestimonies();
    },
    onError: err => {
      $(".notification").html(`ERROR: Testimony was not updated successfully`);
    }
  });

  $(".user-testimony-forms").html(`
    <form id="testimony-form">
    <textarea name="userTestimony" id="userTestimony"></textarea>
    <input type="userDisplayName" id="userDisplayName" name="userDisplayName" placeholder="Choose Display Name">
    <input type="submit">
    </form>`);
}

// DELETE TESTIMONY ==========================================
function onDeleteTestimony(event) {
  event.preventDefault();

  const testimonyID = $(event.currentTarget)
    .parent()
    .parent()
    .attr("data-note-id");
  const userSaidYes = confirm(
    "Are you sure you want to delete this testimony?"
  );
  if (userSaidYes) {
    HTTP.deleteTestimony({
      testimonyID: testimonyID,
      authToken: STATE.authUser.authToken,
      onSuccess: function() {
        location.reload();
      }
    });
  }
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
