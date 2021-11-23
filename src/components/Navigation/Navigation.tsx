import classNames from 'classnames'
import { useRouter } from 'next/dist/client/router'
import { NAVIGATION } from '../../constants/navigation'
import Link from 'next/link'

const NavLink = (text: string, index: number, route: string) => (
  <Link href={NAVIGATION[text].route}>
    <a>
      <div className={classNames('h-15 w-28 flex flex-col justify-between items-center py-2 rounded-2xl',
        route === NAVIGATION[text].route ? 'bg-ui-accent-10' : '')} key={index}
      >
        <div className={classNames('w-6 h-6', route === NAVIGATION[text].route ? 'text-brand-dark-blue' : 'text-ui-black')}>
          {NAVIGATION[text].svg}
        </div>
        <div className={classNames('font-Gilroy font-bold text-ui-black text-button-md text-center',
          route === NAVIGATION[text].route ? 'text-brand-dark-blue' : '')}
        >
          {text}
        </div>
      </div>
    </a>
  </Link>
)

const Navigation = () => {
  const router = useRouter()
  const route = router.pathname

  return(
    <div className="fixed bottom-0 h-20 w-full">
      <div className="w-full bg-ui-white rounded-t-2xl h-full px-6 flex flex-row justify-between items-center">
        {Object.keys(NAVIGATION).map((text: string, index: number) => NavLink(text, index, route))}
      </div>
    </div>
  )
}

export default Navigation
