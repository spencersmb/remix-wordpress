import { mockPostData } from '@TestUtils/mock-data/posts';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BlogFeaturePostHomePage from "../blogFeaturePostHomePage";

it('Should render Blog Feature Post Home Page Component ', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <BlogFeaturePostHomePage post={mockPostData} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})