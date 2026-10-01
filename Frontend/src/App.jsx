import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Add from "./Add/Add.jsx"
import { User,House,CirclePlus} from "lucide-react";
import {useNavigate} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
      </Routes>

      
      <div className="fixed bottom-0 left-0 w-full bg-purple-300 flex items-center justify-between p-5 mb-2 rounded  ">
        
        <div>
          <Link to='/'>
            <House color="#000000" />
          </Link>
        </div>
        <div >
          <Link to="/add">
             <CirclePlus />
          </Link>          
        </div>
        <div>
          <User color="#000000" />
        </div>
      </div>
    </>
  );
}

export default App;
