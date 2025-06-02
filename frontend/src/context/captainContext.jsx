import React, { createContext, useContext, useState } from 'react';

const CaptainContext = createContext();

export const useCaptain = () => useContext(CaptainContext);

export const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);

    return (
        <CaptainContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainContext.Provider>
    );
};