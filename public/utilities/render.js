window.RENDER_MODULE = {
    renderTestimonyList
    // renderNoteDetails,
    // renderEditableNote
};

function renderTestimonyList(testimonies) {
    const testimonyHtml = testimonies.map(TestimonyToHtml).join('<hr/>');
    $('#testimony-list').html(testimonyHtml);

    function TestimonyToHtml(testimony) {
        // let noteSummary = testimony.content;
        // if (noteSummary.length > 120) {
        //     noteSummary = `${note.content.substring(0, 120)}...`;
        // }
        return `
        <div id="note-card" data-note-id="${testimony.id}">
            <h3 class="card-header">${testimony.userTestimony}
            <button id="delete-note-btn">Delete</button></h3>
            <p class="card-content">${testimony.userDisplayName}</p>
        </div>
        `;
    }
}