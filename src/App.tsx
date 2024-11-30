import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AppLayout } from './components/AppLayout';
import { TrainingInterface } from './components/TrainingInterface';
import { GenerationInterface } from './components/GenerationInterface';

function App() {
  const [isSignedUp, setIsSignedUp] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            !isSignedUp ? (
              <LandingPage onGetStarted={() => setIsSignedUp(true)} />
            ) : (
              <Navigate to="/train" replace />
            )
          } 
        />
        
        {isSignedUp && (
          <Route element={<AppLayout />}>
            <Route path="/train" element={<TrainingInterface />} />
            <Route path="/generate" element={<GenerationInterface />} />
          </Route>
        )}

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;