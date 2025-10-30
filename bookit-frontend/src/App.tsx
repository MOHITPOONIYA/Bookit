import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // 1. Import useState
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
import Header from './components/Header';

function App() {
  // 2. Add state here to share
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 3. Pass the *setter* to the Header */}
      <Header  setSearchTerm={setSearchTerm} />
      <main>
        <Routes>
          {/* 4. Pass the *value* to the Home page */}
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;