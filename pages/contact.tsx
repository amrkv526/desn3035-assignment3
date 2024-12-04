"use client";

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import '../styles/globals.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="contactform">
        {!submitted ? (
          <>
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" required />
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" required />
              <label htmlFor="message">Message:</label>
              <textarea id="message" rows={4} required></textarea>
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="thank-you-message">
            <h2>Thank you for your message!</h2>
            <p>I will get back to you shortly.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
