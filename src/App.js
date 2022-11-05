import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ArticleListPage from "./pages/ArticleListPage";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";

function App() {
  return (
   <BrowserRouter>
       <div className= "App">
          <NavBar></NavBar>
           <div id = "page-body">
               <Routes>
                  <Route path="/" element={<HomePage />}  />
                   <Route path="/about" element={<AboutPage />} />
                  <Route path="/articles" element={<ArticleListPage />}  />
                  <Route path="/articles/:articleId" element={<ArticlePage />}  />
                  <Route path="*" element={<NotFoundPage />} />
               </Routes>

           </div>
       </div>
   </BrowserRouter>
  );
}

export default App;

