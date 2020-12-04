export const API = process.env.REACT_APP_API_URL

export const loadImage = (_id) => {
    return `${API}/book/photo/${_id}`;
}