import { useEffect, useState } from 'react';
import { ComponentResponse } from '../types';

type Props = {
  currentComponent: ComponentResponse;
};

const ProgressComponent = ({ currentComponent }: Props) => {
  const [text, setText] = useState<string>('');
  const [progressColor, setProgressColor] = useState({
    stepOne: false,
    stepTwo: false,
    stepThree: false,
  });

  useEffect(() => {
    switch (currentComponent.currentComponent) {
      case 0:
        setText('Cargar archivo');
        setProgressColor({
          stepOne: true,
          stepTwo: false,
          stepThree: false,
        });
        break;
      case 1:
        setText('Generar plan de formación');
        setProgressColor({
          stepOne: true,
          stepTwo: true,
          stepThree: false,
        });
        break;
      case 2:
        setText('Descargar plan de formación');
        setProgressColor({
          stepOne: true,
          stepTwo: true,
          stepThree: true,
        });
        break;
      default:
        setText('');
        setProgressColor({
          stepOne: false,
          stepTwo: false,
          stepThree: false,
        });
    }
  }, [currentComponent]);

  const mainContainerStyle = {
    backgroundColor: '#777',
  };

  const stepCircleStyle = {
    backgroundColor: '#333',
    color: '#FFF',
    fontSize: '1.3em',
  };

  const selectedStepCircleStyle = {
    backgroundColor: 'orange',
    color: '#FFF',
    fontSize: '1.3em',
  };

  return (
    <div className="frame-container">
      <div style={mainContainerStyle} className="main-container">
        <div className="container py-4 d-flex justify-content-around">
          <div
            style={progressColor.stepOne ? selectedStepCircleStyle : stepCircleStyle}
            className="p-4 rounded-5 px-5"
          >
            1
          </div>

          <div
            style={progressColor.stepTwo ? selectedStepCircleStyle : stepCircleStyle}
            className="p-4 rounded-5 px-5"
          >
            2
          </div>

          <div
            style={progressColor.stepThree ? selectedStepCircleStyle : stepCircleStyle}
            className="p-4 rounded-5 px-5"
          >
            3
          </div>
        </div>
        <h2 className="container text-center pb-4 text-white">{text}</h2>
      </div>
    </div>
  );
};

export default ProgressComponent;
