import './App.css';
import A from './paginas/a'
import B from './paginas/b'
import C from './paginas/c'
import D from './paginas/d'
import E from './paginas/e'
import F from './paginas/f'
import  Nav from './Nav';
import Error404 from './paginas/Error404';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className='principal'>
        <Routes>
          <Route path='/' element={<A/>} />   
          <Route path='/pagina1' element={<A/>} />
          <Route path='/pagina2' element={<B/>} />
          <Route path='/pagina3' element={<C/>} />
          <Route path='/pagina4' element={<D/>} />
          <Route path='/pagina5' element={<E/>} />
          <Route path='/pagina6' element={<F/>} />
          <Route path='*' element={<Error404/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;