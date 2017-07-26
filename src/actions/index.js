import {QUERY_TYPED, SEARCH_SUCCESS, REQUEST_FAIL, USER_ADDED, USER_SELECTED, USER_UPDATED,
USER_REMOVED, REPOS_UPDATED, REPO_SELECTED, COMMITS_ADDED, MORE_COMMITS} from '../constants'


export const handleSearch = query => {
    return {
        type: QUERY_TYPED,
        query: query
    }
}

export const successSearch = results => {
    return {
        type: SEARCH_SUCCESS,
        results: results
    }
}

export const failRequest = message => {
    return {
        type: REQUEST_FAIL,
        message: message
    }
}

export const addUser = user => {
    return {
        type: USER_ADDED,
        user: user
    }
}

export const selectUser = user => {
    return {
        type: USER_SELECTED,
        user: user
    }
}

export const updateUser = user => {
    return {
        type: USER_UPDATED,
        user: user
    }
}

export const removeUser = user => {
    return {
        type: USER_REMOVED,
        user: user
    }
}

export const updateRepos = (user, repos) => {
    return {
        type: REPOS_UPDATED,
        user: user,
        repos: repos
    }
}

export const selectRepo = repo => {
    return {
        type: REPO_SELECTED,
        repo: repo
    }
}

export const addCommits = (repo, commits, nextPage) => {
    return {
        type: COMMITS_ADDED,
        repo: repo,
        commits: commits,
        nextPage: nextPage
    }
}

export const loadMoreCommits = (repo, page) => {
    return {
        type: MORE_COMMITS,
        repo: repo,
        page: page
    }
}
