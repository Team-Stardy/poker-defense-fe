import React, { useState, useEffect } from 'react';
import UserBox from "../../components/UserBox";
import GameButton from "../../components/GameButton";
import paper from '../../assets/paper.png';

function Room() {

  const [isReady, setIsReady] = useState(true);

  return (
    <div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div>
              <UserBox
                imgSrc={ paper }
                username="홍길동"
                userId="user123"
                isReady={isReady}
              />
              <button onClick={() => setIsReady(!isReady)}>Ready</button>
            </div>
            <GameButton text="Collections" ></GameButton>
        </div>
    </div>
  );
}

export default Room;
