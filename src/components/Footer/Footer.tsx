import React from 'react'
import "./style.scss"
import setaFooter from "../../assets/setaFooter.svg"
import locationMapMarker from "../../assets/locationMapMarker.png"
import email from '../../assets/email.png'
import phone from '../../assets/phone.png'

const Footer = () => {

  return (

    <footer className='containerFooter'>
      <section className='sectionOne'>
        <p className='headerOne'>Watchflix</p>
        <p className='headerTwo'>Lorem ipsum dolor sit amet, consec tetur adipis cing elit, sed do eiusmod tempor incididunt ut labore et.</p>
        <p className='headerThree'>Join Newsletters</p>

        <div className='form'>
          <input type="text" placeholder='Insert your mail here' />
          <button className='btnEmail'> <img className='setaFooter' src={setaFooter} alt="setaFooter" /></button>
        </div>
      </section>

      <section className='subContainerFooter'>
        <div className='subContainerSection'>
          <h4 className='title'>Product</h4>
          <p className='subTitleOne'>Movies</p>
          <p className='subTitleTwo'>Videos</p>
        </div>

        <div className='subContainerSection'>
          <h4 className='title'>Media Group</h4>
          <p>Nice Studio</p>
          <p>Nice News</p>
          <p>Nice Tv</p>
        </div>

        <div className='subContainerSection'>
          <h4 className='title'>Sitemap</h4>
          <p>About</p>
          <p>Careers</p>
          <p>Press</p>
        </div>

        <div className='sectionThree'>
          <span><img src={locationMapMarker}></img> 8819 Ohio St.South Gate, California 90280</span>
          <span><img src={email}></img> ourstudio@hello.com</span>
          <span><img src={phone}></img> +271 386-647-3637</span>
        </div>
      </section>

    </footer>
  )
}

export default Footer
