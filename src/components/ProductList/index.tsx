import { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Typography,
  CardContent,
  CardActions,
  CircularProgress,
  Button,
  Snackbar,
} from '@mui/material';
import { PRODUCTS } from 'graphql/queries';
import { ADD_ITEM } from 'graphql/mutations';
import {
  ProductImage,
  LoadingContainer,
  Container,
  ProductCard,
  ErrorContainer,
} from './styles';
import { Context } from 'context/SubtotalContext';
import { Product, Variant } from 'interfaces/products';
import MuiAlert from '@mui/material/Alert';

const defaultErrorMessage =
  'Error: An error occurred while trying to add the product to the cart';

export default function ProductList() {
  const { loading, error, data } = useQuery(PRODUCTS());
  const [addItem] = useMutation(ADD_ITEM());
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState(defaultErrorMessage);

  const { setSubtotal } = useContext(Context);
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

  const onClickProduct = async (id: string) => {
    const response = await addItem({
      variables: { productVariantId: id, quantity: 1 },
    });

    if (response.data.addItemToOrder.__typename === 'Order')
      return setSubtotal!(response.data.addItemToOrder.totalWithTax);
    if (response.data.addItemToOrder.__typename === 'OrderLimitError') {
      setSnackMessage('Maximum number of products per order reached');
      return setOpenSnack(true);
    }
    setOpenSnack(true);
  };

  const onClose = () => {
    setSnackMessage(defaultErrorMessage);
    setOpenSnack(false);
  };
  return (
    <Container>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnack}
        onClose={onClose}
        autoHideDuration={2000}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          {snackMessage}
        </MuiAlert>
      </Snackbar>
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
                onClick={onClickProduct.bind(null, product.id)}
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
