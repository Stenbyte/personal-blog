import "./App.css";
import "./Article.css";
import { useState } from 'react';
import LoginModal from "./LoginModal";

const articles = [
  {
    id: 1,
    text: 'Some article text here'
  }, {
    id: 2,
    text: 'Working on a project'
  }
]

function App() {

  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">My Blog</div>
        <nav className="App-nav">
          <a href="/" style={{ color: "white" }}>Home</a>
          <button className="App-login-btn" onClick={() => setOpenModal(true)}>Login</button>
        </nav>
      </header>
      <div className="article-list">
        {articles.map((art) => (
          <div className="article-item" key={art.id}>
            {art.text}
          </div>
        ))}
      </div>
      <LoginModal isOpen={isOpenModal} onClose={() => setOpenModal(false)} />
    </div >
  );
}

export default App;
