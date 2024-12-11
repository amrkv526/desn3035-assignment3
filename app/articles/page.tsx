import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client from '../utils/contentful';
import Link from 'next/link';
import { marked } from 'marked';
import he from 'he';
import { format } from 'date-fns';
import '../../styles/globals.css';
import Image from 'next/image';


interface EntryFields {
  title?: string;
  date?: string;
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  content?: string;
  genre?: string;
  tags?: string[];
}

interface ContentfulEntry {
  sys: {
    id: string;
  };
  fields: EntryFields;
}

interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  genre: string;
  tags: string[];
}

const transformEntryToPost = async (entry: ContentfulEntry): Promise<Post> => {
  const { sys, fields } = entry;
  const parsedContent = fields.content ? await marked(fields.content) : '';
  return {
    id: sys.id,
    title: fields.title || 'Untitled',
    date: fields.date || '',
    image: fields.image?.fields.file.url ? `https:${fields.image.fields.file.url}` : '',
    content: parsedContent,
    genre: fields.genre || '',
    tags: fields.tags || [],
  };
};

interface PageProps {
  searchParams?: Record<string, string | undefined>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams || {};
  const { search = '', genre = '', tags = '' } = resolvedSearchParams;

  try {
    const rawEntries = await client.getEntries({ content_type: 'blogPosts' });

    const posts: Post[] = await Promise.all(rawEntries.items.map(transformEntryToPost));

    const filteredPosts = posts.filter((post) => {
      const matchesSearch = search
        ? post.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesGenre = genre ? post.genre === genre : true;
      const matchesTags = tags
        ? tags.split(',').every((tag) => post.tags.includes(tag))
        : true;

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
                <p className="date">
                  Published on: {format(new Date(post.date), 'MMMM d, yyyy')}
                </p>
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title || 'Article image'}
                    width={750}
                    height={300}
                  />
                ) : (
                  <div className="placeholder-image">
                    <p>No image available</p>
                  </div>
                )}
                <p>{he.decode(post.content.split('.')[0] || '')}...</p>
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
  } catch (error) {
    console.error('Error fetching articles:', error);
    return (
      <>
        <Header />
        <Navbar />
        <div className="content">
          <h2>Error loading articles</h2>
          <p>There was an issue fetching the articles. Please try again later.</p>
        </div>
        <Footer />
      </>
    );
  }
}
