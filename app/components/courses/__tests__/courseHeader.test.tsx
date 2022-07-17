import { render } from "@testing-library/react";
import CourseHeader from "../courseHeader";
import renderer from 'react-test-renderer';
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider";
import { siteInitialState } from "@App/hooks/useSite";

/**
 * @jest-environment jsdom
 */

// SNAPSHOT TEST EXAMPLE
test('CourseHeader component renders correctly', () => {
  const tree = renderer
    .create(
      <UseSiteProvider defaultState={siteInitialState}>
        <CourseHeader />
      </UseSiteProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
