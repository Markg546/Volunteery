import { API_URL } from '../constants/common'

export const getUntilTime = (timeStr: string) => {
  const parsedTime = Date.parse(timeStr)
  const now = Date.now()
  const date = new Date(timeStr)
  if(parsedTime - now < 86400000){
    return date.getHours().toString() + ':00'
  } else if(parsedTime - now < 86400000 * 2){
    return 'tomorrow'
  } else{
    return 'next week'
  }
}

export const updateTask = async (done: boolean, name: string) => {
  const taskRes = await fetch(`${API_URL}/tasks?name_eq=${name}`)
  const task = await taskRes.json()

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      done,
    }),
  }

  await fetch(`${API_URL}/tasks/${task[0].id}`, requestOptions)
}
