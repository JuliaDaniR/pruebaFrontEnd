import React, { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [institutionName, setInstitutionName] = useState('');
  
  useEffect(() => {
    setInstitutionName('Nombre de la institución');
  }, []);

  return (
    <React.Fragment>
      <div className='
        py-4 px-2 text-center text-sky-500
        sm:py-6
      '>
        <span>
          {institutionName}
        </span>
      </div>
    </React.Fragment>
  )
}

export {
  AdminDashboard
};
