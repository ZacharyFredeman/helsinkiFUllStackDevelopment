const Course = ({course}) => {
  console.log(course)

  const result = course.parts.map(parts=> parts.id)
  console.log(result)

  return(
    <div>
      <h2>{course.name}</h2>
      <div>
        {course.parts.map(parts => 
          <Part key = {parts.id} part={parts}/>
        )}

        <TotalExercises parts = {course.parts}/>
      </div>


    </div>
  )
}

const Part = ({part}) => {
  return<p>{part.name}  {part.exercises}</p>
}

const TotalExercises = ({parts}) =>{
  const excerises = parts.map(parts=> parts.exercises)
  console.log(excerises)
  // const total = excerises.reduce((s,p) =>{
  //   console.log("what", s, p)
  //   return(s+p)
  // })
  const total = excerises.reduce((totalR, current) => totalR + current)
  console.log(total);
  return(
  <b>total of {total} exercises</b>
  )
}

export default Course