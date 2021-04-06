import SplashPage from './Pages/SplashPage'

const PageHandler = (props) => {
  return <>{props.page == '0' && <SplashPage></SplashPage>}</>
}

export default PageHandler
