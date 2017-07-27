import { combineReducers } from 'redux'
import {QUERY_TYPED, SEARCH_SUCCESS, USER_ADDED, USER_SELECTED, USER_UPDATED, USER_REMOVED,
REPOS_ADDED, REPO_SELECTED, COMMITS_ADDED, MORE_COMMITS, MORE_REPOS, REPO_REFRESHED, REPO_UPDATED,
USER_REFRESHED} from '../constants'

const initialState = {
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
    },
    pages: {
        commits: {},
        repos: {
            SUMMARY_USER: null
        }
    }
};

export const search = (state = initialState.search, action) => {
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
        case REPOS_ADDED:
            return {
                ...state,
                repos: {
                    ...state.repos,
                    [action.user.login]: (state.repos[action.user.login] || []).concat(action.repos)
                }
            }
        case USER_SELECTED:
            return {
                ...state,
                selected: ""
            }
        case USER_REFRESHED:
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
                selected: state.selected === action.repo.full_name ? "" : action.repo.full_name
            }
        case REPO_UPDATED:
            return {
                ...state,
                repos: {
                    ...state.repos,
                    [action.oldRepo.owner.login]:
                        state.repos[action.oldRepo.owner.login]
                            .map(repo => repo.id === action.oldRepo.id ? action.newRepo : repo)
                }
            }
        default:
            return state
    }
}

let trancsformCommit = (c) => ({
    hash: c.sha,
    description: c.commit.message,
    author: c.author ? c.author.login : c.commit.author.name,
    date: c.commit.author.date
})

const commits = (state = initialState.repoCommits, action) => {
    switch (action.type) {
        case COMMITS_ADDED:
            return {
                ...state,
                [action.repo.full_name]:
                    (state[action.repo.full_name] || []).concat(action.commits.map(trancsformCommit))
            }
        case USER_REFRESHED:
        case USER_REMOVED:
            let newState = {}
            for (let key in state) {
                if (!key.startsWith(action.user.login))
                    newState[key] = state[key]
            }
            return newState
        case REPO_REFRESHED:
            return {
                ...state,
                [action.repo.full_name]: []
            }
        default:
            return state
    }
}

const commitsPages = (state = initialState.pages.commits, action) => {
    switch (action.type) {
        case MORE_COMMITS:
            return {...state, [action.repo.full_name]: null} //чтобы пропала кнопка подгрузки коммитов
        case COMMITS_ADDED:
            return {...state, [action.repo.full_name]: action.nextPage}
        case USER_REFRESHED:
        case USER_REMOVED:
            let newState = {}
            for (let key in state) {
                if (!key.startsWith(action.user.login))
                    newState[key] = state[key]
            }
            return newState
        case REPO_REFRESHED:
            let {[action.repo.full_name]: _, ...others} = state
            return others
        default:
            return state
    }
}

const reposPages = (state = initialState.pages.commits, action) => {
    switch (action.type) {
        case MORE_REPOS:
            return {...state, [action.user.login]: null} //чтобы пропала кнопка подгрузки коммитов
        case REPOS_ADDED:
            return {...state, [action.user.login]: action.nextPage}
        case USER_REFRESHED:
        case USER_REMOVED:
            let {[action.user.login]: _, ...newState} = state
            return newState
        case USER_ADDED:
            return {...state, [action.user.login]: 1}
        default:
            return state
    }
}

const ghViewer = combineReducers({
    users: users,
    userRepos: repos,
    repoCommits: commits,
    search: search,
    pages: combineReducers({
        repos: reposPages,
        commits: commitsPages
    })
})

export default ghViewer