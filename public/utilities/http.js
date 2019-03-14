window.HTTP_MODULE = {
    signupUser,
    loginUser,
    getUserTestimonies,
    getAllTestimonies,
    createTestimony,
    deleteTestimony,
    updateTestimony,
    getTestimonyByID
};

// REGISTER USER =============================================//
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

// LOGIN USER =============================================//
function loginUser(options) {
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

// POST TESTIMONY =============================================//
function createTestimony(options) {
    const { authToken, newTestimony, onSuccess, onError } = options;
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

// GET TESTIMONIES FOR SINGLE USER =====================================//
function getUserTestimonies(options) {
    const { authToken, onSuccess, onError } = options;
    $.ajax({
        type: 'GET',
        url: '/api/testimonies/user',
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

// GET ALL TESTIMONIES =========================================//
function getAllTestimonies(options) {
    const onSuccess = options.onSuccess;
    const onError = options.onError;
    $.ajax({
        type: 'GET',
        url: '/api/testimonies/',
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

// DELETE TESTIMONY =============================================//
function deleteTestimony(options) {
    const { testimonyID, authToken, onSuccess, onError } = options;
    $.ajax({
        type: 'delete',
        url: `/api/testimonies/${testimonyID}`,
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

// PUT TESTIMONY =============================================//
function updateTestimony(options) {
    const { authToken, testimonyID, updateTestimony, onSuccess, onError } = options;
    $.ajax({
        type: 'PUT',
        url: `/api/testimonies/${testimonyID}`,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(updateTestimony),
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

// GET SINGLE TESTIMONY =========================================//
function getTestimonyByID(options) {
    const { testimonyID, onSuccess } = options;
    $.getJSON(`/api/testimonies/${testimonyID}`, onSuccess);
}