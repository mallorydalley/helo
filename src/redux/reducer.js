const initialState = {
    username: '',
    profile_pic: ''
}

const GET_USER = "GET_USER"

export function getUser(username, profile_pic){
    console.log(this.state)
    return {
        type: GET_USER,
        payload: {username, profile_pic}
    }
}


export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_USER:
            return { ...state, ...payload}
        default:
            return state;
    }
}