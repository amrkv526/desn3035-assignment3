import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import client from './utils/contentful';
import Link from 'next/link';
import { format } from 'date-fns';
import { marked } from 'marked';
import Image from 'next/image';
import { Asset } from 'contentful';


interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
}

const getFirstParagraph = async (content: string): Promise<string> => {
  const htmlContent = await marked(content); 
  const match = htmlContent.match(/<p>([\s\S]*?)<\/p>/);
  return match ? match[1] : '';
};


export default async function Home() {
  const entries = await client.getEntries({
    content_type: 'blogPosts',
    order: ['-fields.date'], 
    limit: 1,
  });
  

  const sanitizeString = (value: unknown, fallback = ''): string =>
    typeof value === 'string' ? value : fallback;
  
  const getAbsoluteUrl = (url: string): string => {
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    return url;
  };
  
  const latestPost: Post | null = entries.items.length > 0
    ? {
        id: entries.items[0].sys.id,
        title: sanitizeString(entries.items[0].fields.title, 'Untitled'),
        date: sanitizeString(entries.items[0].fields.date),
        image: getAbsoluteUrl(
          sanitizeString(
            (entries.items[0].fields.image as Asset)?.fields?.file?.url,
            '/default-image.jpg' 
          )
        ),
        content: sanitizeString(entries.items[0].fields.content),
      }
    : null;
  
  



  return (
    <>
      <Header />
      <Navbar />
      <div className="content">
        <h2>Latest Article</h2>
        {latestPost ? (
          <article>
            <h3>
              <Link href={`/articles/${latestPost.id}`}>{latestPost.title}</Link>
            </h3>
            <p className="date">
              Published on: {format(new Date(latestPost.date), 'MMMM d, yyyy')}
            </p>
            <Image
              src={latestPost.image}
              alt={latestPost.title || 'Article image'}
              width={750}
              height={300}
            />
            <p>{getFirstParagraph(latestPost.content)}</p>
            <Link href={`/articles/${latestPost.id}`}>Read full article</Link>
          </article>
        ) : (
          <p>No articles available.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
