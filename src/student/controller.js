const pool = require('../../db')
const queries = require('./queires')

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send('Email already exists')
      return
    }

    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error
        res.status(201).send('Student created successfully!')
      }
    )
  })
}

const getStudentsById = (req, res) => {
  const { id } = req.params
  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const updateStudent = (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (error) throw error
    const noStudentFound = !results.rows.length
    if (noStudentFound) {
      res.send('Student does not exist, could not update.')
    }

    pool.query(queries.updateStudent, [name, email, id], (error, results) => {
      if (error) throw error
      res.status(200).send('Student updated successfully.')
    })
  })
}

const removeStudent = (req, res) => {
  const { id } = req.params
  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (error) throw error
    const noStudentFound = !results.rows.length
    if (noStudentFound) {
      res.send('Student does not exist, could not remove from database.')
    }

    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error
      res.status(200).send('Student removed from database.')
    })
  })
}

module.exports = {
  getStudents,
  getStudentsById,
  addStudent,
  removeStudent,
  updateStudent,
}
