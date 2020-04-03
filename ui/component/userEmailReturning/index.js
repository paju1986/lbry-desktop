import * as SETTINGS from 'constants/settings';
import { connect } from 'react-redux';
import {
  selectEmailNewIsPending,
  selectEmailNewErrorMessage,
  selectEmailToVerify,
  doUserSignIn,
  doUserFetch,
  selectUser,
  doClearEmailError,
} from 'lbryinc';
import { DAEMON_SETTINGS } from 'lbry-redux';
import { doSetClientSetting, doSetDaemonSetting } from 'redux/actions/settings';
import { makeSelectClientSetting, selectDaemonSettings } from 'redux/selectors/settings';
import UserEmailReturning from './view';

const select = state => ({
  // isPending: selectEmailNewIsPending(state),
  // syncEnabled: makeSelectClientSetting(SETTINGS.ENABLE_SYNC)(state),
  // daemonSettings: selectDaemonSettings(state),
  errorMessage: selectEmailNewErrorMessage(state),
  emailToVerify: selectEmailToVerify(state),
  user: selectUser(state),
});

export default connect(select, {
  doUserFetch,
  doUserSignIn,
  doClearEmailError,
})(UserEmailReturning);
