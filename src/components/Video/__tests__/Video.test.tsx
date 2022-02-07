import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Video from "components/Video";

describe("Video", () => {
  let renderResult: ReturnType<typeof render>;

  beforeEach(() => {
    renderResult = render(<Video />);
  });

  afterEach(cleanup);

  it("should render video component", () => {
    const video = renderResult.getByTestId("video");
    expect(video).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<Video />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
