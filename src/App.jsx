import { Header } from './components/Header';
import { ToDoList } from './projects/ToDoList';
import { Stopwatch } from './projects/Stopwatch';

function App() {  
  return (
    <div className='grid-pattern'>
      <Header />
      <ToDoList />
      <Stopwatch />
      <ToDoList /> 
    </div>
  )
}

export default App
