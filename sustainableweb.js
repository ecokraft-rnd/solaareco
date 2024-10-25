import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

// Sustainable components with minimal JavaScript and efficient CSS
const EcoComponents = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Toggle theme with system preference detection
  React.useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Efficient Navigation */}
      <nav className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg">Eco Site</div>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Desktop Menu */}
              <div className="hidden md:flex gap-4">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Contact</a>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-2">
              <a href="#" className="block py-2 hover:underline">Home</a>
              <a href="#" className="block py-2 hover:underline">About</a>
              <a href="#" className="block py-2 hover:underline">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section - Text-first approach */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Sustainable Web Design</h1>
          <p className="text-lg mb-4">Building websites with minimal environmental impact through efficient code and optimized resources.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Learn More
          </button>
        </section>

        {/* Feature Cards - Minimal design */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">Efficient Code</h2>
            <p>Minimal JavaScript and optimized CSS for reduced processing power.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">Dark Mode</h2>
            <p>Reduced screen energy consumption with system-aware dark mode.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">Light Assets</h2>
            <p>SVG icons and system fonts for minimal data transfer.</p>
          </div>
        </section>

        {/* Content Section - Text focused */}
        <section className="prose dark:prose-invert max-w-none">
          <h2>Why Sustainable Web Design?</h2>
          <p>
            Sustainable web design focuses on creating beautiful, functional websites
            while minimizing environmental impact. This is achieved through:
          </p>
          <ul>
            <li>Minimal JavaScript usage</li>
            <li>Efficient CSS utilizing system defaults</li>
            <li>Reduced server requests</li>
            <li>Optimized asset loading</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-2">About</h3>
              <p className="text-sm">Building a more sustainable web, one site at a time.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Links</h3>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Connect</h3>
              <p className="text-sm">Follow us for updates on sustainable web practices.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcoComponents;
