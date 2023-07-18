const HeaderComponent = () => {
  return (
    <>
      <div className="main-container-h1 py-4 text-center header-component-container">
        <div className="header-component-container-frame">
          <img src="tecnm-logo.png" className="header-component-container-img-tecnm-logo" />
          <div className="header-component-container-div">
            <h2 className="header-component-container-h2">Tecnológico de Estudios Superiores de Ecatepec</h2>
            <h1 className='main-container-h1 my-3 text-center header-component-container-h1'>Generador de Planes de Formación<br/>Modalidad Dual</h1>
          </div>
          <img src="logo-dual.png" className="header-component-container-img" />
        </div>
      </div>
      <div className="main-container text-center banner-component-container">
        <div className="banner-component-container-frame">
          <img src="banner.png" className="banner-component-container-img" />
        </div>
      </div>
    </>
  )
}




export default HeaderComponent