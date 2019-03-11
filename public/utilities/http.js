window.HTTP_MODULE = {
    signupUser,
    loginUser,
    getUserTestimonies,
    getAllTestimonies,
    createTestimony,
    deleteTestimony,
    updateTestimony
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
    console.log(options);
}

function getAllTestimonies(options) {
    // const { onSuccess, onError } = options;
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

function updateTestimony(options) {
    const {authToken, testimonyID, updateTestimony, onSuccess, onError } = options;

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
                onError();
            }
        }
    });
}