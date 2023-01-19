import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import { useGlobalContext } from '../context/context';
import img from '../images/preloader.gif'
const Dashboard = () => {
  const {loading} = useGlobalContext()

  if(loading){
    return(
      <main>
        <Navbar/>
        <Search/>
        <img src={img} alt='loading' className='loading-img' />
      </main>
    )
  }
  
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
