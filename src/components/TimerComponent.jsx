import { useState,useEffect } from "react"

function TimerComponent() {
    const [minuteIp, setMinuteIp] = useState(0)
    const [secondsIp, setSecondsIp] = useState(0)
    const [start, setStart] = useState(false)
    let seconds = []
    let minutes = []
    for(let i = 0;i<60;i++){
        seconds.push(i)
        minutes.push(i)
    }

    function handleStart(){
        if(minuteIp>0 || secondsIp>0){
            setStart(true)
        }
        setTimeout(() => {
            setSecondsIp(prevSec => prevSec-1)
            if(secondsIp===0){
                setMinuteIp(prevMin => prevMin-1)
                setSecondsIp(59)
                if(minuteIp===0){
                    setMinuteIp(0)
                    setSecondsIp(0)
                    setTimeout(() => {
                        setStart(false)
                    }, 3000);
                }
            }
        }, 1000);
    }

    function handleReset() {
        setMinuteIp(0)
        setSecondsIp(0)
        setStart(false)
    }

    useEffect(() => {
        if(start){
            handleStart()
        }
    }, [minuteIp,secondsIp])
    
  return (
    <div>
        <div className="-mt-40 mb-28"><h1 className="text-5xl font-semibold">Timer</h1></div>
        {start ? 
        <div className="my-10 shadow-green-400 shadow-lg rounded-full h-48 w-48 grid place-items-center bg-slate-100 mx-auto">
            <h1 className="font-semibold">
                {minuteIp.toString().length<2?`0${minuteIp}`:minuteIp}
                :
                {secondsIp.toString().length<2?`0${secondsIp}`:secondsIp}
                </h1>
        </div>
        : 
        <div className="my-10">
            <select className="px-10 py-3 shadow-inner shadow-gray-300 rounded-lg outline-none border-none" value={minuteIp} onChange={(e)=>setMinuteIp(e.target.value)}>
                {
                    minutes.map(min => <option key={min}>{min<10?`0${min}`:min}</option>)
                }
            </select>
            { } <span className="font-bold text-xl">:</span> { }
            <select className="px-10 py-3 shadow-inner shadow-gray-300 rounded-lg outline-none border-none" value={secondsIp} onChange={(e)=>setSecondsIp(e.target.value)}>
                {
                    seconds.map(sec => <option key={sec}>{sec<10?`0${sec}`:sec}</option>)
                }
            </select>
        </div>
        }
        <div className="flex gap-6">
            <button className="px-8 shadow-md shadow-gray-200 shadow-xl bg-green-400" onClick={handleStart}>Start</button>
            <button className="px-8 shadow-md shadow-gray-200 shadow-xl bg-red-400" onClick={()=>setStart(false)}>Stop</button>
            <button className="px-8 shadow-md shadow-gray-200 shadow-xl bg-yellow-400" onClick={handleReset}>Reset</button>
        </div>
    </div>
  )
}

export default TimerComponent