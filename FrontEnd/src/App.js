import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Post from "./Component/Post";
import SignUpPage from "./Component/SignUpPage";
import Main from './Component/Main';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="signup" element={<SignUpPage/>} />
          <Route path="main" element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
