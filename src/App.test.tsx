import { MockedProvider } from '@apollo/client/testing';
import { render, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ProductList from './components/ProductList';
import Header from './components/Header';
import App from './App';

describe('ProductList', () => {
  it('renders Grid correctly', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );
    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );
  });
});

describe('Header', () => {
  it('renders Header correctly', () => {
    const tree = renderer
      .create(
        <MockedProvider mocks={[]} addTypename={false}>
          <Header />
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Page', () => {
  it('renders home page', async () => {
    const tree = renderer
      .create(
        <MockedProvider mocks={[]} addTypename={false}>
          <App />
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
