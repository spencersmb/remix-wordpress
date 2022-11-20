import { mockCourse, mockCourse2, mockCourse3 } from '@TestUtils/mock-data/courses';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import FeatureCourses from '../featureCourses';

it('Should render Feature Courses Component ', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <FeatureCourses courses={[
          mockCourse,
          mockCourse2,
          mockCourse3,
          mockCourse,
          mockCourse2,
          mockCourse3
        ]} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})