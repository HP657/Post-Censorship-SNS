import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./Component/Post";
import SignUpPage from "./Component/SignUpPage";
import SignInPage from "./Component/SignInPage";
import Main from "./Component/Main";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Post />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
