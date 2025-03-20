import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import "./index.css";
import Home from "./pages/Home";
import SignInPage from "./pages/SingnInPage.jsx"; // Assurez-vous que le chemin est correct
import User from "./pages/User";
import Header from "./components/Header";
import Footer from "./components/Footer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
