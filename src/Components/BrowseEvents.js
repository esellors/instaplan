import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {updateEvents} from '../ducks/eventsReducer';

function BrowseEvents(props) {

   const {userLocation, events, updateEvents} = props;

   // update events on render // userLocation param non-working
   useEffect(() => {
      updateEvents(userLocation)
   }, [userLocation]);

   const eventsMapped = events.length > 0 && events.map((event, i) => {
      console.log(event)
      // const startTime = event.start.local.substring(11, 16);
      // const endTime = event.end.local.substring(11, 16);


      return (
         <div className='event-row' key={i}>
            <div className="event-image">
               <img src={event.logo.original.url} alt='Event' />
            </div>
            <div className='event-info' >
               <Link to='/events/1'>
                  <h3>{event.name.text}</h3>
               </Link>
               <p>start {event.start.local} / end {event.end.local}</p>
               <div className="location-share">
                  <p>LOCATION</p>
                  <img src="https://img.icons8.com/ios-glyphs/24/000000/share.png"/>
               </div>
            </div>
         </div>
      );
   })


   return (
      <section className='browse-events'>
         <div className='browse' > 
            <form className='browse-form' >
            <input
                  type='text'
                  placeholder='search within name'
               />
               <div className="filter">
                  <select>
                     <option value='' disabled selected>filter events</option>
                     <option value='food'>Food</option>
                     <option value='music'>Music</option>
                     <option value=''>More categories to populate from db</option>
                  </select>
                  
                  <Button color="info">Search</Button>{' '}
                </div>
            </form>

            {eventsMapped}
            
         </div>
         <div className='browse-map'>
            <img src="https://www.isu.edu/media/top-level/page-layouts/maps/campus-map.jpg" alt=""/>
         </div>  
      </section>
   )
}

const mapStateToProps = reduxState => {
   return {
      userLocation: reduxState.user.userLocation,
      events: reduxState.events.events
   }
};

export default connect(mapStateToProps,
   {
      updateEvents
   }
)(BrowseEvents);