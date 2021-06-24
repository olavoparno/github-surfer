import { fireEvent, render } from "@testing-library/react";
import { RepositoryList } from "..";
import { IRepositoryListProps } from "../types";

describe("Tests RepositoryList component", () => {
  const mockHandleChangePage = jest.fn();
  const mockHandleChangeRowsPerPage = jest.fn();
  const mockHandleSetCurrentAfter = jest.fn();
  const mockHandleSetCurrentBefore = jest.fn();

  const fakeProps: IRepositoryListProps = {
    currentPage: 0,
    data: {
      pageInfo: {
        endCursor: "Y3Vyc29yOjU=",
        startCursor: "Y3Vyc29yOjE=",
        hasNextPage: true,
        hasPreviousPage: false,
      },
      repos: [
        {
          repo: {
            name: "freeCodeCamp",
            url: "https://github.com/freeCodeCamp/freeCodeCamp",
            stargazerCount: 325398,
            forkCount: 25979,
          },
        },
        {
          repo: {
            name: "react",
            url: "https://github.com/facebook/react",
            stargazerCount: 170398,
            forkCount: 34433,
          },
        },
        {
          repo: {
            name: "create-react-app",
            url: "https://github.com/facebook/create-react-app",
            stargazerCount: 88628,
            forkCount: 22180,
          },
        },
        {
          repo: {
            name: "free-programming-books-zh_CN",
            url: "https://github.com/justjavac/free-programming-books-zh_CN",
            stargazerCount: 80772,
            forkCount: 23586,
          },
        },
        {
          repo: {
            name: "ant-design",
            url: "https://github.com/ant-design/ant-design",
            stargazerCount: 72638,
            forkCount: 28703,
          },
        },
      ],
      repositoryCount: 142226,
    },
    handleChangePage: mockHandleChangePage,
    handleChangeRowsPerPage: mockHandleChangeRowsPerPage,
    handleSetCurrentAfter: mockHandleSetCurrentAfter,
    handleSetCurrentBefore: mockHandleSetCurrentBefore,
    rowsPerPage: 5,
  };

  it("should render it regardless of its props", () => {
    const { container } = render(<RepositoryList {...fakeProps} />);

    expect(container).toBeInTheDocument();
  });

  it("should handle next page only", () => {
    const { getByLabelText } = render(<RepositoryList {...fakeProps} />);

    const handleNextButton = getByLabelText("next page");
    const handlePreviousButton = getByLabelText("previous page");

    fireEvent.click(handleNextButton);

    expect(handlePreviousButton).toBeDisabled();
    expect(mockHandleChangePage).toHaveBeenCalled();
    expect(mockHandleSetCurrentAfter).toHaveBeenCalled();
  });

  it("should handle previous page too", () => {
    const newFakeProps = {
      ...fakeProps,
      data: {
        ...fakeProps.data,
        pageInfo: {
          ...fakeProps.data.pageInfo,
          hasPreviousPage: true,
        },
      },
    };
    const { getByLabelText } = render(<RepositoryList {...newFakeProps} />);

    const handleNextButton = getByLabelText("next page");
    const handlePreviousButton = getByLabelText("previous page");

    expect(handleNextButton).toBeEnabled();

    fireEvent.click(handlePreviousButton);

    expect(mockHandleChangePage).toHaveBeenCalled();
    expect(mockHandleSetCurrentBefore).toHaveBeenCalled();
  });

  it("should render no data found for 0 repos", () => {
    const newFakeProps = {
      ...fakeProps,
      data: {
        ...fakeProps.data,
        repos: [],
      },
    };
    const { getByText } = render(<RepositoryList {...newFakeProps} />);

    const noDataFound = getByText("No data found");

    expect(noDataFound).toBeInTheDocument();
  });
});
