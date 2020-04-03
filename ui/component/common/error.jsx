// @flow
import React from 'react';

type Props = {
  error: string | { message: string },
};

export default function Error(props: Props) {
  const { error } = props;
  const errorMessage = typeof error === 'object' ? error.message : error;

  return (
    <div className="error__wrapper">
      <span className="error__text">{errorMessage}</span>
    </div>
  );
}
