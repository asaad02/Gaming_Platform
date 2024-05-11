import React from 'react';
import {Lucas, Abdullah, Hammad, Aakil, Dipto, Jacob} from './index';
import {ShiftProvider} from './ShiftContext';

export function About(){
  return (
    <div>
      <div className="containers">
        <ShiftProvider>
          <Jacob />
          <Dipto/>
          <Aakil />
          <Hammad />
          <Abdullah/>
          <Lucas/>
        </ShiftProvider>
      </div>
    </div>
  );
};

