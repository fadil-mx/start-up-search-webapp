import React from 'react'
import Pink from './pink'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeclient } from '@/sanity/lib/Write-client';
import { unstable_after as after } from 'next/server'
const View = async({ id }: { id: string }) => {

  const  views = await client.fetch(STARTUP_VIEWS_QUERY, {id})
  console.log(views.view);

  after(async()=>
    await writeclient
  .patch(id)
  .set({view:views.view+1})
  .commit()
)

  
  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Pink />
      </div>
      <p className='view-text'>
        <span className="font-black">views:{views.view}</span>
      </p>
    </div>
  )
}

export default View
