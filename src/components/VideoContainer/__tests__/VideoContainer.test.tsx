import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import VideoContainer from "components/VideoContainer";

describe("VideoContainer", () => {
  let renderResult: ReturnType<typeof render>;

  beforeEach(() => {
    renderResult = render(<VideoContainer />);
  });

  afterEach(cleanup);

  it("should render VideoContainer component", () => {
    const video = renderResult.getByTestId("video");
    expect(video).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<VideoContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
