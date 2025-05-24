import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 160px;
  height: 50px;
  cursor: pointer;
`;

const OuterOval = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #EBDAA6;
  border-radius: 999px;
  top: 0;
  left: 0;
  z-index: 0;
  border: 2px solid black;
`;

const InnerOval = styled.div`
  position: relative;
  width: 90%;
  height: 80%;
  background-color: #BC452E;
  color: #EBDAA6;
  border: none;
  border-radius: 999px;
  z-index: 1;
  top: 8%;      
  left: 4%;     
  font-weight: bold;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border: 2px solid black;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const GameButton = ({ text, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <OuterOval />
      <InnerOval>{text}</InnerOval>
    </Wrapper>
  );
};

export default GameButton;
