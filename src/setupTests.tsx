// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const WithGraphQL = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
