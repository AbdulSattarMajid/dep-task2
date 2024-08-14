import React from 'react';
import '../App.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About This Site</h1>
        <p>Discover more about the vision and passion behind our blog.</p>
      </div>
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At AbdulSattar's Blog, our mission is to provide insightful, engaging, and informative content on a variety of topics.
            We aim to foster a community of readers and writers who are passionate about learning and sharing ideas.
          </p>
        </section>
        <section className="vision">
          <h2>Our Vision</h2>
          <p>
            We envision a platform where creativity meets knowledge. Our goal is to be a leading source of inspiration and information,
            empowering our readers with the tools and insights they need to thrive in a rapidly evolving world.
          </p>
        </section>
        <section className="team">
          <h2>Meet the Team</h2>
          <p>
            Our team is composed of dedicated individuals who bring diverse perspectives and expertise to the table. We are committed
            to delivering high-quality content and fostering a vibrant community.
          </p>
        </section>
      </div>
      <div className="about-footer">
        <p>Thank you for being a part of AbdulSattar's Blog. We look forward to sharing more with you!</p>
      </div>
    </div>
  );
}

export default About;
