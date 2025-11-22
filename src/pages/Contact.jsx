import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Mail, Instagram, Github, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:nexai.official26@gmail.com?subject=${subject}&body=${body}`;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg rounded-2xl mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-400">Have questions or want to collaborate? Reach out to us!</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="glass-card glow-card border-white/10 hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3"><Mail className="w-6 h-6 text-purple-400" />Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:nexai.official26@gmail.com" className="text-xl text-purple-400 hover:text-purple-300 transition-colors">nexai.official26@gmail.com</a>
                <p className="text-gray-400 mt-2">For general inquiries, support, or partnerships</p>
              </CardContent>
            </Card>
            <Card className="glass-card glow-card border-white/10 hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Social Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href="https://www.instagram.com/divakyle_official/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center"><Instagram className="w-6 h-6 text-white" /></div>
                  <div>
                    <p className="text-white font-semibold group-hover:text-pink-400 transition-colors">Instagram</p>
                    <p className="text-sm text-gray-400">@divakyle_official</p>
                  </div>
                </a>
                <a href="https://github.com/thekylex25/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center"><Github className="w-6 h-6 text-white" /></div>
                  <div>
                    <p className="text-white font-semibold group-hover:text-purple-400 transition-colors">GitHub</p>
                    <p className="text-sm text-gray-400">@thekylex25</p>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
          {/* Contact Form */}
          <Card className="glass-card glow-card border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea id="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-32" placeholder="How can we help you?" required />
                </div>
                <Button type="submit" className="w-full gradient-bg text-white hover:opacity-90 btn-glow rounded-full py-6 text-lg font-semibold">Send Message<Send className="w-5 h-5 ml-2" /></Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 glass-card glow-card border-green-500/20 p-6 rounded-2xl max-w-sm animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center"><CheckCircle className="w-6 h-6 text-green-400" /></div>
            <div>
              <p className="text-white font-semibold">Opening email client...</p>
              <p className="text-gray-400 text-sm">Your message is ready to send</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
