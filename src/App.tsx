import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load the editor page for better performance
const EditorPage = lazy(() => import("./components/EditorPage"));

function App() {
  return (
    <>
      {/* Main application routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/editor/:id"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <EditorPage />
            </Suspense>
          }
        />
        {/* Add the tempobook route for Tempo to work properly */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>

      {/* Tempo routes for storyboards */}
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

export default App;
