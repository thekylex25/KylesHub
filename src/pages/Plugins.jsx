import React, { useState, useEffect } from "react";
import { getPlugins, savePlugins } from "../utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Search, ExternalLink, Package, Loader2 } from "lucide-react";

export default function Plugins() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [plugins, setPlugins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPlugins(getPlugins());
    setIsLoading(false);
  }, []);

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || plugin.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categoryColors = {
    web: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    apk: "bg-green-500/20 text-green-400 border-green-500/30",
    plugin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Websites & Plug-Ins</h1>
            <p className="text-lg text-gray-400">Explore tools, plugins, and web applications from the community</p>
          </div>
        </div>
        <div className="glass-card glow-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="Search plugins, websites, tools..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500" />
            </div>
            <div className="flex gap-2">
              <Button variant={categoryFilter === "all" ? "default" : "outline"} onClick={() => setCategoryFilter("all")}>All</Button>
              <Button variant={categoryFilter === "web" ? "default" : "outline"} onClick={() => setCategoryFilter("web")}>Web</Button>
              <Button variant={categoryFilter === "apk" ? "default" : "outline"} onClick={() => setCategoryFilter("apk")}>APK</Button>
              <Button variant={categoryFilter === "plugin" ? "default" : "outline"} onClick={() => setCategoryFilter("plugin")}>Plugin</Button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : filteredPlugins.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 glass-card rounded-3xl mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              {searchQuery || categoryFilter !== "all" ? "No results found" : "No websites or plug-ins available right now."}
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {searchQuery || categoryFilter !== "all" ? "Try adjusting your search or filters" : "Check back soon or submit your project."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.map(plugin => (
              <Card key={plugin.id || plugin.name} className="glass-card glow-card border-white/10 hover-lift group overflow-hidden">
                {plugin.banner_url && (
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <img src={plugin.banner_url} alt={plugin.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl text-white">{plugin.name}</CardTitle>
                    <Badge className={`${categoryColors[plugin.category]} border`}>{plugin.category}</Badge>
                  </div>
                  {plugin.made_by && <p className="text-sm text-gray-400">by {plugin.made_by}</p>}
                </CardHeader>
                <CardContent className="space-y-4">
                  {plugin.social_media_link && (
                    <a href={plugin.social_media_link} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">🔗 Social Media</a>
                  )}
                  <a href={plugin.redirect_url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full gradient-bg text-white hover:opacity-90 btn-glow group">Visit<ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
