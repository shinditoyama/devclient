import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Router } from "electron-router-dom";
import { queryClient } from "./lib/query";

import { Layout } from "./components/Layout";
import { About } from "./pages/about";
import { Create } from "./pages/create";
import { Edit } from "./pages/edit";
import { Home } from "./pages/home";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        main={
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<Create />} />
            {/* <Route path="/customer/:id" element={<Detail />} /> */}

            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        }
      />
    </QueryClientProvider>
  );
}
