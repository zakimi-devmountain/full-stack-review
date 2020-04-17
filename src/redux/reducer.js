//User information is stored here to be shared with all components that need it.
const initialState = {
    user: {}
}

//These variables will be the action types we use in our action creators below.
//While this is not required here, it is recommended to avoid silent errors caused
//from typos in strings.
const GET_USER = 'GET_USER';
const CLEAR_USER = 'CLEAR_USER';

//These action creators will allow for placing the users information on redux(getUser)
//as well as clearing the users information from redux when they logout(clearUser)
export function getUser(userObj){
    return {
        type: GET_USER,
        payload: userObj
    }
}

export function clearUser(){
    return {
        type: 'CLEAR_USER',
        payload: {}
    }
}

//The reducer function, with the help of action creators, will change redux state
export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_USER:
            return {...state, user: payload};
        case CLEAR_USER:
            return {...state, user: payload};
        default:
            return state;
    }
}