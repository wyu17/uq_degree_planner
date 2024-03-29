import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { selectPage, resetState } from '../reducers/reducers'
import { Page } from '../types/types'
import RequestDegree from './RequestDegree'
import RequestDegreeType from './RequestDegreeType'
import RequestMajor from './RequestMajor'
import Timetable from './DisplayTimetable'
import RequestNewDegree from './RequestNewDegree'
import ResetButton from './ResetButton'
import ResetBox from './ResetBox'
import './styles/DisplayWindow.css'

const Display = () => {
  const dispatch = useAppDispatch()
  const [reset, setReset] = useState(false)

  const resetPlanner = () => {
    setReset(true)
  }

  const resetHandler = (resetBox : boolean) => {
    if (resetBox) {
      dispatch(resetState())
    }
    setReset(false)
  }

  const page = useAppSelector(selectPage)
  let displayType: JSX.Element
  if (page === Page.RequestDegree) {
    displayType = <RequestDegree/>
  } else if (page === Page.RequestDegreeType) {
    displayType = <RequestDegreeType/>
  } else if (page === Page.RequestMajor) {
    displayType = <RequestMajor/>
  } else if (page === Page.RequestNewDegree) {
    displayType = <RequestNewDegree/>
  } else {
    displayType = <Timetable/>
  }

  return (
        <div className = "Display">
        <div className = "InnerDisplay"> {displayType} </div>
        {reset && <div className = "ResetBox"> <ResetBox handler = { resetHandler }/> </div>}
        {!reset && <div className = "ResetButton" onClick = { resetPlanner } > <ResetButton /> </div>}
        </div>
  )
}

export default Display
