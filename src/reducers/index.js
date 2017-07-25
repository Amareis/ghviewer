import { combineReducers } from 'redux'
import {QUERY_TYPED, SEARCH_SUCCESS, USER_ADDED, USER_SELECTED, USER_UPDATED, USER_REMOVED,
REPOS_UPDATED, REPO_SELECTED, COMMITS_UPDATED} from '../constants'

const initialState = {
    pagination: {
        repos: {},
        commits: {}
    },
    users: {
        selected: "",
        users: []
    },
    userRepos: {
        selected: "",
        repos: {}
    },
    repoCommits: {},
    search: {
        active: false,
        query: "",
        found: []
    }
};

const search = (state = initialState.search, action) => {
    switch (action.type) {
        case QUERY_TYPED:
            return {
                ...state,
                active: !!action.query,
                query: action.query
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                active: false,
                found: action.results
            }
        case USER_ADDED:
            return initialState.search
        default:
            return state
    }
}

const users = (state = initialState.users, action) => {
    switch (action.type) {
        case USER_ADDED:
            return {
                ...state,
                users: state.users.find(item => item.login === action.user.login) ?
                    state.users
                    : state.users.concat(action.user)
            }
        case USER_SELECTED:
            return {
                ...state,
                selected: state.selected === action.user.login ? "" : action.user.login
            }
        case USER_REMOVED:
            return {
                ...state,
                users: state.users.filter(item => item.login !== action.user.login),
                selected: state.selected === action.user.login ? "" : state.selected
            }
        case USER_UPDATED:
            return {
                ...state,
                users: state.users.map(item => item.login === action.user.login ? action.user : item)
            }
        default:
            return state
    }
}

const repos = (state = initialState.userRepos, action) => {
    switch (action.type) {
        case REPOS_UPDATED:
            return {
                ...state,
                repos: {...state.repos, [action.user.login]: action.repos}
            }
        case USER_REMOVED:
            let {[action.user.login]: _, ...newRepos} = state.repos
            return {
                ...state,
                repos: newRepos,
                selected: state.selected.startsWith(action.user.login) ? "" : state.selected
            }
        case REPO_SELECTED:
            return {
                ...state,
                selected: action.repo.full_name
            }
        default:
            return state
    }
}

const commits = (state = initialState.repoCommits, action) => {
    switch (action.type) {
        case COMMITS_UPDATED:
            return {
                ...state,
                [action.repo.full_name]: action.commits.map(c => {return{
                    hash: c.sha,
                    description: c.commit.message,
                    author: c.author.login,
                    date: c.commit.author.date
                }})
            }
        case USER_REMOVED:
            let newState = {}
            console.log(state)
            for (let key in state) {
                if (!key.startsWith(action.user.login))
                    newState[key] = state[key]
            }
            return newState
        default:
            return state
    }
}

const ghViewer = combineReducers({
    users: users,
    userRepos: repos,
    repoCommits: commits,
    search: search
})

export default ghViewer