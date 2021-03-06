import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../components/Layout';
import * as userActions  from '../actions/userActions';
import * as menuActions  from '../actions/menuActions';
import * as modalActions from '../actions/modalActions';
import * as notificationActions from '../actions/notificationActions';

function mapStateToProps(state) {
    return {
        applicationDomain: state.applicationDomain,
        user: state.user,
        menu: state.menu,
        modal: state.modal,
        notification: state.notification
    };
}

function mapDispatchToProps(dispatch) {
    return {
        menuActions: bindActionCreators(menuActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch),
        notificationActions: bindActionCreators(notificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
