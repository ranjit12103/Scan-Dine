import React from "react";
import "../../Styles/Service.css";

function ServicesSection() {
  return (
    <section className="section-services">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-10 col-lg-8">
            <div className="header-section">
              <h2 className="title">
               Why <span>Scan & Dine?</span>
              </h2>
              <p className="description">
                Discover how Scan & Dine transforms the dining experience with innovative technology and seamless service.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <SingleService
            title="Smart Menu Management"
            description="Effortlessly manage your restaurant’s menu with our intuitive platform. Add, update, and remove menu items with ease."
          />

          <SingleService
            title="Dynamic QR Code Generation"
            description="Generate QR codes instantly that link to your digital menu. Simplify menu access and enhance customer engagement."
          />

          <SingleService
            title="Interactive Digital Menus"
            description="Provide a rich, interactive digital menu experience. Customers can navigate and explore your menu in a user-friendly format."
          />

          <SingleService
            title="Enhanced Customer Engagement"
            description="Boost interaction with features like  Discounts, special offers, and feedback options directly from the digital menu."
          />

          <SingleService
            title="Easy Order Of Food"
            description="Allow customers to create  Order food just by adding food items from Menu card, manage their preferences and access exclusive discounts and promotions."
          />

<SingleService
            title="Order Food with 1 Scan  From Your Table"
            description="Enable customers to place orders directly from their table using their smartphones, So don't wait Start it now."
          />
        </div>
      </div>
    </section>
  );
}

function SingleService({ title, description }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="single-service">
        <div className="part-1">
          <h3 className="title">{title}</h3>
        </div>
        <div className="part-2">
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;
