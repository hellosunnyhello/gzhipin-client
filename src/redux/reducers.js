import {combineReducers} from 'redux'
const initaaa = {}
function aaa(state = initaaa,action) {
    switch (action.type){


        default:
            return state;
    }
}

const initbbb = []
function bbb(state = initaaa,action) {
    switch (action.type){


        default:
            return state;
    }
}

export default combineReducers({aaa,bbb})