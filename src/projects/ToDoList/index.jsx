import { useState } from 'react';
import { ListChecks, ListBullets, ChartBar, FilePlus } from 'phosphor-react';
import uuid from 'react-uuid';
import ProgressBar from "@ramonak/react-progress-bar";

import { ListItem } from '../../components/ToDoList/ListItem';
import { Storage } from '../../storage';
import './styles.scss';

export function ToDoList() {
  const [list, setList] = useState(Storage.get('tasksList'));
  const numberTaskDone = list.filter(item => item.isDone).length;
  
  function addNewTask(e) {
    e.preventDefault();
    const inputValue = document.querySelector('input');
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e._reactName === 'onClick') {
      if (inputValue.value !== '') {
        const newTask = inputValue.value;
        setList(prevent => [...prevent, {
          id: uuid(), 
          task: newTask, 
          isDone: false
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
      
      <div className='contain-tasks'>

        <div className='tasks'>  
          <div className='new-task header-task'>
            <h4>
              <FilePlus size={26} color="#04a0d9" weight="bold" />
              Adicionar nova tarefa
            </h4>
            <div className="form">
              <input
                type='text' className='input'
                placeholder='Nova tarefa'
                onKeyUp={e => addNewTask(e)}
              />
              <button className='submit' onClick={addNewTask}>Adicionar</button>
            </div>
          </div>

          <h3> 
            <ListBullets size={32} weight="bold" /> 
            Tarefas pendentes
          </h3>

          {list.filter(task => !task.isDone).map((task) => (
            <ListItem key={task.id}
              task={task.task} indexItem={task.id} 
              isDone={false}
              list={list}
              setList={setList}
            />
          ))}
        </div>

        <div className='tasks'>
          <div className='header-task'>
            <h4>
              <ChartBar size={26} color="#04a0d9" weight="bold" /> 
              Progresso
            </h4>

            <ProgressBar 
              completed={Number((numberTaskDone * 100 / list.length).toFixed())} 
              bgColor="#04A0D9"
            />
          </div>
          
          <h3> 
            <ListChecks size={32} weight="bold" /> 
            Tarefas concluídas
          </h3>

          {list.filter(task => task.isDone).map((task) => (
            <ListItem key={task.id}
              task={task.task} indexItem={task.id} 
              isDone={true}
              list={list}
              setList={setList}
            />
          ))}
        </div>

      </div>
    </section>
  )
}