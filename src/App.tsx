import { useRepos } from "./useRepos";

function App() {
  const { status, data, error, isFetching } = useRepos();

  console.log("data", data);
  return <div className="App">sasa</div>;
}

export default App;
