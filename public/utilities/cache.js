window.CACHE_MODULE = {
    getAuthenticatedUserFromCache,
    saveAuthenticatedUserIntoCache,
    deleteAuthenticatedUserFromCache
};

function getAuthenticatedUserFromCache() {
    const authToken = localStorage.getItem('authToken');
    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (authToken) {
        return {
            authToken,
            id,
            username,
            name,
            email
        };
    } else {
        return undefined;
    }
}

function saveAuthenticatedUserIntoCache(user) {
    localStorage.setItem('authToken', user.authToken);
    localStorage.setItem('id', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
}

function deleteAuthenticatedUserFromCache() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
}