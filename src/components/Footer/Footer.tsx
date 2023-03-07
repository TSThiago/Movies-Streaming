import React from 'react'
import "./style.scss"
import setaFooter from "../../assets/setaFooter.svg"

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
        <div className='sectionTwo'>
          <h4 className='title'>Product</h4>
          <p className='subTitleOne'>Movies</p>
          <p className='subTitleTwo'>Videos</p>
        </div>

        <div className='sectionThree'>
          <h4 className='title'>Media Group</h4>
          <p>Nice News</p>
          <p>Nice Tv</p>
        </div>

        <div className='sectionFour'>
          <h4 className='title'>Sitemap</h4>
          <p>About</p>
          <p>Careers</p>
          <p>Press</p>
        </div>

      </section>

    </footer>
  )
}

export default Footer
