import {Header} from "./components/header/header";
import {NewsList} from "./components/news-list/news-list";
import { Routes, Route } from "react-router-dom";
import {SingleNews} from "./components/single-news/single-news";

function App() {
    

    return (
    <div className="App">
        <Header/>
        <main>
            <Routes>
                <Route path='/' element={<NewsList/>}/>
                <Route path=":uuid" element={<SingleNews />} />
                
            </Routes>
        </main>
    </div>
  );
}

export default App;
