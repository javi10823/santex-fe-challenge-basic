import { gql } from '@apollo/client';

export const PRODUCTS = () => gql`
  {
    products {
      items {
        id
        variants {
          id
          name
          currencyCode
          priceWithTax
          product {
            description
            featuredAsset {
              source
            }
          }
        }
      }
      totalItems
    }
  }
`;
