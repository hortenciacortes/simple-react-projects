import { useState } from 'react';
import './styles.scss';

export function ListItem({ task, indexItem, isChecked, list, setList }) {
  const [updateTask, setUpdateTask] = useState(task);
  
  function handleEdit(id) {
    document.querySelectorAll('input[type="text"].input-task').forEach((item, i) => {
      item.readOnly = true
      item.style = `border-color: transparent; text-decoration: ${list[i].isChecked ? 'line-through' : 'none'}`;
      item.parentElement.classList.remove('message');
    })

    const inputSelected = document.getElementById(id)
    inputSelected.parentElement.classList.add('message');
    inputSelected.readOnly = false;
    inputSelected.focus();
    inputSelected.style = `border-color: #58c4e2}`
  }
  
  function handleKeyUp(e, id) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const newList = list.map((item, index) => {
        updateTask === '' && id === index && setUpdateTask(item.task);
        
        return {
          id: item.id,
          task: id === index ? updateTask : item.task,
          isChecked: item.isChecked
        }
      })

      setList(newList);

      const inputSelected = document.getElementById(id)
      inputSelected.parentElement.classList.remove('message');
      inputSelected.readOnly = true;
      inputSelected.style = `border-color: transparent; text-decoration: ${list[id].isCheck ? 'line-through' : 'none'}`;
    }
  }

  function handleDelete(id) {
    console.log(id)
    const newList = list.filter((item, index) => index !== id).map((item) => {
      return {
        id: item.id,
        task: item.task,
        isChecked: item.isChecked
      }
    })
    setList(newList);
  }

  function handleCheck(isChecked, id) {
    const newList = list.map((item, index) => {
      return {
        id: item.id,
        task: item.task,
        isChecked: index == id ? isChecked : item.isChecked
      }
    })
    setList(newList);
  }

  return (
    <div className='all-tasks'>
      <div className='task'>
        <label htmlFor={indexItem}>
          <input 
            type="text" value={updateTask} className="input input-task" id={indexItem}
            readOnly
            style={{
              textDecoration: isChecked ? 'line-through' : 'none',
              borderColor: 'transparent'
            }}
            onChange={e => setUpdateTask(e.target.value)}
            onKeyUp={e => handleKeyUp(e, indexItem)}
          />
          <input 
            type='checkbox' name='tasks' id='isDone'
            checked={isChecked}
            onChange={ (e) => handleCheck(e.target.checked, indexItem) }
          />
        </label>
        <div>
          <img src="src/assets/edit.png" alt="Icone de edição" onClick={ () => {handleEdit(indexItem)} } />
          <img src="src/assets/delete.png" alt="Icone de exclusão" onClick={ () => handleDelete(indexItem) } />
        </div>
      </div>
    </div>
  )
}