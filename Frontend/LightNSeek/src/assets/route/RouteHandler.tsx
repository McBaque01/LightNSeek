import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Landing } from '../component/Landing'
import { Hero } from '../component/Hero'


export const RouteHandler = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing/>} />
        <Route path='/Hero' element={<Hero/>}/>
         
      </Routes>
  </BrowserRouter>
  )
}
