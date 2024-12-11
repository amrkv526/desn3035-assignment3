import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import client from '../../utils/contentful';
import { format } from 'date-fns';
import { marked } from 'marked';
import '../../../styles/globals.css';
import Image from 'next/image';
import { Entry } from 'contentful'; 

interface BlogPostFields {
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
}

const formatContentAsHTML = async (content: string | Promise<string>): Promise<string> => {
  const resolvedContent = await Promise.resolve(content);
  return marked(resolvedContent);
};

export default async function SingleArticle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  const entry: Entry<BlogPostFields> = await client.getEntry<BlogPostFields>(id);

  if (!entry) {
    return <div>Article not found.</div>;
  }

  const article = {
    id: entry.sys.id,
    title: entry.fields.title,
    date: format(new Date(entry.fields.date), 'MMMM d, yyyy'),
    image: entry.fields.image.fields.file.url.startsWith('http')
      ? entry.fields.image.fields.file.url
      : `https:${entry.fields.image.fields.file.url}`,
    content: await formatContentAsHTML(entry.fields.content),
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
  const entries = await client.getEntries<BlogPostFields>({ content_type: 'blogPosts' });

  return entries.items.map((entry) => ({
    id: entry.sys.id,
  }));
}
