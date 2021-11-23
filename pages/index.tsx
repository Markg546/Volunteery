import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CountDownTimer from '../src/components/Countdown/Countdown'
import TaskList from '../src/components/TaskList/TaskList'
import { API_URL } from '../src/constants/common'
import { getUntilTime } from '../src/utils/general'

const Index = ({events, tasks, organizations}: {events: any; tasks: any; organizations: any}) => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [location, setLocation] = useState('away')
  const [radius] = useState(100)

  const garage48 = {
    latitude: 47.0188032,
    longitude: 28.83584,
  }

  const hoursMinSecs = {hours: 0, minutes: 10, seconds: 0}

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const showPosition = (position: any) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    if(latitude && longitude){
      const R = 6371e3 // metres
      const φ1 = latitude * Math.PI/180 // φ, λ in radians
      const φ2 = garage48.latitude * Math.PI/180
      const Δφ = (garage48.latitude-latitude) * Math.PI/180
      const Δλ = (garage48.longitude-longitude) * Math.PI/180

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

      const d = R * c // in metres
      if(d < radius){
        setLocation('at Garage 48')
      } else{
        setLocation('away')
      }
    }
  }, [latitude, longitude])

  return(
    <div className="min-h-screen bg-ui-blueish-grey w-full pb-28">
      <div className="bg-ui-white px-6 pt-16 pb-14 rounded-b-2xl mb-12 w-full">
        <div className="absolute top-5 right-14">
          <Image
            alt=""
            src="/images/ui/bigCloud.svg"
            width={118}
            height={60}
          />
        </div>
        <div className="absolute top-24 right-4">
          <Image
            alt=""
            src="/images/ui/smallCloud.svg"
            width={51}
            height={26}
          />
        </div>
        <h4 className="font-Gilroy font-bold text-ui-grey text-h4">
          {"You're now located"}
        </h4>
        <h1 className="font-Gilroy font-extrabold text-ui-black-100 text-h1 relative z-10 mb-6">
          {location}
        </h1>
        <div className="font-Gilroy py-2 px-4 rounded-lg bg-ui-accent-30 text-ui-black text-hours">
        Hours start counting in <span className="font-bold text-brand-dark-blue"><CountDownTimer hoursMinSecs={hoursMinSecs}/></span>
        </div>
      </div>
      <div className="px-6 mb-10">
        {
          organizations.length !== 0 &&
            <>
              {organizations.map((organization: any, index: number) => (<div key={index}>
                <h3 className="font-Gilroy font-bold mb-4 text-ui-coal text-h3">
                  {organization.name === 'Artico' && 'Your current tasks at'} {organization.name}
                </h3>
                <TaskList
                  tasks={tasks.filter((task: any) => task.organization && task.organization.name === organization.name).map((task: any) => task.name)}
                  name={organization.name} until={undefined}
                  bgColor="#B9DAF9" accentColor="#2B6BA7"
                />
              </div>))}
            </>
        }
      </div>
      <div className="px-6">
        {/* <h3 className="font-Gilroy font-bold mb-4 text-ui-coal text-h3">
        Your current events at Artico:
        </h3>
        <TaskList name="City quest" tasks={['Check form', 'Call sponsor #1', 'Print out the hints']} until="13:00"
          bgColor="#B9DAF9" accentColor="#2B6BA7"
        />
        <TaskList name="Language Cafe" tasks={['Meet the international volunteers', 'Find five people to talk in Romanian']}
          until="18:00" bgColor="#B9DAF9" accentColor="#2B6BA7"
        />
        <h3 className="font-Gilroy font-bold mb-4 text-ui-coal text-h3 mt-10">
          Your current events at Artico:
        </h3>
        <TaskList
          name="Youth Moldova"
          tasks={['Realize the partner logo', 'Be at the library for the photoshoot', 'Call Marian for a training session']}
          until="tomorrow" bgColor="#EFDBC2" accentColor="#A98558"
        /> */}
        {
          events.length !== 0 &&
          <>
            <h3 className="font-Gilroy font-bold mb-4 text-ui-coal text-h3">
              Your other events :
            </h3>
            {events.sort((a: any, b: any) => Date.parse(a.end_date) - Date.parse(b.end_date)).map((event: any, index: number) =>
              (<div key={index}>
                <TaskList
                  tasks={tasks.filter((task: any) => task.event && task.event.name === event.name).map((task: any) => task.name)}
                  name={event.name} until={getUntilTime(event.end_date)}
                  bgColor="#EFDBC2" accentColor="#A98558"
                />
              </div>))}
          </>
        }
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const peterRes = await fetch(`${API_URL}/customers?username_eq=Peter`)
  const peter = await peterRes.json()
  const tasksMini = peter[0].tasks.map((task: any) => task.id)

  const tasksRes = await fetch(`${API_URL}/tasks`)
  const tasksRaw = await tasksRes.json()
  const tasks = tasksRaw.filter((taskRaw: any) => tasksMini.includes(taskRaw.id))

  return {
    props: {
      events: peter[0].events,
      tasks,
      organizations: peter[0].organizations,
    },
  }
}

export default Index
