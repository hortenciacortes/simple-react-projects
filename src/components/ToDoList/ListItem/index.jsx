import { useState } from 'react';
import { Check, PencilLine, Trash } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import './styles.scss';

export function ListItem({ task, indexItem, isDone, list, setList }) {
  const [updateTask, setUpdateTask] = useState(task);
  
  function handleEditInput(id, isEdit) {
    document.querySelectorAll('input[type="text"].input-task').forEach((item) => {
      item.readOnly = true;
      item.style = 'border-color: transparent';
      item.parentElement.classList.remove('message');
    })
    const inputSelected = document.getElementById(id);
    isEdit ? inputSelected.parentElement.classList.add('message') : inputSelected.parentElement.classList.remove('message');
    inputSelected.readOnly = !isEdit;
    inputSelected.focus();
    inputSelected.style = `border-color: ${isEdit ? '#468a9d63' : 'transparent'}`;
  }

  function handleUpdateTask(e, id) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const newList = list.map((item) => {
        updateTask === '' && item.id === id && setUpdateTask(item.task);
        
        return {
          id: item.id,
          task: item.id === id ? updateTask : item.task,
          isDone: item.isDone
        }
      })

      setList(newList);
      handleEditInput(id, false)
    }
  }

  function handleRemoveTask(id) {
    const newList = list.filter((item) => item.id !== id).map((item) => {
      return {
        id: item.id,
        task: item.task,
        isDone: item.isDone
      }
    })
    setList(newList);
  }

  function handleEditTaskCheck(isChecked, id) {
    const newList = list.map((item) => {
      return {
        id: item.id,
        task: item.task,
        isDone: item.id == id ? isChecked : item.isDone
      }
    })
    setList(newList);
  }

  return (
    <div className={isDone ? 'task isDone' : 'task'}>
      
      <div className='inputs'>
        <input
          type="text" value={updateTask} className="input input-task" id={indexItem}
          readOnly
          style={{borderColor: 'transparent'}}
          onChange={e => setUpdateTask(e.target.value)}
          onKeyUp={e => handleUpdateTask(e, indexItem)}
        />
        <Checkbox.Root
          className="checkbox"
          checked={isDone}
          onCheckedChange={(checked) => handleEditTaskCheck(checked, indexItem) }
        >
          <Checkbox.Indicator>
            {isDone && <Check className="checkbox-icon" weight="bold" />}
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div>
        <PencilLine 
          className='icon'
          size={26} color="#04A0D9" weight="bold" 
          onClick={() => handleEditInput(indexItem, true)} 
        />
        <Trash
          className='icon' 
          size={26} color="#843453" weight="bold"
          onClick={() => handleRemoveTask(indexItem)} 
        />
      </div>
    </div>
  )
}