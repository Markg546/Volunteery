import { PropsWithChildren } from 'react'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'

type Props = PropsWithChildren<unknown>

const Layout = ({ children }: Props) => (
  <div>
    <Header/>
    <main>
      {children}
    </main>
    <Navigation/>
  </div>
)

export default Layout
