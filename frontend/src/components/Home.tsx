
import { Button } from './Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from 'lucide-react'
import { ShareIcon_1 } from '../icons/ShareIcon_1'
import Card from './Card'
import { useEffect, useState } from 'react'
import CreateContentModel from './CreateContentModel'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";

import Sidebar from './Sidebar'

interface ContentItem {
  type: "twitter" | "youtube" | "file" | "note";
  description: string;
  link: string;
  title: string;
  index:Number;
}


export default function Home() {

  const [modelOpen, setOpenModel] = useState(false);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isfound, setIsfound] = useState(false);

  const navigate = useNavigate();



  function Logout() {

    Cookies.remove("token");


    navigate("/", { replace: true });


  }


  useEffect(() => {

    async function getData() {

      console.log("Fetching the data");

      const response = await axios.get("http://localhost:3000/api/v1/data/content", {
        withCredentials: true
      });

      if (response.status === 200) {
        setContents(response.data.result)
        console.log(response.data.result);
        setIsfound(true);
      }


    }

    getData();

  }, [])




  return (


    <div className='flex'>

      <Sidebar />

      <div className='p-4 flex-1'>



        <CreateContentModel open={modelOpen} Onclose={() => {
          setOpenModel(false)
        }} />

        <div className='flex justify-end  gap-4'>



          <Button
            variant="secondary"
            startIcon={<ShareIcon_1 size={"md"} />}
            text="Share Brain"
            size="md"
          //onClick={() => setOpenModel(true)} 
          />

          <Button
            variant="primary"
            startIcon={<PlusIcon size={"md"} />}
            text="Add content "
            size="md"
            onClick={() => setOpenModel(true)}
          />
          <Button variant="primary" text="Logout" size="md" onClick={Logout} />
        </div>

        <div className="flex flex-col ml-72 sm:flex-row sm:flex-wrap items-stretch justify-center gap-4 px-8 py-6 pt-20 mt-5">
          {isfound ? (
            contents.map((item, index) => (
              <div
                key={index}
                // 👇 Key Change Here
                className="w-full  sm:w-[calc(33.33%-10.66px)] 
          transition-all duration-300 ease-in-out hover:outline 
          hover:outline-2 hover:outline-blue-300 hover:border hover:border-blue-400 
          items-stretch hover:shadow-xl hover:shadow-gray-300/50 rounded-2xl"
              >
                <Card key={index} type={item.type} description={item.description} link={item.link} title={item.title} index={index} />
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


