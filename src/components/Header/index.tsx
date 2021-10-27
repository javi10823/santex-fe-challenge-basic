import { useContext } from 'react';
import { Typography } from '@mui/material';
import { Context } from 'context/SubtotalContext';
import { ValueContainer, Container } from './styles';

export default function Header() {
  const { subtotal } = useContext(Context);

  return (
    <Container>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <ValueContainer>
        <Typography>$ {subtotal}</Typography>
      </ValueContainer>
    </Container>
  );
}
