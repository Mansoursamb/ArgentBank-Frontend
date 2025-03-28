import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store, { persistor } from "./redux/store";
import "./index.css";
import Home from "./pages/Home";
import SignInPage from "./pages/SingnInPage.jsx"; // Assurez-vous que le chemin est correct
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserContent from "./components/UserContent.jsx";
import User from "./pages/User.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/user" element={<UserContent />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
