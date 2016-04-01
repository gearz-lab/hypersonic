import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../components/Layout';
import {loadUser}  from '../actions/user';
import {loadMenu}  from '../actions/menu';

function mapStateToProps(state) {
    return {
        applicationDomain: state.applicationDomain,
        user: state.user,
        menu: state.menu
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadUser, loadMenu}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
