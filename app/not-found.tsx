// pages/404.js
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <h1>Go back to the homepage</h1>
      </Link>
    </div>
  );
};

export default Custom404;
