import { mockPostDataComplete } from '@TestUtils/mock-data/posts';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BlogTemplate from '../blogTemplate';

describe('BlogTemplate Component', () => {
  // it.skip('Should render snapshot', () => {
  //   const tree = renderer
  //     .create(
  //       <MemoryRouter>
  //         <BlogTemplate post={mockPostDataComplete} />
  //       </MemoryRouter>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // })
})