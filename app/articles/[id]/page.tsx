import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import client from '../../utils/contentful';
import Link from 'next/link';
import { marked } from 'marked';
import he from 'he';
import { format } from 'date-fns';
import '../../../styles/globals.css';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  genre: string;
  tags: string[];
}

export async function getServerSideProps(context: { query: Record<string, string | undefined> }) {
  const { search = '', genre = '', tags = '' } = context.query;

  const entries = await client.getEntries({ content_type: 'blogPosts' });

  const posts: Post[] = entries.items.map((entry: any) => {
    const { id } = entry.sys;
    const { title, date, image, content, genre = '', tags = [] } = entry.fields;
    return {
      id,
      title,
      date,
      image: image.fields.file.url.startsWith('http')
        ? image.fields.file.url
        : `https:${image.fields.file.url}`,
      content,
      genre,
      tags,
    };
  });

  return {
    props: {
      posts,
      search,
      genre,
      tags,
    },
  };
}

export default function ArticlesPage({
  posts,
  search,
  genre,
  tags,
}: {
  posts: Post[];
  search: string;
  genre: string;
  tags: string;
}) {
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = search ? post.title.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesGenre = genre ? post.genre === genre : true;
    const matchesTags = tags ? tags.split(',').every((tag) => post.tags.includes(tag)) : true;

    return matchesSearch && matchesGenre && matchesTags;
  });

  return (
    <>
      <Header />
      <Navbar />
      <div className="content">
        <h2>All Articles</h2>
        <form method="get" action="/articles" className="filter-form">
          <input
            type="text"
            name="search"
            placeholder="Search posts..."
            defaultValue={search}
            className="search-bar"
          />
          <select name="genre" defaultValue={genre} className="genre-filter">
            <option value="">All Genres</option>
            <option value="Techno">Techno</option>
            <option value="House">House</option>
            <option value="Trance">Trance</option>
          </select>
          <fieldset className="tags-filter">
            <legend>Filter by Tags:</legend>
            {['Club', 'Festival', 'Underground', 'Techno'].map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  name="tags"
                  value={tag}
                  defaultChecked={tags.split(',').includes(tag)}
                />
                {tag}
              </label>
            ))}
          </fieldset>
          <button type="submit">Apply Filters</button>
        </form>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article key={post.id}>
              <h3>
                <Link href={`/articles/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="date">Published on: {format(new Date(post.date), 'MMMM d, yyyy')}</p>
              <Image
                src={post.image}
                alt={post.title}
                width={750}
                height={300}
              />
              <p>{marked(post.content)}</p>
              <Link href={`/articles/${post.id}`}>Read more</Link>
            </article>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
