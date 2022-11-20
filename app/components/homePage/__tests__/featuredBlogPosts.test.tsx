import { mockPostDataComplete, mockPostDataComplete_2, mockPostDataComplete_3 } from '@TestUtils/mock-data/posts';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import FeaturedBlogPosts from '../featuredBlogPosts';

it('Should render Featured Blog posts Section for Homepage ', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <FeaturedBlogPosts posts={[
          mockPostDataComplete,
          mockPostDataComplete,
          mockPostDataComplete_2,
          mockPostDataComplete_3
        ]} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})