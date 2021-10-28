import { gql } from '@apollo/client';

export const ADD_ITEM = () => gql`
  mutation addItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        id
        totalWithTax
      }
    }
  }
`;
