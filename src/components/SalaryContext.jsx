import React, {createContext, useState} from "react";

const SalaryContext = createContext();

export const SalaryContextProvider = ({children}) => {
    const [salary, setSalary] = useState(0);

    return(
        <SalaryContext.Provider value={{salary, setSalary}}>
            {children}
        </SalaryContext.Provider>
    );
}

export default SalaryContext;