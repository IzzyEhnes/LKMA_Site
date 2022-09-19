export const CalendarComponent = (props) => {
    return (
        <div id = 'calendar' className='text-center'>
            <div className='container'>

                <div className='calendar-title'>
                    <h1>CALENDARS</h1>
                </div>

                <div className='upcoming-events'>
                    <h2>
                        Upcoming Events
                        <br /><br /><br />
                        <br /><br /><br />
                        <br /><br /><br />
                    </h2>
                </div>

                <div className='weekly schedule'>
                    <h3>
                        Weekly Calendar
                        <br /><br /><br />
                        <br /><br /><br />
                        <br /><br /><br />
                    </h3>
                    
                </div>

                <div className='monthly-calendar'>
                    <h4>
                        Monthly Calendar
                        <br></br>                        
                    </h4>
                </div>

            </div>
        </div>


    )


}