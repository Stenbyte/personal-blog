import "./App.css";
import { useState } from 'react';
import { LoginModal } from "./LoginModal";
import { Main } from "./Main";
import { Header } from "./Header";



function App() {

  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div>
      <Header setOpenModal={setOpenModal} />
      <Main />
      {isOpenModal && <LoginModal setOpenModal={setOpenModal} />}
    </div >
  );
}

export default App;
