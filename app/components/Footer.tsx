import Image from 'next/image';
import Link from 'next/link';


export default function Footer() {
    return (
      <footer>
        <div className="social-links">
          <Link href="https://github.com/amrkv526" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/github.png" alt="Github" width="40" height="40" />
          </Link>
          <Link href="https://www.linkedin.com/in/agne-m-38297160/" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/linkedin.png" alt="LinkedIn" width="40" height="40" />
          </Link>
        </div>
        <p>&copy; 2024 Agne&apos;s Blog. All rights reserved.</p>
      </footer>
    );
  }
  