import React from 'react';

function UserBox({ imgSrc, username, userId, isReady }) {
  return (
    <div
      style={{
        width: '200px', height: '200px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',  
        margin: 'auto', 
        position: 'relative'
      }}
    >
      <img
        src={ imgSrc }
        style={{
          width: '50%',
          height: '70%',
          objectFit: 'cover',
        }}
      />
       {isReady && (
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            backgroundColor: 'rgba(0, 128, 0, 0.7)',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          READY
        </div>
      )}
    </div>
  );
}

export default UserBox;
 