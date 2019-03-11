'use strict'

const HTTP = window.HTTP_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
  loadTestimonyCarousel();
}

function loadTestimonyCarousel() {
  const testimonies = HTTP.getAllTestimonies(
    {
      onSuccess: function (data) {
        for (let i = 0; i < 6; i++) {
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


