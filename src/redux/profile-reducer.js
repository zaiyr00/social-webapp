import { usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

let initialState = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 0},
        {id: 2, message: 'It\'s my post', likesCount: 12},
    ],
    newPostText: 'IT Courses',
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 7
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost], //создаем копию postsData и пушим новый пост в копию
                newPostText: ""
            }; //создаем копию state, т.к ф-я должна быть чистой
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            } //создаем копию state
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;    
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updatePostActionCreator = (acceptingPostMessage) => 
    ({ type: UPDATE_NEW_POST_TEXT, newText: acceptingPostMessage })
export const setUserProfileActionCreator = (profile) => ({type: SET_USER_PROFILE, profile })
export const getUserProfileThunkCreator = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileActionCreator(response.data));
            });
} // Thunk creator - ф-я, которая возвращает Thunk. Thunk - это ф-я, которая принимает dispatch и делает внутри асинхронные операции и различные мелкие actions

export default profileReducer;