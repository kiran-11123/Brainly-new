import { Button } from './Button';
import { PlusIcon } from '../icons/PlusIcon'; // Assuming your custom icon path
import { ShareIcon } from 'lucide-react'; // Lucide icon
import Card from './Card'; // Placeholder import
import CreateContentModel from './CreateContentModel'; // Placeholder import
import Sidebar from './Sidebar'; // Placeholder import
import { useState } from 'react';

// --- Icon Sizing Fix ---
// Define a map to translate your string sizes to Lucide's required numeric size
const LUCIDE_SIZE_MAP = {
  sm: 16, // 16px
  md: 20, // 20px (a good default size for button icons)
  lg: 24, // 24px
};
// -----------------------

// --- Placeholder Component Imports (You need to define these) ---
// const Card = () => <div className="p-4 border rounded-md">Card Placeholder</div>;
// const Sidebar = () => <div className="w-56 bg-gray-100 p-4">Sidebar</div>;
// const CreateContentModel = ({ open, Onclose }) => open ? <div className="fixed inset-0 bg-black/50 flex justify-center items-center">Model Content</div> : null;
// ---

export default function Home() {
  const [modelOpen, setOpenModel] = useState(false);

  return (
    <div className='flex min-h-screen'>

      <Sidebar />

      <div className='p-4 flex-1'>

        <CreateContentModel
          open={modelOpen}
          Onclose={() => {
            setOpenModel(false);
          }}
        />

        <div className='flex justify-end gap-4 mb-8'> {/* Added margin-bottom for spacing */}

          <Button
            variant="secondary"
            // ✅ Lucide Fix: Pass numeric size based on the map
            startIcon={<ShareIcon size={LUCIDE_SIZE_MAP["md"]} />}
            text="Share Brain"
            size="md"
          // onClick={() => setOpenModel(true)} // Example: if sharing opens a model
          />

          <Button
            variant="primary"
            // ✅ Custom Icon Fix: Assuming your PlusIcon accepts string size
            startIcon={<PlusIcon size={"md"} />}
            text="Add content"
            size="md"
            onClick={() => setOpenModel(true)}
          />
        </div>

        <div className='flex gap-4'>
          {/* Card component usage */}
          <Card type="twitter" link="https://x.com/kirat_tw/status/1633685473821425666" title="First Tweet" />
        </div>
      </div>
    </div>
  );
}