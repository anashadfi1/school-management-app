import { StudentContext } from '../context/StudentContext'
import { useContext } from 'react'

export const useStudentContext = () => {
  const context = useContext(StudentContext)

  if (!context) {
    throw Error('useStudentContext must be used inside an StudentContextProvider')
  }

  return context
}