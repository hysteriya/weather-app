import React, {useState,} from 'react'
import axios from 'axios'
//import { useAuth0 } from "@auth0/auth0-react";

function App() {
  // //log functions
  // const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  // const LoginButton = () => {
  //   return (
  //     <div className='login button'>
  //       <button onClick={() => loginWithRedirect()}>Log In</button>
  //     </div>
  //   );
  // };

  // const LogoutButton = () => {
  //   return (
  //     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
  //       Log Out
  //     </button>
  //   );
  // };

  // const Profile = () => {
  //   if (isLoading) {
  //     return <div>Loading ...</div>;
  //   }
  //   return (
  //     isAuthenticated && (
  //       <div>
  //         <p>Welcome {user.email}</p>
  //       </div>
  //     )
  //   );
  // };
  
  
  const [data,setData]=useState({})
  const [location, setLocation]= useState('')
  const url=`https://api.weatherapi.com/v1/current.json?key=f6bfbe9376064c2aba9154443232011&q=${location}`
  const searchLoc =(event)=>{
    if (event.key==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  

  return (
  <div className="App">
    {/* <div className='navbar'>
    <div className='login'>
      {
        isAuthenticated ? (
          <ul>
           <li> <LogoutButton /> </li>
           <li> <Profile /> </li>
          </ul>)
          :( <LoginButton />)
      }
    </div>
    </div> */}


    <div className='search'>
      <input
      value={location}
      onChange={event => setLocation(event.target.value)}
      placeholder='Enter Location'
      onKeyDown={searchLoc}
      type='text'/>
    </div>

    <div className='container'>
      <div className='top'>
        <div className='location'>
              {data.location? <p>{data.location.name}</p>:null}
        </div> 
        
        <div className='temp'>
            {data.current? <h1>{data.current.temp_c}°C</h1>:null}
        </div>
      
        <div className='description'>
          {data.current? <p>{data.current.condition.text}</p>:null}
        </div>
          
      </div>

      {data.location !== undefined &&
      <div className='bottom'>
      
      <div className='feels'>
         {data.current? <p className='bold'>{data.current.feelslike_c}°</p>:null}
           <p> Feels like</p>
         </div>
     
       <div className='humidity'>
         {data.current? <p className='bold'>{data.current.humidity}%</p>:null}
           <p> Humidity</p>
       </div>
       
       <div className='winds'>
           {data.current? <p className='bold'>{data.current.wind_kph}KPH</p>:null}
           <p>Wind speed</p>
       </div>
       </div>
      }
      
      
    </div>
  </div>
  );
}

export default App;
