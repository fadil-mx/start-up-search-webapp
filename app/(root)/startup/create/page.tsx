import { auth } from "@/auth"
import StartForm from "@/components/StartForm"
import { redirect } from "next/dist/server/api-utils"


const page = async() => {
  const session=await auth()
  if(!session) redirect('/')
    
  return (
  <>
   <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>
    <StartForm />
  </>
  )
}

export default page
