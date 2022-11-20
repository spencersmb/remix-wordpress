import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import LinkItem from '../popOver/linkItem';

it('Should render Procreate Brushes Component ', () => {
  const props = {
    title: 'Link Item',
    description: 'This is a link item',
    url: '/link-item',
    externalLink: false,
  }
  const tree = renderer
    .create(
      <MemoryRouter>
        <LinkItem {...props} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})