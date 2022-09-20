import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { ListChecks, ListBullets } from 'phosphor-react';

import { ListItem } from '../../components/ToDoList/ListItem';
import { Storage } from '../../storage';
import './styles.scss';

export function ToDoList() {
  const [list, setList] = useState(Storage.get('tasksList'));
  const [listChecked, setListChecked] = useState([]);
  const [listToDo, setListToDo] = useState([]);

  useEffect(() => {
    function handleList() {
      setListChecked([]);
      setListToDo([]);
  
      list.map(item => {
        if(item.isChecked) {
          setListChecked(prevent => [...prevent, item]);
        }else {
          setListToDo(prevent => [...prevent, item]);
        }
      })
    }
    
    handleList()
  }, [list])

  function addNewTask(e) {
    e.preventDefault();
    const inputValue = document.querySelector('input');
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e._reactName === 'onClick') {
      if (inputValue.value !== '') {
        const newTask = inputValue.value;
        setList(prevent => [...prevent, {
          id: uuid(), 
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

  return (
    <section className='container'>
      <div className='title'>
        <img src='src/assets/to-do-list.png' alt='Imagem de um papel escrito TO DO' />
        <h2>Lista de Tarefas</h2>
      </div>
      
      <div className='new-task'>
        <input 
          type='text' className='input' 
          onKeyUp={e => addNewTask(e)}
        />
        <button className='submit' onClick={addNewTask}>Adicionar</button>
      </div>

    <div className='list-item'>
      <div className='contain-tasks'>
        <div className='all-tasks'>
          <h3> 
            <ListBullets size={32} weight="bold" /> 
            Tarefas pendentes
          </h3>

          {listToDo.map((item, index) => (
            <ListItem key={item.id}
              task={item.task} indexItem={item.id} 
              isChecked={false}
              list={list}
              setList={setList}
            />
          ))}
        </div>

        <div className='all-tasks'>
          <h3> 
            <ListChecks size={32} weight="bold" /> 
            Tarefas concluídas
          </h3>

          {listChecked.map((item) => (
            <ListItem key={item.id}
              task={item.task} indexItem={item.id} 
              isChecked={true}
              list={list}
              setList={setList}
            />
          ))}
        </div>
      </div>
    </div>
    </section>
  )
}