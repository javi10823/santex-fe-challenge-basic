import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import {
  Typography,
  CardContent,
  CardActions,
  CircularProgress,
  Button,
} from '@mui/material';
import { PRODUCTS } from 'graphql/queries';
import {
  ProductImage,
  LoadingContainer,
  Container,
  ProductCard,
  ErrorContainer,
} from './styles';
import { Context } from 'context/SubtotalContext';
import { Product, Variant } from 'interfaces/products';

export default function ProductList() {
  const { loading, error, data } = useQuery(PRODUCTS());

  const { subtotal, setSubtotal } = useContext(Context);
  const products: Product[] = [];

  if (loading)
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  if (error)
    return (
      <ErrorContainer>
        <Typography variant="h4">
          Error: An error occurred while trying to get the products
        </Typography>
      </ErrorContainer>
    );
  data.products.items.map(({ variants }: { variants: Variant[] }) =>
    variants.forEach((variant) => {
      products.push({
        ...variant,
        description: variant.product.description,
        image: variant.product.featuredAsset.source,
      });
    })
  );

  return (
    <Container>
      {products.map((product) => {
        return (
          <ProductCard key={`${product.id}`} sx={{ maxWidth: 345 }}>
            <ProductImage
              component="img"
              src={product?.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography marginTop={1} variant="h6" color="text.secondary">
                {product.currencyCode} ${product.priceWithTax}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                type="button"
                size="small"
                onClick={setSubtotal!.bind(
                  null,
                  subtotal! + product.priceWithTax
                )}
              >
                Add to the cart
              </Button>
            </CardActions>
          </ProductCard>
        );
      })}
    </Container>
  );
}
