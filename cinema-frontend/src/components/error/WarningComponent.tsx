import React from 'react'

type Props = {
  warningMessage: string
}

const WarningComponent = ({ warningMessage }: Props) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', color: 'orange' }}>Atenção: </h1>
      <p>{warningMessage}</p>
    </div>
  );
}

export default WarningComponent
