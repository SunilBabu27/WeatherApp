/* eslint-disable no-lone-blocks */
 import React, {useState} from 'react';

{
  /* 
  create an account in RapidAPI, get your own key and url values to query the API and get realtime data
*/
}
const api={
    key: "9ee31cc973mshb9eafd7043fb76fp1fa63bjsn491d732e5f8d",
    base:"https://visual-crossing-weather.p.rapidapi.com//"
}

function App() {
  //use these query and weather states to store the value that you receive from API and display
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const search = evt => {
    if(evt.key==="Enter") {
      fetch(`${api.base}.weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('')
        setWeather(result);
        console.log(result);
    });
  }
}
//Function that takes a date as input and returns the day, date, month and year
  const dateBuilder = (d) =>{
    let months=["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day}   ${date}   ${month}   ${year}`
  }
    return (
      //If type of weather is not undefined, we use 16 C as a limit to check if it is hot or cold to set background accordingly
        <div className={(typeof weather.main !="undefined")?((weather.main.temp>16)?'app warm':'app'):'app'}>
          
        <main>
          
          <div className="search-box">
                <input 
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={e=>setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
                />
            </div>
            {(typeof weather.main !="undefined") ? (
            <div>
            <div className="location-box">
              <div classname="location">{weather.name},{weather.sys.country}</div>
              <div classname="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div classname="temp">
                {/*We round of the temperature based on its decimal value */}
                {Math.round(weather.main.temp)} °C 
              </div>
               
              <div classname="weather">
                {weather.weather[0].main}
              </div>
            </div> 
            </div>
            ): ('')}
              
        </main>
        </div>

   );
}
export default App;
