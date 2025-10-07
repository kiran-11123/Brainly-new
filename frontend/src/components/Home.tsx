
import { Button } from './Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from 'lucide-react'
import { ShareIcon_1 } from '../icons/ShareIcon_1'
import Card from './Card'
import { useEffect, useState } from 'react'
import CreateContentModel from './CreateContentModel'
import axios from 'axios'

import Sidebar from './Sidebar'

interface ContentItem {
  type: "twitter" | "youtube" | "file" | "note";
  description: string;
  link: string;
  title: string;
}
export default function Home() {

  const[modelOpen , setOpenModel] = useState(false);
  const[contents,setContents]=useState<ContentItem[]>([]);
  const [isfound, setIsfound] = useState(false);


  useEffect(()=>{

    async function getData() {

      const response = await axios.get("http://localhost:3000/api/v1/data/content",{
        withCredentials:true
      } );

      if(response.status===200){
           setContents(response.data.result)
           setIsfound(true);
      }
      
      
    }

  },[])


  return (


      <div  className='flex'>

        <Sidebar />

        <div className='p-4 flex-1'> 

      

      <CreateContentModel open={modelOpen} Onclose={()=>{
        setOpenModel(false)
      }}  />

   <div className='flex justify-end  gap-4'>



      <Button 
         variant="secondary" 
         startIcon={<ShareIcon_1  size={"md"} /> }
        text="Share Brain" 
        size="md" 
        //onClick={() => setOpenModel(true)} 
        />

           <Button 
         variant="primary" 
         startIcon= {<PlusIcon  size={"md"}/>}
        text="Add content " 
        size="md" 
        onClick={() => setOpenModel(true)} 
        />
        <Button variant="primary" text="Logout" size="md"   />
      </div>

          <div className="flex flex-row flex-wrap items-center justify-center gap-6 px-8 py-6 pt-20 mt-5">
        {isfound ? (
          contents.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-[400px] transition-all duration-300 ease-in-out hover:outline 
          hover:outline-2 hover:outline-blue-300 hover:border hover:border-blue-400 
          items-center hover:shadow-xl hover:shadow-gray-300/50 rounded-2xl"
            >
              <Card key={index} type={item.type} description={item.description} link={item.link} title={item.title} />
            </div>
          ))
        ) : (
          <p className="text-center text-lg sm:text-xl font-semibold">No Posts Present</p>
        )}
      </div>
        
          
    </div>



    </div>



 
    
  )
}


