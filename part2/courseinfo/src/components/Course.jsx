

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {


  let sum = parts.reduce(
    (accumulator, parts) => accumulator + parts.exercises, 0
  );
  return (
    <b>
      total of exercises {sum}
    </b>
  )


}

const Part = ({ part }) => {
  console.log(part.name)
  return (

    <p>
      {part.name} {part.exercises}
    </p>

  )
}
  
  
const Content = ({ parts }) => {
  console.log(parts)
  return (
    <>
      {parts.map((parts, idx) => <Part key={idx} part={parts} />)}
    </>
  )


}


const Course = ({ course }) => {
  return (
    <>

      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
    
  )
  
  
}

export default Course