import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../Dexie/indexedDB.js";

function Add() {
  const [showTick, setShowTick]=useState();
  const [date, setDate] = useState();
  const [showPage, setShowPage] = useState("Add Work");
  const [newWork, setNewWork] = useState({
    frequency: "",
    jobs: "",
    time: "",
    createdAt: null,
  });
  const [newUser, setNewUser] = useState({
    email_id: "",
    userName: "",
    level: "",
    password: "",
    createdAt: null,
    updatedAt: null,
  });
  const [workMaster, setWorkMaster] = useState([]);
  const [userMaster, setUserMaster] = useState([]);

  //Genrating the password
  const generatePassword = () => {
    const chars = "a-zA-Z0-9!@#$%^&*";
    return Array.from(crypto.getRandomValues(new Uint32Array(12)))
      .map((n) => chars.charAt(n % chars.length))
      .join("");
  };

  const handle_newWork = (e) =>
    setNewWork({ ...newWork, [e.target.name]: e.target.value });
  const handle_newUser = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handle_WorkSave = (e) => {
    e.preventDefault();
    setWorkMaster({ ...newWork, createdAt: new Date().toLocaleString() });
    setShowTick(true)
    setTimeout(()=> setShowTick(false), 2000);
    setNewWork({
      frequency: "",
      jobs: "",
      time: "",
    });
  };
  const handle_UserSave = (e) => {
    e.preventDefault();
    setShowTick(true)
    setTimeout(()=> setShowTick(false), 2000);
    setUserMaster({
      ...newUser,
      password: generatePassword(),
      createdAt: new Date().toLocaleString(),
    });
    setNewUser({
      email_id: "",
      userName: "",
      level: "",
    });
  };

  useEffect(() => {
    console.log(workMaster);
  }, [workMaster]);

  useEffect(() => {
    console.log(userMaster);
  }, [userMaster]);

  return (
    <div className="border min-h-screen w-full flex flex-col">
      {/* Navbar */}
      <div
        id="navbar"
        className="h-[50px] shrink-0 border flex items-center justify-between p-1"
      >
        <div className="border w-10 h-10 rounded-full"></div>
        <input
          className="bg-red-200 p-1 rounded"
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Body */}

      {/* Left Panel */}
      <div className="bg-pink-50 xl:w-1/2  h-[700px] overflow-y-auto p-4 rounded-lg ">
        <button
          className="rounded bg-green-200 p-2 mb-4 w-full"
          onClick={() =>
            setShowPage(showPage === "Add Work" ? "Add User" : "Add Work")
          }
        >
          {showPage}
        </button>

        {/* Add work form  */}
        {showPage === "Add Work" && (
          <form onSubmit={handle_WorkSave} className="flex flex-col gap-3">
            <div>
              <label className="block mb-1 font-medium">Work</label>
              <input
                name="jobs"
                type="text"
                value={newWork.jobs}
                onChange={handle_newWork}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Frequency</label>
              <input
                name="frequency"
                type="text"
                value={newWork.frequency}
                onChange={handle_newWork}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Std. Time</label>
              <input
                name="time"
                type="number"
                value={newWork.time}
                onChange={handle_newWork}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            {showTick ? (
              <div className="text-green-600 flex items-center gap-1 animate-[tick_0.3s_ease-out]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Saved!
              </div>
            ) : (
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600 transition"
              >
                Save
              </button>
            )}
          </form>
        )}

        {showPage === "Add User" && (
          <form onSubmit={handle_UserSave} className="flex flex-col gap-3">
            <div>
              <label className="block mb-1 font-medium">User Name</label>
              <input
                name="userName"
                type="text"
                value={newUser.userName}
                onChange={handle_newUser}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email id.</label>
              <input
                name="email_id"
                type="email"
                value={newUser.email_id}
                onChange={handle_newUser}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Access Level</label>
              <input
                name="level"
                type="number"
                value={newUser.level}
                onChange={handle_newUser}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
              {showTick ? (
              <div className="text-green-600 flex items-center gap-1 animate-[tick_0.3s_ease-out]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Saved!
              </div>
            ) : (
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600 transition"
              >
                Save
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );

  // return (
  //   <div className=" border min-h-screen w-full flex flex-col ">
  //     {/* //Navbar */}
  //     <div
  //       id="navbar"
  //       className="h-[50px] shrink-0 border flex items-center justify-between p-1"
  //     >
  //       <div className="border w-10 h-10 rounded-full"></div>
  //       <input className="bg-red-200 p-1" type="date" id="date"></input>
  //     </div>
  //     {/* //Body */}
  //     <div className="flex gap-1 flex-1 overflow-y-auto border  w-full px-2 py-5">
  //       <div className="bg-pink-50 w-full h-[700px]">
  //         <button className='rounded bg-green-200 p-1' onClick={()=>setShowPage(showPage==='Add Work'?'Add User':'Add Work')}>
  //           {showPage}
  //         </button>
  //        {showPage==='Add Work' &&(
  //          <div>
  //           <form onSubmit={handle_WorkSave}>
  //           <div>
  //             <label>Work</label>
  //             <input
  //               name="jobs"
  //               type="text"
  //               value={newWork.jobs}
  //               onChange={handle_newWork}
  //               required
  //               className="border border-gray-200 rounded"
  //             />
  //           </div>
  //           <div>
  //             <label>Frequency</label>
  //             <input
  //               name="frequency"
  //               type="text"
  //               value={newWork.frequency}
  //               onChange={handle_newWork}
  //               required
  //               className="border border-gray-200 rounded"
  //             />
  //           </div>
  //           <div>
  //             <label>Std. Time</label>
  //             <input
  //               name="time"
  //               type="number"
  //               value={newWork.time}
  //               onChange={handle_newWork}
  //               required
  //               className="border border-gray-200 rounded"
  //             />
  //           </div>

  //           <div className="flex justify-end shrink-0 mb-15 sticky z-100">
  //             <button className="fixed bottom-25 right-10 bg-green-400 w-24 p-2 rounded-xl z-50">
  //               Save
  //             </button>
  //           </div>
  //         </form>
  //         </div>
  //        )}
  //         {showPage==='Add User' &&(
  //           <div>
  //           <form onSubmit={handle_UserSave}>
  //           <div>
  //             <label>User Name</label>
  //             <input
  //               name="userName"
  //               type="text"
  //               value={newUser.userName}
  //               onChange={handle_newUser}
  //               required
  //               className="border border-gray-200 rounded"
  //             />
  //           </div>
  //           <div>
  //             <label>Access Level</label>
  //             <input
  //               name="level"
  //               type="number"
  //               value={newUser.level}
  //               onChange={handle_newUser}
  //               required
  //               className="border border-gray-200 rounded"
  //             />
  //           </div>

  //           <div className="flex justify-end shrink-0 mb-15 sticky z-100">
  //             <button className="fixed bottom-25 right-10 bg-green-400 w-24 p-2 rounded-xl z-50">
  //               Save
  //             </button>
  //           </div>
  //         </form>
  //         </div>
  //         )}
  //       </div>
  //       <div className="bg-purple-400"></div>
  //     </div>
  //   </div>
  // );
}

export default Add;
