"use client"
import Link from 'next/link'

const Searchform = () => {
    const reset=()=>{
        const form=document.querySelector(".search-form") as HTMLFormElement;
        if(form) form.reset();
    }
  return (
    <div>
      <button type='reset' onClick={reset}>
        <Link href="/" className='search-btn text-white' >X</Link>
      </button>
    </div>
  )
}

export default Searchform
