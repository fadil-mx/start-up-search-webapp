import React from 'react'

const page = async ({params}:{params:promise<{id:string}>}) => {
    const {id} =(await  params)

  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}

export default page
