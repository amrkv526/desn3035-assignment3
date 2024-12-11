import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import client from '../../utils/contentful';
import { format } from 'date-fns';
import { marked } from 'marked';
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

interface Entry {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    date: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    content: string;
    genre?: string;
    tags?: string[];
  };
}

const formatContentAsHTML = (content: string): string => marked(content);

export default async function SingleArticle({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch the article entry by ID
  const entry = await client.getEntry<Entry>(id);

  const article: Post = {
    id: entry.sys.id,
    title: entry.fields.title,
    date: format(new Date(entry.fields.date), 'MMMM d, yyyy'),
    image: entry.fields.image.fields.file.url.startsWith('http')
      ? entry.fields.image.fields.file.url
      : `https:${entry.fields.image.fields.file.url}`,
    content: formatContentAsHTML(entry.fields.content),
    genre: entry.fields.genre || '',
    tags: entry.fields.tags || [],
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="content single-article">
        <h2 className="single-article-title">{article.title}</h2>
        <p className="date single-article-date">Published on: {article.date}</p>
        <Image
          className="single-article-image"
          src={article.image}
          alt={article.title}
          width={800}
          height={600}
        />
        <div
          className="single-article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
        <div className="tags single-article-tags">
          <strong>Tags:</strong> {article.tags.join(', ')}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const entries = await client.getEntries<Entry>({ content_type: 'blogPosts' });

  return entries.items.map((entry) => ({
    id: entry.sys.id,
  }));
}
