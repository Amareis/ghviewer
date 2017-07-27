import {connect} from 'react-redux'
import App from '../components/App'
import { bindActionCreators } from 'redux'
import {selectUser, removeUser, selectRepo, loadMoreCommits, loadMoreRepos, refreshRepo, refreshUser} from '../actions'

function mapStateToProps (state) {
    return {
        users: state.users,
        repos: state.userRepos,
        commits: state.repoCommits,
        search: state.search,
        pages: state.pages
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        selectUser: selectUser,
        removeUser: removeUser,
        selectRepo: selectRepo,
        loadMoreCommits: loadMoreCommits,
        loadMoreRepos: loadMoreRepos,
        refreshRepo: refreshRepo,
        refreshUser: refreshUser
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
