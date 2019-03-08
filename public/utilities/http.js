window.HTTP_MODULE = {
    signupUser,
    loginUser,
    getUserTestimonies,
    // getNoteById,
    createTestimony
    // updateNote,
    // deleteNote
};

function signupUser(options) {
    const { userData, onSuccess, onError } = options;
    $.ajax({
        type: 'POST',
        url: '/api/users',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function loginUser(options) {
    console.log('login the user')
    const { userData, onSuccess, onError } = options;
    $.ajax({
        type: 'POST',
        url: '/api/auth/login',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function createTestimony(options) {
    const { authToken, newTestimony, onSuccess, onError } = options;
console.log('posting this',authToken);
    $.ajax({
        type: 'POST',
        url: '/api/testimonies',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(newTestimony),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function getUserTestimonies(options) {
    const { authToken, onSuccess, onError } = options;
    $.ajax({
        type: 'GET',
        url: '/api/testimonies',
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}