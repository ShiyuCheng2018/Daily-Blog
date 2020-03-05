export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(process.env.REACT_APP_API_URL, {
        method: "GET",
    })
        .then(res=>{
            return res.json()
        })
        .catch(err => console.log(err));
};

export const singlePost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "GET",
    })
        .then(res=>{
            return res.json()
        })
        .catch(err => console.log(err));
};

export const listByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Content-Type': ';application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(res=>{
            return res.json()
        })
        .catch(err => console.log(err));
};


export const removePost = (postId, token) => {
    return fetch(process.env.REACT_APP_API_URL+`/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res=>{
            return res.json()
        })
        .catch(err => console.log(err));
};

export const updatePost = (postId, token, post) => {
    console.log("USER DATA UPDATE: ", post);
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
