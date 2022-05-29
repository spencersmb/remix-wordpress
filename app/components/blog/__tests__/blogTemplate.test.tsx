import { siteInitialState } from '@App/hooks/useSite';
import UseSiteProvider from '@App/hooks/useSite/useSiteProvider';
import { mockPostDataComplete } from '@TestUtils/mock-data/posts';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BlogTemplate from '../blogTemplate';

describe('BlogTemplate Component', () => {
  it('Should render snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <UseSiteProvider defaultState={siteInitialState}>
            <BlogTemplate post={mockPostDataComplete} />
          </UseSiteProvider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
})