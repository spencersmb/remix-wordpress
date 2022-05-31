import { render } from "@testing-library/react";
import renderer from 'react-test-renderer';
import CourseHighQuality from "../courseHighQuality";

/**
 * @jest-environment jsdom
 */

// SNAPSHOT TEST EXAMPLE
test('Course High Quality component renders correctly', () => {
  const tree = renderer
    .create(<CourseHighQuality />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
