import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './compoents/Header/Header';
import  './App.css';
import Footer from './compoents/Footer/Footer';
import Home from './pages/Home';

function App() {

  return (
    <div className='App'>
      <Header/>
      <main>
     <Home/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;

