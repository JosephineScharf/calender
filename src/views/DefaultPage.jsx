
import '../App.css';
import myimage from '../assets/calendar.png';
import EventList from '../components/EventList';
import { useState, useEffect } from 'react';
import Searchfield from '../components/Searchfield';



const events = [
  {id: 1, title: "Meeting", date: "2025-03-22", description: "About party in Aarhus"},
  {id: 2, title: "Workshop", date: "2025-04-23", description: "Designing a new app"}, 
  {id: 3, title: "Team Meeting", date: "2026-05-10", description: "Quarterly planning session"},
  {id: 4, title: "Product Launch", date: "2026-06-02", description: "Releasing the new feature set"},
  {id: 5, title: "Client Demo", date: "2026-07-18", description: "Showing prototype to stakeholders"},

];



function DefaultPage() {

// Looks for information in webstorage, if there are some
// filterText is equal to this value, else its am empty string
  const [filterText, setFilterText] = useState (() => {
    const savedFilter = localStorage.getItem("filterTextinStorage");
    return savedFilter ? savedFilter : "";
  });


// Everytime the filterText variable changes, the information is saved to webstorage, with the key 'filterTextinStorage'
  useEffect(() => {
    localStorage.setItem("filterTextinStorage", filterText);
  }, [filterText]);


const sortedEvents = events.toSorted((a,b) =>
  a.date.localeCompare(b.date, "en", {sensitivity: "base"})
);

//Filter events based on the user input
const filteredEvents = sortedEvents.filter(event =>
   event.title.toLowerCase().includes(filterText.toLowerCase())
);

// Event handler function.
// Change the value of variable "filtertext"
// makes the component re-render
// function handleinputChange (event) {...}
const handleInputChange = (event) => {
  setFilterText(event.target.value);

}

  return (
    <div>
  
    <img src={myimage} alt="calendar picture" />
  
  <Searchfield handleinput = {handleInputChange} filter={filterText} />
  <EventList events={filteredEvents} />

    </div>
  )
}

export default DefaultPage
