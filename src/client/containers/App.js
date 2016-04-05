import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../components/Layout';
import * as userActions  from '../actions/user';
import * as menuActions  from '../actions/menu';
import * as modalActions from '../actions/modal';

function mapStateToProps(state) {
    return {
        applicationDomain: state.applicationDomain,
        user: state.user,
        menu: state.menu,
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        menuActions: bindActionCreators(menuActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
