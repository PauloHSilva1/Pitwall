import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectFilePath, setProjectFilePath] = useState(null); // Inicialize como null

  return (
    <ProjectContext.Provider value={{ projectFilePath, setProjectFilePath }}>
      {children}
    </ProjectContext.Provider>
  );
};
