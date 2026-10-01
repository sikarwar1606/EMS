import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../Dexie/indexedDB.js";

function Add() {
  const [showPage, setShowPage] = useState('Add Work')
  const [newWork, setNewWork] = useState({
    frequency: "",
    jobs: "",
    time: "",
    createdAt: null,
  });
  const [newUser, setNewUser] = useState({
    userId: "",
    userName: "",
    level: "",
    password: "",
    createdAt: null,
    updatedAt: null,
  });
  const [workMaster, setWorkMaster] = useState([]);
  const [userMaster, setUserMaster] = useState([]);

  const handle_newWork = (e) =>
    setNewWork({ ...newWork, [e.target.name]: e.target.value });
  const handle_newUser = (e)=> setNewUser({...newUser, [e.target.name]:e.target.value});
  const handle_WorkSave = (e) => {
    e.preventDefault();
    setWorkMaster({ ...newWork, createdAt: new Date().toLocaleString() });
  };
  const handle_UserSave = (e)=>{
    e.preventDefault();
    setUserMaster({...newUser, createdAt: new Date().toLocaleString()})
  }

  useEffect(() => {
    console.log(workMaster);
  }, [workMaster]);

  useEffect(()=>{    
    console.log(userMaster);
  },[userMaster])

  return (
    <div className=" border min-h-screen w-full flex flex-col ">
      {/* //Navbar */}
      <div
        id="navbar"
        className="h-[50px] shrink-0 border flex items-center justify-between p-1"
      >
        <div className="border w-10 h-10 rounded-full"></div>
        <input className="bg-red-200 p-1" type="date" id="date"></input>
      </div>
      {/* //Body */}
      <div className="flex gap-1 flex-1 overflow-y-auto border  w-full px-2 py-5">
        <div className="bg-pink-50 w-full h-[700px]">
          <button className='rounded bg-green-200 p-1' onClick={()=>setShowPage(showPage==='Add Work'?'Add User':'Add Work')}>
            {showPage}
          </button>
         {showPage==='Add Work' &&(
           <div>
            <form onSubmit={handle_WorkSave}>
            <div>
              <label>Work</label>
              <input
                name="jobs"
                type="text"
                value={newWork.jobs}
                onChange={handle_newWork}
                required
                className="border border-gray-200 rounded"
              />
            </div>
            <div>
              <label>Frequency</label>
              <input
                name="frequency"
                type="text"
                value={newWork.frequency}
                onChange={handle_newWork}
                required
                className="border border-gray-200 rounded"
              />
            </div>
            <div>
              <label>Std. Time</label>
              <input
                name="time"
                type="number"
                value={newWork.time}
                onChange={handle_newWork}
                required
                className="border border-gray-200 rounded"
              />
            </div>

            <div className="flex justify-end shrink-0 mb-15 sticky z-100">
              <button className="fixed bottom-25 right-10 bg-green-400 w-24 p-2 rounded-xl z-50">
                Save
              </button>
            </div>
          </form>
          </div>
         )}
          {showPage==='Add User' &&(
            <div>
            <form onSubmit={handle_UserSave}>
            <div>
              <label>User Name</label>
              <input
                name="userName"
                type="text"
                value={newUser.userName}
                onChange={handle_newUser}
                required
                className="border border-gray-200 rounded"
              />
            </div>
            <div>
              <label>Access Level</label>
              <input
                name="level"
                type="number"
                value={newUser.level}
                onChange={handle_newUser}
                required
                className="border border-gray-200 rounded"
              />
            </div>
            

            <div className="flex justify-end shrink-0 mb-15 sticky z-100">
              <button className="fixed bottom-25 right-10 bg-green-400 w-24 p-2 rounded-xl z-50">
                Save
              </button>
            </div>
          </form>
          </div>
          )}
        </div>
        <div className="bg-purple-400"></div>
      </div>
    </div>
  );
}

export default Add;


{/* <form onSubmit={handle_formSave}>
            <div>
              <label>Frequency</label>
              <input
                name="frequency"
                type="number"
                value={addData.frequency}
                onChange={handle_addData}
                required
                className="border border-gray-200 rounded"
              />
            </div>

            <div className="flex justify-end shrink-0 mb-15 sticky z-100">
              <button className="fixed bottom-25 right-10 bg-green-400 w-24 p-2 rounded-xl z-50">
                Save
              </button>
            </div>
          </form> */}