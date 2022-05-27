import { mockPostData } from '@TestUtils/mock-data/posts';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BlogAuthor from '../blogAuthor';
describe('Blog Author Tests', () => {

  it('Should render Blog Author Component ', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <BlogAuthor post={mockPostData} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

})