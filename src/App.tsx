import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import HomePage from "@/pages/HomePage";
import QuestionBankPage from "@/pages/QuestionBankPage";
import TipsPage from "@/pages/TipsPage";
import RegionPage from "@/pages/RegionPage";
import PositionPage from "@/pages/PositionPage";

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
            <Route path="/position" element={<PositionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}