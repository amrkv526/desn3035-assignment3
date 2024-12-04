"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import '../styles/globals.css';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="content">
        <h2>Latest Article</h2>
        <article>
          <h3>Most Anticipated Toronto DJ Events</h3>
          <p className="date">Published on: October 1, 2024</p>
          <img src="/assets/rave.jpg" alt="Rave scene" />
          <p>
            This fall, Toronto's techno scene is bringing some of the most electrifying DJ sets
            to the city's underground venues. 
          </p>
          <a href="/articles">Read full article</a>
        </article>
        <div className="newsletter-signup">
          <h2>Subscribe to my Newsletter</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email address" required />
              <button type="submit">Subscribe</button>
            </form>
          ) : (
            <p>Thank you for subscribing to my newsletter!</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
