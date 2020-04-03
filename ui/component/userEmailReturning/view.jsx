// @flow
import * as PAGES from 'constants/pages';
import React, { useState } from 'react';
import { Lbryio } from 'lbryinc';
import { FormField, Form } from 'component/common/form';
import Button from 'component/button';
import analytics from 'analytics';
import { EMAIL_REGEX } from 'constants/email';
import I18nMessage from 'component/i18nMessage';
import { useHistory } from 'react-router-dom';
import usePersistedState from 'effects/use-persisted-state';
import UserEmailVerify from 'component/userEmailVerify';
import ErrorText from 'component/common/error-text';
import Card from 'component/common/card';

type Props = {
  errorMessage: ?string,
  isPending: boolean,
  addUserEmail: string => void,
  syncEnabled: boolean,
  setSync: boolean => void,
  balance: number,
  daemonSettings: { share_usage_data: boolean },
  setShareDiagnosticData: boolean => void,
};

function UserEmailReturning(props: Props) {
  const { errorMessage, doUserSignIn, emailToVerify, doClearEmailError } = props;
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = usePersistedState('sign-in-show-password', false);
  const [password, setPassword] = useState('');
  const { push } = useHistory();

  const valid = email.match(EMAIL_REGEX);
  const showEmailVerification = emailToVerify;

  function handleSubmit() {
    doUserSignIn(email, password === '' ? undefined : password);
  }

  function handleChangeToSignIn() {
    doClearEmailError();
    push(`/$/${PAGES.AUTH}`); // TODO: Don't lose redirect url right here
  }

  return (
    <div className="main__sign-in">
      {showEmailVerification ? (
        <UserEmailVerify />
      ) : (
        <div>
          <div className="section">
            <Card
              title={__('Sign In to lbry.tv')}
              actions={
                <div>
                  <Form onSubmit={handleSubmit} className="section">
                    <FormField
                      autoFocus
                      placeholder={__('hotstuff_96@hotmail.com')}
                      type="email"
                      name="sign_in_email"
                      label={__('Email')}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    {showPassword && (
                      <FormField
                        type="password"
                        name="sign_in_password"
                        label={__('Password')}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    )}
                    {!showPassword && (
                      <fieldset-section>
                        <FormField
                          type="checkbox"
                          placeholder={__('hotstuff_96@hotmail.com')}
                          name="sign_in_toggle_password"
                          label={__('Sign in with a password (optional)')}
                          checked={showPassword}
                          onChange={() => setShowPassword(!showPassword)}
                        />
                      </fieldset-section>
                    )}

                    <div className="section__actions">
                      <Button button="primary" type="submit" label={__('Continue')} disabled={!email || !valid} />
                    </div>
                  </Form>
                  {errorMessage && (
                    <div className="section">
                      <ErrorText>{errorMessage.message}</ErrorText>
                    </div>
                  )}
                </div>
              }
            />
          </div>
          <div className="section">
            <p className="help">
              <I18nMessage
                tokens={{
                  sign_up: <Button button="link" onClick={handleChangeToSignIn} label={__('Sign Up')} />,
                }}
              >
                Don't have an account? %sign_up%
              </I18nMessage>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserEmailReturning;
