import { QueryClientProvider } from "./providers/query-client.provider";
import { RouterProvider } from "./providers/router.provider";
import "./styles/normalize.css";

const App = () => {
  return (
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  );
};

export default App;
