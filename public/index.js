'use strict'
let STATE = {};

const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
  updateAuthenticatedUI();
  loadTestimonyCarousel();
  $('body').on('click', '#logout-btn', onLogoutBtnClick);
}

// LOGOUT USER BUTTON ==========================================
function onLogoutBtnClick(event) {
  const confirmation = confirm('Are you sure you want to logout?');
  if (confirmation) {
      CACHE.deleteAuthenticatedUserFromCache();
      window.open('/', '_self');
  }
}
// TESTIMONIAL SLIDER =============================================//
function loadTestimonyCarousel() {
  const testimonies = HTTP.getAllTestimonies(
    {
      onSuccess: function (data) {
        for (let i = (data.length - 1); i >= (data.length - 6); i--) {
          $('.testimony').append(`<div><p>${data[i].userTestimony}
          </p>
          <div class="testimony-author">- ${data[i].userDisplayName}</div>
          </div>`)
        }

        $('.owl-carousel').owlCarousel({
          loop: true,
          margin: 10,
          nav: false,
          autoplay: true,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 1
            },
            1000: {
              items: 1
            }
          }
        })
      },
      onError: function () {
        console.log('error')
      }
    }
  );
}

// AUTHENTIC USER MENU =============================================//
function updateAuthenticatedUI() {
  const authUser = CACHE.getAuthenticatedUserFromCache();
  if (authUser) {
    STATE.authUser = authUser;
    $('.auth-menu').removeAttr('hidden');
  } else {
    $('.default-menu').removeAttr('hidden');
  }
}
