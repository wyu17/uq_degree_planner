import { useState, useEffect } from 'react'
import { Page, Degree, SingleDegreesAPI } from '../types/types'
import './styles/RequestDegree.css'
import SelectionGridElement from './SelectionGridElement'
import { addDegree, changePage } from '../reducers/reducers'
import { useAppDispatch } from '../hooks/hooks'

const RequestDegree = () => {
  const [allDegrees, setAllDegrees] = useState<Degree[]>([])
  const [degree, setDegree] = useState('')
  const [degreeGrid, setDegreeGrid] = useState<Degree[]>([])

  const dispatch = useAppDispatch()

  const searchDegrees = (degrees: Degree[], search: string) => {
    const lowerCaseSearch : string = search.toLowerCase()
    const newDegreeGrid : Degree[] = []
    for (const degree of degrees) {
      const degreeName: string = degree.name.toLowerCase()
      if (degreeName.includes(lowerCaseSearch)) {
        newDegreeGrid.push(degree)
      }
    }
    return newDegreeGrid
  }

  useEffect(() => {
    fetch('/singleDegrees').then(response => response.json()).then(data => {
      const degrees = data.map((x : SingleDegreesAPI) => {
        const degree: Degree = {
          code: x.dcode,
          name: x.name,
          units: x.units,
          majorCodes: [],
          minorCodes: [],
          extendedMajorCodes: [],
          currentUnits: 0,
          constraints: x.degreeConstraints
        }
        return degree
      })
      setAllDegrees(degrees)
      setDegreeGrid(degrees)
    })
  }, [])

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue : string = event.target.value
    setDegree(newSearchValue)
    const newDegrees: Degree[] = searchDegrees(allDegrees, newSearchValue)
    setDegreeGrid(newDegrees)
  }

  return (
        <div className = "RequestDegree">
            <form onSubmit = { handleSubmission }>
                <label>
                    <input className = "degreeForm" value = {degree} type = "text" name = "degree"
                    placeholder = "Search for your degree (e.g Science, Arts, Engineering)" onChange = { handleChange }/>
                </label>
            </form>
            <div className = 'DegreeGrid'>
                {degreeGrid.map((degree) => <SelectionGridElement key={degree.name} className = "SelectionGridElement" name = {degree.name} onClick = {() => {
                  dispatch(addDegree(degree))
                  dispatch(changePage(Page.RequestDegreeType))
                }}/>)}
            </div>
        </div>
  )
}

export default RequestDegree
