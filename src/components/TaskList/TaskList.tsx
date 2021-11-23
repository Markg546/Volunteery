import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { updateTask } from '../../utils/general'
import styles from './TaskList.module.scss'

type Props = {
  tasks: string[]
  name: string
  until: string | undefined
  bgColor: string
  accentColor: string
}

const Task = (text: string, index: number) => {
  const [checked, setChecked] = useState(false)

  // useEffect(() => {
  //   updateTask(checked, text)
  // }, [checked])

  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    updateTask(checked, text)
  }, [checked])

  return(
    <li className={classNames('mb-2 last:mb-8',  styles.globalContainer)} key={index} onClick={() => setChecked(!checked)}>
      <label className={classNames(styles.container, 'flex flex-row justify-start items-center')}>
        <input type="checkbox" className={styles.checkbox}/>
        <span className={styles.checkmark}></span>
        <span className={classNames('font-Gilroy font-medium text-ui-black text-checkbox', styles.text)}>{text}</span>
      </label>
    </li>
  )
}

const TaskList = ({tasks, name, until, bgColor, accentColor}: Props) => {

  const [open, setOpen] = useState(false)

  return(
    <div className="rounded-2xl overflow-hidden mb-2" style={{backgroundColor: bgColor}} onClick={() => setOpen(!open)}>
      <div className="flex flex-row justify-between items-center px-4 py-3">
        <div className="font-Gilroy font-bold text-ui-black text-card-name">
          {name}
        </div>
        <div className="flex flex-row justify-end items-center">
          <div className="font-Gilroy text-hours font-medium mr-2" style={{color: accentColor}}>
            {until && `until ${until}`}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className={classNames('transition-transform duration-300 h-6 w-6 text-ui-black',
            open? 'transform rotate-90 transition-transform duration-300' : 'transform rotate-0')}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <ul className={classNames('px-4 transition-all duration-300 max-h-0', open? 'max-h-40' : 'max-h-0')}>
        {tasks.map(Task)}
      </ul>
    </div>
  )
}

export default TaskList
