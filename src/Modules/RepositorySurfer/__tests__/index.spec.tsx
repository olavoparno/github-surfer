import { Suspense } from "react";
import { fireEvent, render } from "@testing-library/react";
import { RepositorySurfer } from "..";
import { WithGraphQL } from "../../../setupTests";

describe("Tests RepositorySurfer", () => {
  it("should render RepositorySurfer and search", async () => {
    const { container, findByLabelText } = render(
      <WithGraphQL>
        <Suspense fallback="suspended app">
          <RepositorySurfer />
        </Suspense>
      </WithGraphQL>
    );

    const searchInput = (await findByLabelText("Topic")) as HTMLInputElement;

    expect(container).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "react" } });

    expect(searchInput.value).toEqual("react");
  });
});
