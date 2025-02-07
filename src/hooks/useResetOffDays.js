import { useState } from "react";

export default function useResetOffDays() {
    const [resetSwitch, setResetSwitch] = useState(false)
    
    const handleReset = () => {
        setResetSwitch(true)
    }

  return {handleReset, resetSwitch, setResetSwitch};
}
