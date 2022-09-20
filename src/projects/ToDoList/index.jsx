import { useState } from 'react';
import { ListItem } from '../../components/ToDoList/ListItem';
import { Storage } from '../../storage';
import './styles.scss';

export function ToDoList() {
  const [list, setList] = useState(Storage.get());

  function addNewTask(e) {
    e.preventDefault();
    const inputValue = document.querySelector('input');
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e._reactName === 'onClick') {
      if (inputValue.value !== '') {
        const newTask = inputValue.value;
        setList(prevent => [...prevent, {
          id: list.length ===  0 ? 0 : list[list.length -1].id + 1, 
          task: newTask, 
          isChecked: false
        }]);
        e.target.blur();
        inputValue.value = '';
      } else {
        inputValue.focus();
      }
    }
  }
  
  Storage.set('tasksList', list)
  console.log(list)

  return (
    <section className='container'>
      <div className='title'>
        <img src='src/assets/to-do-list.png' alt='Imagem de um papel escrito TO DO' />
        <h2>Lista de Tarefas</h2>
      </div>
      
    <div className='list-item'>
      <div className='new-task'>
        <input 
          type='text' className='input' 
          onKeyUp={e => addNewTask(e)}
        />
        <button className='submit' onClick={addNewTask}>Adicionar</button>
      </div>
      {list.map((item, index) => (
        <ListItem key={item.id}
          task={item.task} indexItem={index} 
          isChecked={item.isChecked}
          list={list}
          setList={setList}
        />
      ))}
    </div>
    </section>
  )
}