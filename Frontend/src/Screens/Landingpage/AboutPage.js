import React from "react";
import "../../Styles/AboutPage.css";
import aboutVideo from "../../Images/AboutVideo.mp4"; 

function AboutPage() {
  return (
    <section className="section-about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="about-info">
              <h2 className="title">
                About <span>Us</span>
              </h2>
              <p className="description">
              Welcome to Scan & Dine, where we’re redefining the dining experience with innovative technology and seamless service. Our mission is to elevate restaurants and enhance customer interactions through our state-of-the-art Restaurant Menu Management System.      
              </p>
              <br />
              <p className="description">
              At Scan & Dine, we believe that technology should simplify and enrich the dining experience. Our platform allows restaurant owners to effortlessly manage their menus, generate interactive QR codes, and engage with customers from a single, intuitive dashboard. With our solution, updating menus and reaching diners has never been easier.

For customers, we provide a dynamic and engaging digital menu experience. Simply scan the QR code on your table to access a user-friendly digital menu.
        
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-video">
              <video width="100%" height="auto" autoPlay loop muted>
                <source src={aboutVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
