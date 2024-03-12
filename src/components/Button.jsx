import { styled } from 'styled-components';
import { greenSacimex, whiteSacimex, smaLength1, smaLength2 } from '../utils/stylesRules';

const Button = ({ text, isDisabled, onClick }) => {
  return (
    <StyledButton disabled={isDisabled} onClick={onClick} $disabled={isDisabled}>
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  background-color: ${({ $disabled }) => $disabled ? '#E1DFE9' : greenSacimex};
  border: none;
  border-radius: ${smaLength1};
  color: ${whiteSacimex};
  ${({ $disabled }) => !$disabled && 'cursor: pointer;'}
  padding: ${smaLength1} ${smaLength2};
  transition: background .3s;

  ${({ $disabled }) => !$disabled && `
    &:hover {
      background-color: #328258;
    }
  `}
`;