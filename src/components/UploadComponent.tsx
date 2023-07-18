import { useState } from 'react';
import { ComponentResponse } from '../types';
import useFetch from '../hooks/useFetch';
import useUploadFile from '../hooks/useUploadFile';

type Props = {
  handleChange: (cc: ComponentResponse) => ComponentResponse;
};

const UploadComponent = ({ handleChange }: Props) => {
  const { mentors } = useFetch();
  const { uploadFile } = useUploadFile();
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleSelect = (): void => {
    const optionDisabled = document.querySelector('option');
    optionDisabled!.disabled = true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files && event.target.files[0];
    setIsFileSelected(!!file);
  };

  return (
    <div className="container mt-5 m-auto p-5 main-container upload-component-container">
      <label htmlFor="select-mentor">Mentor:</label>
      <select className="form-select my-3" name="select-mentor" id="select-mentor" onClick={handleSelect}>
        <option value="disabled">Seleccionar mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor.fullName} value={mentor.fullName}>
            {mentor.fullName}
          </option>
        ))}
      </select>

      <input
        className="d-flex mb-3 w-100 align-items-center file-input form-input"
        id="fileupload"
        type="file"
        name="fileupload"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
      />
      {isFileSelected ? <span className="green-checkmark">&#10004;</span> : null}
      <button
        className="btn btn-primary"
        id="upload-button"
        disabled={!isFileSelected}
        onClick={() => uploadFile({ handleChange })}
      >
        Subir
      </button>
    </div>
  );
};

export default UploadComponent;
