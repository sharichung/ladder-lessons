import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import { SubscriptionProvider } from "./lib/SubscriptionContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navigation from "./components/layout/Navigation";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import GroupView from "./pages/GroupView";
import MatchingGame from "./pages/MatchingGame";
import SpellingGame from "./pages/SpellingGame";
import PricingPage from "./pages/PricingPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import TestPage from "./TestPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // This is a placeholder for actual login status check
    // In a real app, you'd check Firebase auth state here
    const checkLoginStatus = () => {
      const user = localStorage.getItem("user"); // Example: check for a user token
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/group/:groupId"
              element={
                <ProtectedRoute>
                  <GroupView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matching-game/:groupId"
              element={
                <ProtectedRoute>
                  <MatchingGame />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spelling-game/:groupId"
              element={
                <ProtectedRoute>
                  <SpellingGame />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;


