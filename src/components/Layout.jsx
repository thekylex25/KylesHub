import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Home, Plug, Mail, FileText, LayoutDashboard, Instagram, Github, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { title: "Home", url: createPageUrl("Home"), icon: Home },
    { title: "Web/Plug-ins", url: createPageUrl("Plugins"), icon: Plug },
    { title: "Contact", url: createPageUrl("Contact"), icon: Mail },
    { title: "Legal", url: createPageUrl("Legal"), icon: FileText },
    { title: "Dashboard", url: createPageUrl("Dashboard"), icon: LayoutDashboard },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .gradient-text { background: linear-gradient(135deg, #FF6EC7 0%, #7A3FF5 50%, #00E676 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .gradient-bg { background: linear-gradient(135deg, #FF6EC7 0%, #7A3FF5 50%, #00E676 100%); }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 6px 30px rgba(124, 58, 237, 0.14), 0 0 40px rgba(255, 110, 199, 0.06) inset; }
        .glow-card { filter: drop-shadow(0 8px 30px rgba(124, 58, 237, 0.25)); }
        .hover-lift { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-lift:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 40px rgba(124, 58, 237, 0.3), 0 0 60px rgba(255, 110, 199, 0.1) inset; }
        .btn-glow { transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3); }
        .btn-glow:hover { transform: scale(1.03); box-shadow: 0 6px 30px rgba(124, 58, 237, 0.5); }
        .shimmer { position: relative; overflow: hidden; }
        .shimmer::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent); animation: shimmer 3s infinite; }
        @keyframes shimmer { 0% { left: -100%; } 100% { left: 100%; } }
        .nav-link { position: relative; transition: all 0.3s ease; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: linear-gradient(135deg, #FF6EC7, #7A3FF5, #00E676); transition: width 0.3s ease; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
      `}</style>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 glass-card border-r border-white/10 flex-col z-50">
        <div className="p-6 border-b border-white/10">
          <Link to={createPageUrl("Home")} className="block">
            <h1 className="text-3xl font-bold gradient-text shimmer">Kyle's Hub</h1>
            <p className="text-gray-400 text-sm mt-1">Secure. Create. Share.</p>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all nav-link ${isActive(item.url) ? 'bg-white/10 text-white active' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-3">
          <a href="https://www.instagram.com/divakyle_official/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-pink-400 hover:bg-white/5 transition-all"><Instagram className="w-5 h-5" /><span>Instagram</span></a>
          <a href="https://github.com/thekylex25/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-purple-400 hover:bg-white/5 transition-all"><Github className="w-5 h-5" /><span>GitHub</span></a>
        </div>
      </div>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <Link to={createPageUrl("Home")}> <h1 className="text-2xl font-bold gradient-text">Kyle's Hub</h1> </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:bg-white/10">{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</Button>
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900 backdrop-blur-2xl border-b border-white/20 p-4 space-y-2 shadow-2xl">
            {navigationItems.map((item) => (
              <Link key={item.title} to={item.url} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.url) ? 'bg-white/20 text-white font-semibold' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="https://www.instagram.com/divakyle_official/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-pink-400 bg-pink-400/20 hover:bg-pink-400/30 transition-all"><Instagram className="w-5 h-5" /><span>Instagram</span></a>
              <a href="https://github.com/thekylex25/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-purple-400 bg-purple-400/20 hover:bg-purple-400/30 transition-all"><Github className="w-5 h-5" /><span>GitHub</span></a>
            </div>
          </div>
        )}
      </div>
      {/* Main Content */}
      <div className="lg:pl-64 pt-20 lg:pt-0">
        <main className="min-h-screen">{children}</main>
        {/* Footer */}
        <footer className="glass-card border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold gradient-text mb-3">Kyle's Hub</h3>
                <p className="text-gray-400 mb-4">Logic is my weapon — Secure. Create. Share.</p>
                <p className="text-sm text-gray-500">© thekylex25. Kyle's Hub. All rights reserved.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link key={item.title} to={item.url} className="block text-gray-400 hover:text-white transition-colors">{item.title}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Contact</h4>
                <a href="mailto:nexai.official26@gmail.com" className="block text-gray-400 hover:text-white transition-colors mb-3">nexai.official26@gmail.com</a>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/divakyle_official/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors"><Instagram className="w-6 h-6" /></a>
                  <a href="https://github.com/thekylex25/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors"><Github className="w-6 h-6" /></a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-sm text-gray-500">Designed with ❤️ by thekylex25</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
