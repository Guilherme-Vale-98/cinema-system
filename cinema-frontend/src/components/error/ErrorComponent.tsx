import React from 'react'

type Props = {
  errorMessage: string
}

const ErrorComponent = ({errorMessage}: Props) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', color: 'red' }}>Error: </h1>
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorComponent