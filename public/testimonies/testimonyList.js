// let STATE = {};
// All these modules are are defined in /public/utilities
// const RENDER = window.RENDER_MODULE;
// const HTTP = window.HTTP_MODULE;
// const CACHE = window.CACHE_MODULE;
// const ETC = window.ETC_MODULE;

// $(document).ready(onReady);

// function onReady() {
//     STATE.id = ETC.getQueryStringParam('id');
//     STATE.authUser = CACHE.getAuthenticatedUserFromCache();

//     HTTP.getNoteById({
//         id: STATE.id,
//         onSuccess: RENDER.renderNoteDetails
//     });

//     $('#note-details').on('click', '#edit-note-btn', onEditNoteBtnClick);
// }

// function onEditNoteBtnClick(event) {
//     event.preventDefault();
//     window.open(`/note/edit.html?id=${STATE.noteId}`, '_self');
// }