import { useEffect }from 'react'
import { useStudentContext } from "../hooks/useStudentContext"

// components
import StudentDetails from '../components/StudentDetails'
import StudentForm from '../components/StudentForm'

const Home = () => {
  const {students, dispatch} = useStudentContext()

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/students')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_STUDENTS', payload: json})
      }
    }

    fetchStudents()
  }, [dispatch])

  return (
    <div className="home">
      <div className="students">
        {students && students.map((student) => (
          <StudentDetails key={student._id} student={student} />
        ))}
      </div>
      <StudentForm />
    </div>
  )
}

export default Home