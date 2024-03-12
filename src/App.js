import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Input from './components/Input';
import Button from './components/Button';
import BoxMessage from './components/ErrorMessage';
import { medLength1, medLength2 } from './utils/stylesRules';

const App = () => {
  const [stage, setStage] = useState(1);
  const [inputs, setInputs] = useState({
    inp1: { state: 'vacio', text: '' },
    inp2: { state: 'vacio', text: '' },
    inp3: { state: 'vacio', text: '' },
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [response, setResponse] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [messageBox, setMessageBox] = useState(null);

  const enableButton = () => {
    const { inp1, inp2, inp3 } = inputs;

    if ((inp1.text.trim() === '' || inp2.text.trim() === '') && stage === 1) return true;
    if (inp2.text.trim().length < 10 && stage === 1) return true;
    if (inp3.text.trim().length < 6 && stage === 2) return true;
    if (inp3.text.trim() === '' && stage === 2) return true;

    return false;
  };

  const sendRequest = async (url, body, setResponseFn) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      setResponseFn(result);
    } catch (error) {
      console.error(error);
    }
  };

  const sendPhoneNumber = () => {
    sendRequest(
      'http://192.168.100.7/operaciones_GOD/public/opsaci/validate/register-member',
      { FullName: inputs.inp1.text, Phone: inputs.inp2.text },
      setResponse
    );
  };

  const sendVerification = () => {
    sendRequest(
      'http://192.168.100.7/operaciones_GOD/public/opsaci/validate/validate-phone',
      { Phone: inputs.inp2.text, VerificationCode: inputs.inp3.text },
      setResponse2
    );
  };

  const changeStage = () => {
    setStage(2);
    setIsButtonDisabled(true);
  };

  useEffect(() => setIsButtonDisabled(enableButton), [inputs, stage]);
  useEffect(() => {
    if (response !== null) response.status === 'OK' ? changeStage() : setMessageBox(response);
  }, [response]);
  useEffect(() => {
    if (response2 !== null) setMessageBox(response2);
  }, [response2]);

  return (
    <>
      {messageBox && (
        <BoxMessage messageBox={messageBox} setMessageBox={setMessageBox} setStage={setStage} />
      )}
      <AppContainer>
        <Inputs>
          {stage === 1 && (
            <>
              <Input
                text='Nombre completo del socio'
                stateInp={inputs.inp1.state}
                setStateInp={(state) => setInputs({ ...inputs, inp1: { ...inputs.inp1, state } })}
                isANumber={false}
                setTextInp={(text) => setInputs({ ...inputs, inp1: { ...inputs.inp1, text } })}
                allowedDigits={null}
              />
              <Input
                text='Teléfono'
                stateInp={inputs.inp2.state}
                setStateInp={(state) => setInputs({ ...inputs, inp2: { ...inputs.inp2, state } })}
                isANumber={true}
                setTextInp={(text) => setInputs({ ...inputs, inp2: { ...inputs.inp2, text } })}
                allowedDigits={10}
              />
            </>
          )}
          {stage === 2 && (
            <Input
              text='Ingrese código de verificación'
              stateInp={inputs.inp1.state}
              setStateInp={(state) => setInputs({ ...inputs, inp1: { ...inputs.inp1, state } })}
              isANumber={true}
              setTextInp={(text) => setInputs({ ...inputs, inp3: { ...inputs.inp3, text } })}
              allowedDigits={6}
            />
          )}
          <Button
            text={stage === 1 ? 'Verificar número' : 'Enviar'}
            isDisabled={isButtonDisabled}
            onClick={stage === 1 ? sendPhoneNumber : sendVerification}
          />
        </Inputs>
      </AppContainer>
    </>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${medLength2} 0;
  width: 100%;
`;

const Inputs = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${medLength1};
  width: 500px;
`;