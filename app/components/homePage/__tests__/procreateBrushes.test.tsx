import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ProcreateBrushes from '../procreateBrushes';

it('Should render Procreate Brushes Component ', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <ProcreateBrushes />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})