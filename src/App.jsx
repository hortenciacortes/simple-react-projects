import { Header } from './components/Header';
import { ToDoList } from './projects/ToDoList';
import { Stopwatch } from './projects/Stopwatch';

function App() {  
  return (
    <div className='grid-pattern'>
      <Header />
      <ToDoList />
      <Stopwatch />
    </div>
  )
}

export default App
