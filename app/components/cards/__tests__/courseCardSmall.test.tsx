import { mockCourse } from '@TestUtils/mock-data/courses';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CourseCardSmall from '../courseCardSmall';

it('Should render Small Course Card Component ', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <CourseCardSmall course={mockCourse} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})