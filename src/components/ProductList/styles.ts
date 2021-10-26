import styled from 'styled-components';
import { CardMedia, CardMediaTypeMap, Card } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const LoadingContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '5%',
});

export const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const ErrorContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 50,
});

export const ProductCard = styled(Card)({
  marginInline: 10,
  marginBlock: 5,
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
});

export const ProductImage = styled(CardMedia)({
  height: 250,
  objectFit: 'contain',
}) as OverridableComponent<CardMediaTypeMap<{}, 'div'>>;
