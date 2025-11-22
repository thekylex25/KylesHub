import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "../components/ui/button";
import { Shield, Code, Users, ArrowRight, Sparkles, Instagram, Github, Lock, Zap } from "lucide-react";
import ConsentModal from "../components/ConsentModal";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ConsentModal />
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-gray-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>White-hat cybersecurity + creator hub</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">Kyle's Hub</h1>
              <h2 className="text-2xl lg:text-3xl font-semibold gradient-text">"Logic is my weapon — Secure. Create. Share."</h2>
              <p className="text-lg text-gray-400 leading-relaxed">A white-hat cybersecurity + creator hub for plugins, tools and community. Join a space where security meets creativity.</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to={createPageUrl("Plugins")}> <Button className="w-full sm:w-auto gradient-bg text-white hover:opacity-90 btn-glow rounded-full px-8 py-6 text-lg font-semibold">Explore Plugins <ArrowRight className="w-5 h-5 ml-2" /></Button> </Link>
                <Link to={createPageUrl("Contact")}> <Button variant="outline" className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold">Get In Touch</Button> </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 gradient-bg opacity-20 blur-3xl rounded-full"></div>
              <div className="relative glass-card glow-card rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center"><Shield className="w-8 h-8 text-white" /></div>
                  <div><h3 className="text-white font-semibold text-lg">Secure by Design</h3><p className="text-gray-400 text-sm">White-hat approach</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center"><Code className="w-8 h-8 text-white" /></div>
                  <div><h3 className="text-white font-semibold text-lg">Creator First</h3><p className="text-gray-400 text-sm">Build & share tools</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center"><Users className="w-8 h-8 text-white" /></div>
                  <div><h3 className="text-white font-semibold text-lg">Community Driven</h3><p className="text-gray-400 text-sm">Collaborate & grow</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Social Cards */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <a href="https://www.instagram.com/divakyle_official/" target="_blank" rel="noopener noreferrer" className="glass-card glow-card rounded-3xl p-8 hover-lift group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center"><Instagram className="w-8 h-8 text-white" /></div>
                <div><h3 className="text-2xl font-bold text-white">Instagram</h3><p className="text-gray-400">@divakyle_official</p></div>
              </div>
              <p className="text-gray-300">Follow for updates, behind-the-scenes content, and community highlights.</p>
              <ArrowRight className="w-6 h-6 text-pink-400 mt-4 group-hover:translate-x-2 transition-transform" />
            </a>
            <a href="https://github.com/thekylex25/" target="_blank" rel="noopener noreferrer" className="glass-card glow-card rounded-3xl p-8 hover-lift group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center"><Github className="w-8 h-8 text-white" /></div>
                <div><h3 className="text-2xl font-bold text-white">GitHub</h3><p className="text-gray-400">@thekylex25</p></div>
              </div>
              <p className="text-gray-300">Explore open-source projects, contributions, and code repositories.</p>
              <ArrowRight className="w-6 h-6 text-purple-400 mt-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-xl text-gray-400">Everything you need in one secure platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card glow-card rounded-3xl p-8 hover-lift">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6"><Lock className="w-7 h-7 text-white" /></div>
              <h3 className="text-2xl font-bold text-white mb-3">White-hat Cybersecurity Resources</h3>
              <p className="text-gray-400 leading-relaxed">Ethical hacking tools, security tutorials, and best practices for protecting digital assets. Learn and grow with the community.</p>
            </div>
            <div className="glass-card glow-card rounded-3xl p-8 hover-lift">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6"><Zap className="w-7 h-7 text-white" /></div>
              <h3 className="text-2xl font-bold text-white mb-3">Plugins & Web Tools</h3>
              <p className="text-gray-400 leading-relaxed">Discover hosted and community-contributed plugins, websites, and tools. Enhance your workflow with curated resources.</p>
            </div>
            <div className="glass-card glow-card rounded-3xl p-8 hover-lift">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6"><Users className="w-7 h-7 text-white" /></div>
              <h3 className="text-2xl font-bold text-white mb-3">Community Collaboration</h3>
              <p className="text-gray-400 leading-relaxed">Connect with like-minded creators and security enthusiasts. Share knowledge and build amazing projects together.</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card glow-card rounded-3xl p-12 text-center shimmer">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Explore?</h2>
            <p className="text-xl text-gray-400 mb-8">Discover amazing tools, plugins, and resources from the Kyle's Hub community.</p>
            <Link to={createPageUrl("Plugins")}> <Button className="gradient-bg text-white hover:opacity-90 btn-glow rounded-full px-10 py-6 text-lg font-semibold">Browse Plugins & Tools <ArrowRight className="w-5 h-5 ml-2" /></Button> </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
