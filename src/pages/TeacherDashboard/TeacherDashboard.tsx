import React, { useEffect, useState } from 'react';

const TeacherDashboard = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName('Nombre del usuario');
  }, []);

  return (
    <React.Fragment>
      <div className='
        py-4 px-2 text-center text-sky-500
        sm:py-6
      '>
        <span>
          {userName}
        </span>
      </div>
    </React.Fragment>
  )
}

export {
  TeacherDashboard,
}