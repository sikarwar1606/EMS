import { useState, useEffect,useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../Dexie/indexedDB.js";

const addIncome = (income) => db.income.add(income);

function Home() {
  const prevLog = useRef(); //We will check if log is updated then push to db
  const [date, setDate] = useState();
  const user =['User_1', 'User_2', 'User_3','User_4'];
  const [activeUser, setActiveUser] = useState('')
const [log, setLog] = useState({ activeUser: null, workLog: {} });
  const [workLog, setWorkLog] = useState({
    visual: "",
    height: "",
    weight: "",
    tt: "",
    bs: "",
    torque: "",
  });


  const onChangeWorkLog = (e)=>setWorkLog({...workLog,[e.target.name]:e.target.value})
  const handle_setActiveUser = (data)=>{
    setActiveUser(data)
    
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    setLog({activeUser,date,workLog})
    setWorkLog({ visual: "", height: "", weight: "", tt: "", bs: "", torque: "" });
  }

  useEffect(()=>{
    if(prevLog.current !== log){
      console.log(log) //We will add logic to send data to db
      prevLog.current = log;
    }
    console.log(date)
  },[log])

  
  return (
    <div className=" border min-h-screen w-full flex flex-col ">
      {/* //Navbar */}
      <div
        id="navbar"
        className="h-[50px] shrink-0 border flex items-center justify-between p-1"
      >
        <div className="border w-10 h-10 rounded-full"></div>
        <input className="bg-red-200 p-1" type="date" id="date" onChange={(e)=> setDate(e.target.value)}></input>
      </div>
      {/* //Body */}
      <div className="flex gap-1 flex-1 overflow-y-auto border  w-full px-2 py-5">
        <div id="emp_list" className="w-1/3 max-h-[600px] overflow-y-auto">
          <ul className="border-none max-h-fit flex flex-col overflow-y-auto">
            {user?.map((data,index)=>(
                <li className={`border rounded-xl m-0.5 p-0.5 ${data=== activeUser? 'bg-amber-50' : ''}`} key={index} onClick={()=>handle_setActiveUser(data)} >{data}</li>
            ))}
          </ul>
        </div>
        <div id="work_des" className="w-2/3 max-h-[600px] overflow-y-auto">
          {/* <ul className="border-none max-h-fit flex flex-col overflow-y-auto"> */}
          <form className="max-h-fit flex flex-col overflow-y-auto" onSubmit={handleSubmit}>
            <div className="bg-amber-50 flex justify-between">
              <label>Visual</label>
              <input
                className="border w-1/3"
                name="visual"
                type="number"
                value={workLog.visual}
                onChange={onChangeWorkLog}
                required
              />
            </div>
            <div className="bg-amber-50 flex justify-between">
              <label>Height</label>
              <input
                className="border w-1/3"
                name="height"
                type="number"
                value={workLog.height}
                onChange={onChangeWorkLog}
                required
              />
            </div>
            <div className="bg-amber-50 flex justify-between">
              <label>Weight</label>
              <input
                className="border w-1/3"
                name="weight"
                type="number"
                value={workLog.weight}
                onChange={onChangeWorkLog}
                required
              />
            </div>
            <div className="bg-amber-50 flex justify-between">
              <label>Top Thickness</label>
              <input
                className="border w-1/3"
                name="tt"
                type="number"
                value={workLog.tt}
                onChange={onChangeWorkLog}
                required
              />
            </div>
            <div className="bg-amber-50 flex justify-between">
              <label>Bridge Strength</label>
              <input
                className="border w-1/3"
                name="bs"
                type="number"
                value={workLog.bs}
                onChange={onChangeWorkLog}
                required
              />
            </div>
            <div className="bg-amber-50 flex justify-between">
              <label>Torque</label>
              <input
                className="border w-1/3"
                name="torque"
                type="number"
                value={workLog.torque}
                onChange={onChangeWorkLog}
                required
              />
            </div>
            <div className="flex justify-end shrink-0 mb-15 sticky z-100">
              <button className="fixed bottom-25 right-10 bg-green-400 w-24 p-2 rounded-xl z-50">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
