import {React} from 'react'
import Map from './Map'
import Listbar from "./Listbar";





const Content = ({ship}) => {


  return (
    <>
    <Listbar ship={ship}/>
    <Map ship={ship} />
    </>)
}

export default Content