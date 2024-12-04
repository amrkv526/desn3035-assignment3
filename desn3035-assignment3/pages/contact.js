import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="contactform">
        <h2>Get in Touch</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Name:</label>
          <input type="text" required />
          <label>Email:</label>
          <input type="email" required />
          <label>Message:</label>
          <textarea rows="4" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
