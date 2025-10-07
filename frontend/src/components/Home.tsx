
import { Button } from './Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from 'lucide-react'
import { ShareIcon_1 } from '../icons/ShareIcon_1'
import Card from './Card'
import { useState } from 'react'
import CreateContentModel from './CreateContentModel'

import Sidebar from './Sidebar'
export default function Home() {

  const[modelOpen , setOpenModel] = useState(false);


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
      </div>

          <div className='flex  gap-4 '>
            
            
            <Card type="twitter" link="https://x.com/kirat_tw/status/1633685473821425666" title="First Tweet"/>    
         </div>
        
          
    </div>



    </div>



 
    
  )
}


