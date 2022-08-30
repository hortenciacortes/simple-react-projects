import { Header } from './components/Header';
import { ToDoList } from './projects/ToDoList';

function App() {  
  return (
    <div className='grid-pattern'>
      <Header />
      <ToDoList />
    </div>
  )
}

export default App
