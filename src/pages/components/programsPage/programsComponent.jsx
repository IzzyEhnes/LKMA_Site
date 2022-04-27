export const ProgramsComponent = (props) => {
    return (
      <div id='program-details' className='text-center'>
      <div className='container'>
        <div className='row'>
            {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4 program-details-item'>
                    <div className='programs-title'>
                      <h2>{d.name}</h2>
                      <img src={d.img} alt='...'/>
                      <p>{d.paragraph}</p>
                    </div>
                    <div>
                      {d.subPrograms && d.subPrograms.length && d.subPrograms.map((subprogram, k) => {
                        return (
                          <div key={k} className='subprogram-details-item'>
                            <hr></hr>
                            <h2>{subprogram.subProgramName}</h2>
                            <h4>{subprogram.subProgramAgeRange}</h4>
                            <p>{subprogram.subProgramParagraph1}</p>
                            <img src={subprogram.img} alt='...'/>
                            <p>{subprogram.subProgramParagraph2}</p>
                          </div>
                        );
                      })}
                    </div> 
                </div>
              ))
              : 'Loading...'}
        </div>
      </div>
    </div>
  )
}