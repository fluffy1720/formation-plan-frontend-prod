import Swal from 'sweetalert2';
import { getAPI_URL } from '../env/apiUrlHelper';
import { PlanGenerationRequestBody, StudentExcelResponse, ComponentResponse, PlanGeneratorResponse } from '../types';

const ACI_URL = getAPI_URL('dev');

type Props = {
    studentExcelData?: StudentExcelResponse;
    handleChange: (cc: ComponentResponse) => ComponentResponse;
  };
  
  const PlanPreviewComponent = ({ studentExcelData, handleChange }: Props) => {
    const uniquePeriods = new Set<string>();
    studentExcelData?.subjectList?.forEach((subject) => {
      uniquePeriods.add(subject.period);
    });
  
    return (
      <div className='my-5 container'>
        <h2>Asignaturas Registradas:</h2>
        <p>
          <strong>Alumno:</strong> {studentExcelData?.firstSurname} {studentExcelData?.lastSurname} {studentExcelData?.name}
        </p>
        <p>
          <strong>Matrícula:</strong> {studentExcelData?.studentId}
        </p>
  
        <table className='table table-hover'>
          <thead>
            <tr>
              <th className='col-2'>Clave de materia</th>
              <th className='text-center'>Nombre de materia</th>
              <th>Periodo</th>
              <th>Parciales</th>
              <th>Válida</th>
            </tr>
          </thead>
          <tbody>
            {studentExcelData?.subjectList.map((subject) => (
              <tr key={subject.subjectId} className={subject.valid ? 'bg-custom-success text-white' : 'bg-danger'}>
                <td className='col-2'>{subject.subjectId}</td>
                <td>{subject.subjectName}</td>
                <td>{subject.period}</td>
                <td>{subject.partial}</td>
                <td>{subject.valid ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form className='plan-generator-component-form' onSubmit={(e) => handlePlanGeneration(e, studentExcelData!, handleChange)}>
          <label htmlFor='generation-date-input'>
            <b>Fecha de creación del plan de formación:</b>
          </label>
          <input required type='date' className='generation-date-input' name='generation-date-input' />
          <label htmlFor='period-input'>
            <b>Periodo:</b>
          </label>
          <select required name='period-input' className='period-input'>
            {[...uniquePeriods].map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
          <input type='submit' value='Generar plan de formación' style={{ backgroundColor: '#09457B', color: 'white' }} />
        </form>
      </div>
    );
  };
  
  const handlePlanGeneration = async (
    ev: React.FormEvent<HTMLFormElement>,
    studentExcelData: StudentExcelResponse,
    handleChange: (cc: ComponentResponse) => ComponentResponse
  ) => {
    ev.preventDefault();
    const generationDateInput: HTMLInputElement = document.querySelector('.generation-date-input')!;
    const periodInput: HTMLSelectElement = document.querySelector('.period-input')!;
  
    if (!studentExcelData.subjectList.every((subject) => subject.valid)) {
      Swal.fire({
        title: 'Error!',
        text: '¡La cédula no es válida!',
        icon: 'error',
        confirmButtonColor: '#FF0000',
      });
  
      return;
    }
  
    const reqBody: PlanGenerationRequestBody = {
      studentId: studentExcelData.studentId,
      studentFileName: studentExcelData.fileName,
      generationDateString: formatDate(generationDateInput.value),
      period: periodInput.value,
    };
  
    Swal.fire({
      title: 'Por favor, espere...',
      text: 'Se está generando el plan de formación',
      timer: 10000,
      timerProgressBar: true,
    });
  
    const response = await fetch(`${ACI_URL}/generatePlan`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    let responseData: PlanGeneratorResponse;
    response.json().then((data) => {
      responseData = data;
  
      const planGeneratorResponse: PlanGeneratorResponse = {
        wasGenerated: responseData.wasGenerated,
        fileName: studentExcelData.fileName,
        studentId: studentExcelData.studentId,
      };
  
      console.log(planGeneratorResponse);
  
      if (!planGeneratorResponse.wasGenerated) {
        Swal.fire({
          title: 'Error',
          text: 'Plan no generado, error en la cédula',
          icon: 'error',
          confirmButtonColor: '#FF0000',
        });
        return;
      }
  
      handleChange({
        currentComponent: 2,
        response: planGeneratorResponse,
      });
    });
  };
  
  const formatDate = (localeDate: string): string => {
    console.log(localeDate);
    const splitedDate: Array<string> = localeDate.split('-');
    splitedDate.reverse();
    return '08/11/2023';
  };
  
  export default PlanPreviewComponent;
  
