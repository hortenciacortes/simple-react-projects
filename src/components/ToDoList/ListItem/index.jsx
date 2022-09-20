import { useState } from 'react';
import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import './styles.scss';

export function ListItem({ task, indexItem, isChecked, list, setList }) {
  const [updateTask, setUpdateTask] = useState(task);
  
  function handleEdit(id) {
    document.querySelectorAll('input[type="text"].input-task').forEach((item, i) => {
      item.readOnly = true
      item.style = `border-color: transparent; text-decoration: ${list[i].isChecked ? 'line-through' : 'none'}`;
      item.parentElement.classList.remove('message');
    })
    handleInput(id, true);
  }
  
  function handleInput(id, isEdit) {
    const inputSelected = document.getElementById(id)
    inputSelected.parentElement.classList.toggle('message');
    inputSelected.readOnly = !isEdit;
    inputSelected.focus();
    inputSelected.style = `border-color: ${isEdit ? '#58c4e2' : 'transparent'}; text-decoration: ${list[id].isChecked ? 'line-through' : 'none'}`
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
      handleInput(id, false)
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
        <div className='inputs'>
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
          <Checkbox.Root
            className="checkbox"
            checked={isChecked}
            onCheckedChange={(checked) => handleCheck(checked, indexItem) }
          >
            <Checkbox.Indicator>
              {isChecked === true && <Check className="checkbox-icon" weight="bold" />}
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>
        <div>
          <img src="src/assets/edit.png" alt="Icone de edição" onClick={ () => {handleEdit(indexItem)} } />
          <img src="src/assets/delete.png" alt="Icone de exclusão" onClick={ () => handleDelete(indexItem) } />
        </div>
      </div>
    </div>
  )
}