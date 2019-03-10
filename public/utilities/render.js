window.RENDER_MODULE = {
    renderTestimonyList
    // renderNoteDetails,
    // renderEditableNote
};

function renderTestimonyList(testimonies) {
    // $('#testimony-list').html('');

    for (let i = 0; i < testimonies.length; i++) {
        $('#testimony-list').append(`
        <li class="news" role="list"><p>${testimonies[i].userTestimony}</p>
    </li>`)
    }
    const testimonyHtml = testimonies.map(TestimonyToHtml).join('<hr/>');
    $('#testimony-list').html(`HERE`,testimonyHtml);
    function TestimonyToHtml(testimony) {
        // let noteSummary = testimony.content;
        // if (noteSummary.length > 120) {
        //     noteSummary = `${note.content.substring(0, 120)}...`;
        // }
        console.log(testimonies);

        return `
        <div id="note-card" data-note-id="${testimonies.id}">
            <h3 class="card-header">${testimonies.userTestimony}
            <button id="delete-note-btn">Delete</button></h3>
            <p class="card-content">${testimonies.userDisplayName}</p>
        </div>
        `;
    }
}