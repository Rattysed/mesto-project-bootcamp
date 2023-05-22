const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1',
    headers: {
        authorization: '1b58de5c-ca46-4253-9f66-d5611b2a5c87',
        'Content-Type': 'application/json'
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

export function loadUserInfo() {
    return request(config.baseUrl + "/users/me", {
        method: "GET",
        headers: config.headers
    });
} 
  
export function loadInitialCards() {
    return request(config.baseUrl + "/cards", {
        method: "GET",
        headers: config.headers
    })
}

export function updateProfile(name, about) {
    return request(config.baseUrl + "/users/me", {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
}

export function makeNewCard(cardContent) {
    return request(config.baseUrl + "/cards", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: cardContent.name,
            link: cardContent.link
        })
    }) 
}

export function deleteCard(cardId) {
    return request(config.baseUrl + `/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    });
}

export function likeCard(cardId, isLiked) {
    return request(config.baseUrl + `/cards/likes/${cardId}`, {
        method: (isLiked ? "DELETE" : "PUT"),
        headers: config.headers,
    })
}

export function updateAvatar(link) {
    return request(config.baseUrl + `/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })  
}