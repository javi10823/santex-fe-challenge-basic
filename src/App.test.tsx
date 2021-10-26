import { MockedProvider } from '@apollo/client/testing';
import { render, act } from '@testing-library/react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ProductList from './components/ProductList';
import Header from './components/Header';
import App from './App';

describe('ProductList', () => {
  it('renders text and button', async () => {
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
  it('renders correctly', () => {
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
  it('renders header and grid', async () => {
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
