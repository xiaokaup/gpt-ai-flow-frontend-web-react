import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppRoutePrefix = () => {
  return (
    <div className="appRoutePrefix">
      {/* Any common layout components, if needed */}
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};
