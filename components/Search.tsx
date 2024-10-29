import React from 'react'
import Form from 'next/form'
import Searchform from './Searchform'
import {Search} from "lucide-react";



const Searchbar = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className='search-form'>
      <input name="query" defaultValue={query} type="text" placeholder="Search" className='search-input' />
      <div className="flex gap-2">
      {query &&   <Searchform/>}

    
      <button type='submit' className='search-btn text-white'> 
        
      <Search className="size-5" />
      </button>
      </div>
  </Form>
  )
}

export default Searchbar

