import classNames from 'classnames'
import styles from './Error.module.scss'

const Error = () => (
  <div className={classNames('w-full h-screen flex flex-row justify-center items-center', styles.error_bg)}>
    {/* eslint-disable-next-line @next/next/no-img-element*/}
    <img src="/images/ui/upperCircle.png" className="absolute top-0 right-260px w-412px" alt=""></img>
    <div className="font-Gilroy font-black text-corner-logo text-black absolute top-24 left-28">
      v<span className="text-brand-dark-blue">o</span>lunteery
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element*/}
    <img src="/images/ui/lowerCircle.png" className="absolute bottom-0 left-412px w-260px h-28" alt=""></img>
    <div className="font-Gilroy font-bold text-big-text text-black text-center">
      sorry, desktop app not available
    </div>
  </div>
)

export default Error
