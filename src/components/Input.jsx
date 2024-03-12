import { styled } from 'styled-components';
import {
  greenSacimex,
  yellowSacimex,
  whiteSacimex,
  label,
  smaLength1,
  smaLength2,
  smaFont,
} from '../utils/stylesRules';

const Input = ({ text, stateInp, setStateInp, setTextInp, isANumber, allowedDigits }) => {
  const handleInput = (input, setState) => {
    const value = input.value.trim();
    const isEmpty = value === '';

    setState(isEmpty ? 'vacio' : 'completo');
  };

  const handleNumber = (ev) => {
    let value = ev.target.value;
    value = value.replace(/[^0-9]/g, '');

    if (value.length > allowedDigits) {
      value = value.slice(0, allowedDigits);
    }

    ev.target.value = value;
    setTextInp(value);
  };

  return (
    <SpanInputContenedor>
      <StyledSpan $isFocus={stateInp === 'focus'} $isVacio={stateInp === 'vacio'} $isCompleto={stateInp === 'completo'}>
        {text}
      </StyledSpan>
      <StyledInput
        type='text'
        onFocus={() => setStateInp('focus')}
        onBlur={(ev) => handleInput(ev.target, setStateInp)}
        onChange={(ev) => (isANumber ? handleNumber(ev) : setTextInp(ev.target.value))}
      />
    </SpanInputContenedor>
  );
};

export default Input;

const SpanInputContenedor = styled.div`
  position: relative;
  width: 90%;
`;

const StyledSpan = styled.span`
  background-color: ${whiteSacimex};
  font-size: ${smaFont};
  left: ${smaLength2};
  padding: 0 ${smaLength1};
  pointer-events: none;
  position: absolute;
  transition: color .3s, transform .3s, border .3s, top .3s;

  ${({ $isVacio }) =>
    $isVacio &&
    `
    border-left: 2px solid ${whiteSacimex};
    border-right: 2px solid ${whiteSacimex};
    top: 10px;
  `}

  ${({ $isFocus }) =>
    $isFocus &&
    `
    border-left: 2px solid ${yellowSacimex};
    border-right: 2px solid ${yellowSacimex};
    color: ${greenSacimex};
  `}

  ${({ $isCompleto }) =>
    $isCompleto &&
    `
    border-left: 2px solid ${label};
    border-right: 2px solid ${label};
  `}

  ${({ $isFocus, $isCompleto }) =>
    ($isFocus || $isCompleto) &&
    `
    transform: scale(80%);
    top: -12px;
  `}

  ${({ $isVacio, $isCompleto }) =>
    ($isVacio || $isCompleto) &&
    `
    color: ${label};
  `}
`;

const StyledInput = styled.input`
  border: 2px solid ${label};
  border-radius: ${smaLength1};
  font-size: ${smaFont};
  outline: none;
  padding: ${smaLength1} ${smaLength2};
  transition: border .3s;
  width: 100%;

  &:focus {
    border: 2px solid ${yellowSacimex};
  }
`;