import Course from './components/Course'



const App = ({ courses }) => {
  
  return (
    <div>
      {courses.map((course, idx) => <Course key={idx} course={course} />)}
    </div>

  )
}

export default App