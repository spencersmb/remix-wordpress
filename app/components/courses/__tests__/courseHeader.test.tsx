import { render } from "@testing-library/react";
import CourseHeader from "../courseHeader";
import renderer from 'react-test-renderer';

/**
 * @jest-environment jsdom
 */

// SNAPSHOT TEST EXAMPLE
test('CourseHeader component renders correctly', () => {
  const tree = renderer
    .create(<CourseHeader />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
