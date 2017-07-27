import React from 'react'
import { connect } from 'react-redux'
import UserStars from '../components/UserStars'
import createCachedSelector from 're-reselect';

const getCanComputeStars = (state, {userLogin}) => state.pages.repos[userLogin] === null
const getUserRepos = (state, {userLogin}) => state.userRepos.repos[userLogin] || []


export const getUserStars = createCachedSelector(
    [ getCanComputeStars, getUserRepos ],
    (canComputeStars, userRepos) => {
        if (!canComputeStars)
            return null
        return userRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
    }
)((state, props) => props.userLogin)

const mapStateToProps = (state, props) => ({
    stars: getUserStars(state, props)
})

const UserStarsContainer = connect(mapStateToProps)(
    ({stars, userLogin, dispatch, ...props}) =>
        stars !== null ? <UserStars stars={stars} {...props}/> : null
)

export default UserStarsContainer