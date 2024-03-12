import { styled } from 'styled-components';
import Button from './Button';
import { MdCheckCircleOutline, MdOutlineCancel, MdClose } from 'react-icons/md';
import {
  smaLength1,
  smaLength2,
  smaLength3,
  larLength2,
  smaFont,
  medFont,
  label,
} from '../utils/stylesRules';

const BoxMessage = ({ messageBox, setMessageBox, setStage }) => {
  const { status, message } = messageBox;

  const resetForm = () => {
    setStage(1);
    setMessageBox(null);
  };

  const handleOverlayClick = () => {
    if (status === 'OK') resetForm();
    else setMessageBox(null);
  };

  return (
    <Container>
      <Overlay onClick={handleOverlayClick} />
      <MessageBox $color={status === 'OK' ? '#50C878' : '#E06666'}>
        {status === 'ERROR' && (
          <CloseButton onClick={() => setMessageBox(null)}>
            <MdClose />
          </CloseButton>
        )}
        <Icon>{status === 'OK' ? <MdCheckCircleOutline /> : <MdOutlineCancel />}</Icon>
        <Text>{message}</Text>
        {status === 'OK' && <Button onClick={resetForm} text='Aceptar' />}
      </MessageBox>
    </Container>
  );
};

export default BoxMessage;

const Container = styled.div`
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 110;
`;

const Overlay = styled.div`
  backdrop-filter: blur(${smaLength1});
  background-color: rgba(32, 32, 32, 0.5);
  height: 100%;
  transition: opacity 0.3s;
  width: 100%;
  z-index: 105;
`;

const MessageBox = styled.div`
  align-items: center;
  background-color: #FFFFFF;
  border-radius: ${smaLength1};
  color: ${({ $color }) => $color};
  display: flex;
  flex-direction: column;
  gap: ${smaLength3};
  justify-content: center;
  padding: ${smaLength2};
  position: absolute;
  width: 500px;
  z-index: 115;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
  border: none;
  background-color: inherit;
  color: ${label};
  cursor: pointer;
  font-size: ${medFont};
  padding: ${smaLength1};
  position: absolute;
  right: ${smaLength1};
  top: 0;
`;

const Icon = styled.div`
  font-size: ${larLength2};
`;

const Text = styled.p`
  font-size: ${smaFont};
  text-align: center;
`;