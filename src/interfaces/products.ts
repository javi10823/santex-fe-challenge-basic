export type Product = {
  currencyCode: string;
  id: string;
  name: string;
  priceWithTax: number;
  product: {
    description: string;
    featuredAsset: { source: string };
  };
  description: string;
  image: string;
};

export type Variant = {
  currencyCode: string;
  id: string;
  name: string;
  priceWithTax: number;
  product: {
    description: string;
    featuredAsset: { source: string };
  };
};
