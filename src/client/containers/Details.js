import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Details from '../components/Details';
import * as userActions from '../actions/user';

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
