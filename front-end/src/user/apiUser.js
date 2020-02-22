export const read = (userId, token) => {
    return fetch(process.env.REACT_APP_API_URL+`/user/${userId}`, {
        method: "GET",
        headers: {
            Accpt: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res=>{
            return res.json()
        })
        .catch(err => console.log(err));
};
