import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Articles() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="content">
        <h2>Latest Articles</h2>
        <article>
          <h3>Most Anticipated Toronto DJ Events</h3>
          <p className="date">Published on: October 1, 2024</p>
          <img src="/assets/rave.jpg" alt="Rave scene" />
          <p>
            This fall, Toronto's techno scene is bringing some of the most electrifying DJ sets
            to the city's underground venues.
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
}
