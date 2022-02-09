import { useEffect, useState } from 'react';
import { getAllDepartments } from '../services/departmentApi';
import { FETCH_DEPARTMENT_DATA_ERROR } from '../constants/constants';

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      const allDepartments = await getAllDepartments();
      if (allDepartments === FETCH_DEPARTMENT_DATA_ERROR) {
        setError(true);
      } else {
        setDepartments(allDepartments);
      }
    };

    fetchDepartments();
  }, []);

  return { departments, error };
};

export { useDepartments };
