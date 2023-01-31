import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperheroesPage } from "./components/RQSuperheroes.page";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { PararellQueriesPage } from "./components/PararellQueries.page";
import { DynamicPararellQueries } from "./components/DynamicPararellQueries.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />} />

            <Route path="/rq-super-heroes" element={<RQSuperheroesPage />} />

            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />

            <Route path="/rq-parallel" element={<PararellQueriesPage />} />
            <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
            <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />

            <Route
              path="/rq-dependent"
              element={<DependentQueriesPage email="tes@gmail.com" />}
            />

            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicPararellQueries heroIds={[1, 3]} />}
            />

            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpem={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
