import Image from 'next/image';
import Link from 'next/link';


export default function Header() {
    return (
      <header>
        <div className="logo-container">
          <Link href="/">
            <Image src="/assets/logo.png" alt="Logo" className="logo" width={200} height={150} />
          </Link>
        </div>
      </header>
    );
  }
  