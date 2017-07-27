import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {QUERY_TYPED, USER_ADDED, MORE_COMMITS, MORE_REPOS, REPO_REFRESHED, USER_REFRESHED} from './constants'
import {successSearch, failRequest, updateUser, addRepos, addCommits, updateRepo} from './actions'
import RestClient from 'another-rest-client'

var api = new RestClient('https://api.github.com');
api.res({
    users: 'repos',
    repos: 'commits',
    search: 'users'
});

let delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function* searchUsers(action) {
    if (!action.query)
        return
    try {
        yield call(delay, 500)
        let req = yield call(api.search.users.get, {q: action.query, per_page: 15})
        yield put(successSearch(req.items))
    } catch (e) {
        yield put(failRequest(e.message))
    }
}

function* getUserDetails(action) {
    try {
        let user = yield call(api.users(action.user.login).get)
        yield put(updateUser(user))
    } catch (e) {
        yield put(failRequest(e.message))
    }
}

function* getCommits(action) {
    try {
        let page = action.page || 1;
        let link = "";

        let commits = yield api.repos(action.repo.full_name).commits.get({per_page: 20, page: page}).
            on('success', x => link = x.getResponseHeader('Link'))

        let nextPage = (link && link.includes('rel="next"')) ? page + 1: null

        yield put(addCommits(action.repo, commits, nextPage))
    } catch (e) {
        yield put(failRequest(e.message))
    }
}

function* getRepos(action) {
    try {
        let page = action.page || 1;
        let link = "";

        let repos = yield api.users(action.user.login).repos.get({per_page: 20, page: page}).
        on('success', x => link = x.getResponseHeader('Link'))

        let nextPage = (link && link.includes('rel="next"')) ? page + 1: null

        yield put(addRepos(action.user, repos, nextPage))
    } catch (e) {
        yield put(failRequest(e.message))
    }
}

function* getRepoDetails(action) {
    try {
        let repo = yield call(api.repos(action.repo.full_name).get)
        yield put(updateRepo(action.repo, repo))
    } catch (e) {
        yield put(failRequest(e.message))
    }
}

function* mySaga() {
    yield takeLatest(QUERY_TYPED, searchUsers)
    yield takeEvery(USER_ADDED, getUserDetails)
    yield takeEvery(MORE_COMMITS, getCommits)
    yield takeEvery(MORE_REPOS, getRepos)
    yield takeLatest(REPO_REFRESHED, getCommits)
    yield takeLatest(REPO_REFRESHED, getRepoDetails)
    yield takeEvery(USER_REFRESHED, getRepos)
    yield takeEvery(REPO_REFRESHED, getUserDetails)
}

export default mySaga