let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
    // updateAuthenticatedUI();
    
    if (STATE.authUser) {
        HTTP.getUserTestimonies({
            authToken: STATE.authUser.authToken,
            onSuccess: RENDER.renderTestimonyList
        });
    } 
    
    // $('#logout-btn').on('click', onLogoutBtnClick);
    // $('#note-list').on('click', '#delete-note-btn', onDeleteNoteBtnClick);
    // $('#note-list').on('click', '#note-card', onNoteCardClick);
}