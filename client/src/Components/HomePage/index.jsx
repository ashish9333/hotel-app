import React , {useState ,useEffect} from 'react'
import axios from 'axios';
import './index.css';
import BookingRoomList from '../BookingRoomList';

const HomePage =() => {
    console.log('asdasd')
    return <>
        <header>
        <nav id="navbar">
        <div className="container">
                <h1 className="logo"><a href="index.html">KBT</a></h1>
                <ul>
                    <li><a className="current" href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
              </div>
            </nav>  
        
         <div id="showcase">
           <div className="container">
               <div className="showcase-content">
                   <h1><span className="text-primary">Enjoy</span> your stay</h1>
                   <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aperiam quos quisquam obcaecati illo facilis.</p>
                   <a className="btn">Book Hotel</a>
               </div>
           </div>
         </div>   
    </header>
    <section id="home-info" className="bg-dark">
        <div className="info-img"></div>
        <div className="info-content">
          <h2><span className="text-primary">History</span> of out Hotel</h2>
          <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
              aliquam dolor alias iste autem, quaerat magni unde accusantium qui
              fuga placeat quidem quo pariatur, voluptatum, ea sequi? Corporis,
              explicabo quisquam dolor placeat praesentium nesciunt mollitia quos
              nobis natus voluptatum asperiores!
          </p>
          <a href="about.html" className="btn btn-light">Read More</a>
        </div>
      </section>
        <section style={{ marginBottom: '5rem'}}>
            <BookingRoomList />
        </section>
       <footer id="main-footer">        
       </footer>
    </>
}

export default HomePage;