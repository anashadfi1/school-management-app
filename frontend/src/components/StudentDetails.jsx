import { useStudentContext } from '../hooks/useStudentContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const StudentDetails = ({ student }) => {
  const { dispatch } = useStudentContext()

  const handleClick = async () => {
    const response = await fetch('/api/students/' + student._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_STUDENT', payload: json})
    }
  }

  return (
    <div className="student-details">
      <h4>{student.title}</h4>
      <p><strong>Load (kg): </strong>{student.load}</p>
      <p><strong>Reps: </strong>{student.reps}</p>
      <p>{formatDistanceToNow(new Date(student.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default StudentDetails