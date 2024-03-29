const Schedule_Image = ({ title, largeImage, smallImage }) => {
    return (
      <div className='gallery-item'>
        <div className='hover-bg'>
          {' '}
          <a
            href={largeImage}
            title={title}
            data-lightbox-gallery='gallery1'
          >
            <img
              src={smallImage}
              className='img-responsive'
              alt={title}
            />{' '}
          </a>{' '}
        </div>
      </div>
    )
  }

export const CalendarComponent = (props) => {
    return (
        <div id = 'calendar' className='text-center'>
            <div className='container'>

                <div className='calendar-title'>
                    <h1>CALENDARS</h1>
                </div>

                <div className="calendar-cotainer">
                    <div className="calendars">
                        <div className='weekly-calendar'>
                            <h3>
                                Weekly Calendar
                                <br></br>
                                <Schedule_Image title="Schedule" largeImage="img/schedule/LKMA_Schedule-Rancho.png" smallImage="img/schedule/LKMA_Schedule-Rancho.png"/>
                            </h3>
                            <h4>
                                Monthly Calendar
                                <br></br>
                                <iframe src="https://calendar.google.com/calendar/embed?src=leeskoreanmartialarts@gmail.com&ctz=America%2FLos_Angeles" width="100%" height="30%" frameBorder="0" scrolling="no"></iframe>
                            </h4>
                        </div>
                        <div className='upcoming-events'>
                            <h2>Upcoming Events</h2>
                                {props.data

                                ? props.data.map((d, i) => (
                                    <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4 upcoming-event-item'>
                                    <h5 className="upcoming-event-title">{d.title}</h5>
                                    <h6 className="upcoming-event-date">{d.date}</h6>
                                    <p className='upcoming-event-description'>{d.description}</p>
                                    </div>
                                ))
                                : 'Loading...'}
                        </div>
                    </div>
                            
                </div>
            </div>
        </div>


    )


}