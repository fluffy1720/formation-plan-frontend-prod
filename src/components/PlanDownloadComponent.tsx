import { getAPI_URL } from '../env/apiUrlHelper';
import { ComponentResponse, PlanGeneratorResponse } from '../types';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ACI_URL = getAPI_URL('dev');

type Props = {
  planGeneratorResponse: PlanGeneratorResponse;
  handleChange: (cc: ComponentResponse) => ComponentResponse;
};

const PlanDownloadComponent = ({ planGeneratorResponse, handleChange }: Props) => {
  const [fileExists, setFileExists] = useState(true);

  useEffect(() => {
    const checkFileExists = async () => {
      const response = await fetch(`${ACI_URL}/checkFileExists/${planGeneratorResponse?.studentId}`);
      const data = await response.json();
      setFileExists(data.exists);
    };

    checkFileExists();
  }, [planGeneratorResponse]);

  const handleDownload = async () => {
    if (fileExists) {
      const response = await fetch(`${ACI_URL}/downloadPlan/${planGeneratorResponse?.studentId}.zip`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `plan_${planGeneratorResponse?.studentId}.zip`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Se ha eliminado el plan generado por inactividad. Intenta generarlo de nuevo.',
          confirmButtonColor: '#d33',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Se ha eliminado el plan generado por inactividad. Intenta generarlo de nuevo.',
        confirmButtonColor: '#d33',
      }).then(() => {
        handleChange({ currentComponent: 0 });
      });
    }
  };
  
  return (
    <>
      <div className='my-5 p-3 container my-2 plan-download-component-container'>
        <h2>Se ha generado el plan de: {planGeneratorResponse.studentId}</h2>
        <p>¡Plan de formación generado con éxito!</p>
        <div className='d-flex download-component-div'>
          <button className='btn btn-primary' onClick={handleDownload}>
            Descargar plan de formación
          </button>
          <button className='btn btn-secondary' onClick={() => handleChange({ currentComponent: 0 })}>
            Generar otro plan de formación
          </button>
        </div>
      </div>
    </>
  );
};

export default PlanDownloadComponent;
