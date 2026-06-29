import './globals.css';

export const metadata = {
  title: 'Daniel Lee | Interactive Portfolio & Developer Showcase',
  description: 'Welcome to my dynamic portfolio. Explore interactive projects, live GitHub integrations, and details of my software engineering experience.',
  metadataBase: new URL('https://daniellee-portfolio.vercel.app'),
  openGraph: {
    title: 'Daniel Lee | Interactive Portfolio',
    description: 'Dynamic portfolio showing interactive projects and live GitHub repositories.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Lee | Interactive Portfolio',
    description: 'Dynamic portfolio showing interactive projects and live GitHub repositories.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="glow-bg">
          <div className="glow-circle glow-1 animate-glow" style={{ animationDelay: '0s' }}></div>
          <div className="glow-circle glow-2 animate-glow" style={{ animationDelay: '2s' }}></div>
          <div className="glow-circle glow-3 animate-glow" style={{ animationDelay: '4s' }}></div>
        </div>
        {children}
      </body>
    </html>
  );
}
