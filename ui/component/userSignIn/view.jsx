// @flow
import React from 'react';
import { withRouter } from 'react-router';
import UserEmailReturning from 'component/userEmailReturning';

type Props = {
  user: ?User,
  history: { replace: string => void },
  location: { search: string },
  userFetchPending: boolean,
};

function UserSignIn(props: Props) {
  const { user, location, history, userFetchPending } = props;
  const { search } = location;
  const urlParams = new URLSearchParams(search);
  const redirect = urlParams.get('redirect');
  const showUserEmail = user && !user.password_set && !user.has_verified_email;
  const showLoading = userFetchPending;

  React.useEffect(() => {
    if (!showUserEmail) {
      history.push(redirect || '/');
    }
  }, [showUserEmail]);

  return (
    <section className="main--contained">
      {!showLoading && <div>{showUserEmail && <UserEmailReturning />}</div>}
      {showLoading && <div />}
    </section>
  );
}

export default withRouter(UserSignIn);
