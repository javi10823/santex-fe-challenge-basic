import { MockedProvider } from '@apollo/client/testing';
import { render, act } from '@testing-library/react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ProductList from './components/ProductList';
import Header from './components/Header';
import App from './App';

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
