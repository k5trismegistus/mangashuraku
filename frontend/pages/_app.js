import './styles.css'
import { RecoilRoot } from 'recoil'

const App = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App