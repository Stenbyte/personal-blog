import "./App.css";
import { useState } from 'react';
import { LoginModal } from "./LoginModal";
import { Articles } from "./Articles";
import { Header } from "./Header";



function App() {

  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div className="App">
      <Header setOpenModal={setOpenModal} />
      <Articles />
      {isOpenModal && <LoginModal setOpenModal={setOpenModal} />}
    </div >
  );
}

export default App;
