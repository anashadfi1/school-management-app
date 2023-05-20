import { useState } from "react"
import { useStudentContext } from "../hooks/useStudentContext"

const StudentForm = () => {
  const { dispatch } = useStudentContext()
  const [cne, setCne] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [filliere, setFilliere] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const student = {nom, prenom, filliere}

    const response = await fetch('/api/students', {
      method: 'POST',
      body: JSON.stringify(student),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setNom('')
      setPrenom('')
      setFilliere('')
      setError(null)
      setEmptyFields([])
      console.log('new student added', json)
      dispatch({type: 'CREATE_STUDENT', payprenom: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New student</h3>

      <label>CNE:</label>
      <input 
        type="text"
        onChange={(e) => setCne(e.target.value)}
        value={cne}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>First Name:</label>
      <input 
        type="text"
        onChange={(e) => setNom(e.target.value)}
        value={nom}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Last Name:</label>
      <input 
        type="text"
        onChange={(e) => setPrenom(e.target.value)}
        value={prenom}
        className={emptyFields.includes('prenom') ? 'error' : ''}
      />

      <label>filliere:</label>
      <input 
        type="number"
        onChange={(e) => setFilliere(e.target.value)}
        value={filliere}
        className={emptyFields.includes('filliere') ? 'error' : ''}
      />

      <button>Add student</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default StudentForm