import { Header } from './components/Header';
import { ToDoList } from './projects/ToDoList';
import { Stopwatch } from './projects/Stopwatch';
import { ApiCep } from './projects/ApiCep';

function App() {  
  return (
    <div className='grid-pattern'>
      <Header />
      <ToDoList />
      <Stopwatch />
      <ApiCep />
    </div>
  )
}

export default App
