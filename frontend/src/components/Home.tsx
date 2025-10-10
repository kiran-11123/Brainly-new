import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Sidebar from "./Sidebar";
import Card from "./Card";
import CreateContentModel from "./CreateContentModel";
import { Button } from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon_1 } from "../icons/ShareIcon_1";

interface ContentItem {
  type: "twitter" | "youtube" | "image" | "note";
  description: string;
  link: string;
  title: string;
  _id: string;
  image:string|null;
}

export default function Home() {
  const [modelOpen, setOpenModel] = useState(false);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isFound, setIsFound] = useState(false);
  const [message,setMessage] = useState("");

  const[selectedField  , setSelectedField] = useState<string | null >(null);

  const navigate = useNavigate();


  // Logout function
  function Logout() {
    Cookies.remove("token");
    navigate("/", { replace: true }); // Redirect to login and prevent back
  }

  // Define the function outside useEffect for better reusability (if it doesn't depend on other hooks/state).
async function GetSearchData(selectedField: string | null) {
  if (!selectedField) return;
  try {
    selectedField = selectedField.toLowerCase();
    const response = await axios.get(`http://localhost:3000/api/v1/search/${selectedField}`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      setMessage("");
      setContents(response.data.result); // Assuming setContents is defined in your component
      // Removed window.location.reload() - use state updates instead for reactivity
    } else {
      setMessage("No Data Present")

   
      console.log('Non-200 response:', response.data);
    }
  } catch (er) {
    console.error('Error fetching search data:', er);
  }
}
useEffect(() => {
  GetSearchData(selectedField); // Await is handled inside the function definition
}, [selectedField]);
  // Fetch content
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/data/content",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setMessage("");
          setContents(response.data.result);
          setIsFound(true);
        }
      } catch (err) {
        console.error("Error fetching content", err);
      }
    }

    getData();
   
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar  onFieldClick={setSelectedField}/>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:ml-72 bg-gradient-to-r from-cyan-800 via-purple-700 to-pink-700 overflow-y-auto">
        {/* Modal for creating content */}
        <CreateContentModel
          open={modelOpen}
          Onclose={() => setOpenModel(false)}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mb-6">
          <Button
            variant="secondary"
            startIcon={<ShareIcon_1 size="md" />}
            text="Share Brain"
            size="md"
          />
          <Button
            variant="primary"
            startIcon={<PlusIcon size="md" />}
            text="Add Content"
            size="md"
            onClick={() => setOpenModel(true)}
          />
          <Button variant="primary" text="Logout" onClick={Logout}  size="md"/>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isFound && !message  ? (
            contents.map((item) => (
              <div
                key={item._id}
                className="transition-all duration-300 ease-in-out hover:outline hover:outline-2 hover:outline-blue-300 hover:border hover:border-blue-400 hover:shadow-xl hover:shadow-gray-300/50 rounded-2xl"
              >
                <Card
                  type={item.type}
                  description={item.description}
                  link={item.link}
                  title={item.title}
                  id={item._id}
                  image={item.image || null}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-lg sm:text-xl font-semibold col-span-full font-poppins text-white">
              No Posts Present
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
