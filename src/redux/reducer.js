const initialState = {
    username: '',
    profile_pic: '',
    user_id: 0
}

const GET_USER = "GET_USER"

export function getUser(username, profile_pic, user_id){
    console.log(this.state)
    return {
        type: GET_USER,
        payload: {username, profile_pic, user_id}
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