let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onReady);

function onReady() {
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    $('#testimony-form').on('submit', onCreateSubmit);
}

function onCreateSubmit(event) {
    event.preventDefault();
    const newTestimony ={
        userTestimony: $('#userTestimony').val(),
        userDisplayName: $('#userDisplayName').val()
    };
    
console.log(newTestimony);
    HTTP.createTestimony({
        authToken: STATE.authUser.authToken,
        newTestimony: newTestimony,
        onSuccess: testimony => {
            alert('Note created succesfully, redirecting ...');
            // window.open(`/note/details.html?id=${testimony.id}`, '_self');
        },
        onError: err => {
            alert('Internal Server Error (see console)');
            console.error(err);
        }
    });
    console.log('creating testimony')

}