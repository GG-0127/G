import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "@/pages/HomePage";
import QuestionBankPage from "@/pages/QuestionBankPage";
import TipsPage from "@/pages/TipsPage";
import RegionPage from "@/pages/RegionPage";
import PositionPage from "@/pages/PositionPage";
import LoginPage from "@/pages/LoginPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/question-bank" element={<QuestionBankPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/region" element={<RegionPage />} />
            <Route
              path="/position"
              element={
                <ProtectedRoute>
                  <PositionPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}