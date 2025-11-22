import React, { useState, useEffect } from "react";
import { getSubmissions, saveSubmissions, getPlugins, savePlugins } from "../utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Lock, AlertCircle, Plus, Download, Trash, Eye, CheckCircle, Search, Loader2, Trash2 } from "lucide-react";

const DEMO_PASSWORD = "hjgsuieguds8ugigfui-hgewfuiguiew78-gysgyufew8";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddPlugin, setShowAddPlugin] = useState(false);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletePending, setDeletePending] = useState(false);
  // Add Plugin Modal State
  const [pluginName, setPluginName] = useState("");
  const [pluginCategory, setPluginCategory] = useState("web");
  const [pluginUrl, setPluginUrl] = useState("");
  const [pluginBanner, setPluginBanner] = useState("");
  const [pluginCreator, setPluginCreator] = useState("");
  const [pluginError, setPluginError] = useState("");
  const [pluginSubmitting, setPluginSubmitting] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(""); // For previewing the banner image

  useEffect(() => {
    setSubmissions(getSubmissions());
    setIsLoading(false);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password");
    }
  };

  const handleClearAll = () => {
    saveSubmissions([]);
    setSubmissions([]);
    setShowClearAllConfirm(false);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Username", "Email", "Phone", "DOB", "IP Address", "Timestamp", "Reviewed"];
    const rows = filteredSubmissions.map((sub, idx) => [
      idx + 1,
      sub.username,
      sub.email,
      sub.phone,
      sub.dob || "N/A",
      sub.ip_address,
      sub.created_date,
      sub.reviewed ? "Yes" : "No"
    ]);
    const csvContent = [headers.join(","), ...rows.map(row => row.map(cell => `"${cell}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kyleshub_users_${new Date().toISOString().slice(0,10).replace(/-/g,"")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id) => {
    setDeletePending(true);
    setTimeout(() => {
      const updated = submissions.filter(s => s.created_date !== id);
      saveSubmissions(updated);
      setSubmissions(updated);
      setShowDeleteConfirm(false);
      setSelectedSubmission(null);
      setDeletePending(false);
    }, 500);
  };

  const handleToggleReviewed = (id) => {
    const updated = submissions.map(s => s.created_date === id ? { ...s, reviewed: !s.reviewed } : s);
    saveSubmissions(updated);
    setSubmissions(updated);
  };

  const filteredSubmissions = submissions.filter(sub =>
    sub.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.phone?.includes(searchQuery)
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="glass-card glow-card border-white/10 w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center"><Lock className="w-8 h-8 text-white" /></div>
            </div>
            <CardTitle className="text-3xl text-white text-center">Dashboard Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Input type="password" placeholder="Enter password" value={password} onChange={e => { setPassword(e.target.value); setPasswordError(""); }} className="bg-white/5 border-white/10 text-white text-center text-lg tracking-wider" />
                {passwordError && (<p className="text-sm text-red-400 flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4" />{passwordError}</p>)}
              </div>
              <Button type="submit" className="w-full gradient-bg text-white hover:opacity-90 btn-glow rounded-full py-6 text-lg font-semibold">Unlock Dashboard</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-400">Manage user submissions and data</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setShowAddPlugin(true)} className="gradient-bg text-white hover:opacity-90 btn-glow"><Plus className="w-4 h-4 mr-2" />Create Website/Plug-in</Button>
            <Button onClick={exportToCSV} variant="outline" className="border-white/20 text-white hover:bg-white/10" disabled={filteredSubmissions.length === 0}><Download className="w-4 h-4 mr-2" />Export CSV</Button>
            <Button onClick={() => setShowClearAllConfirm(true)} variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10" disabled={submissions.length === 0}><Trash className="w-4 h-4 mr-2" />Clear All Data</Button>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">Logout</Button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card glow-card border-white/10"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-400">Total Submissions</p><p className="text-3xl font-bold text-white mt-1">{submissions.length}</p></div><div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center"><Eye className="w-6 h-6 text-white" /></div></div></CardContent></Card>
          <Card className="glass-card glow-card border-white/10"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-400">Reviewed</p><p className="text-3xl font-bold text-white mt-1">{submissions.filter(s => s.reviewed).length}</p></div><div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center"><CheckCircle className="w-6 h-6 text-green-400" /></div></div></CardContent></Card>
          <Card className="glass-card glow-card border-white/10"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-400">Pending Review</p><p className="text-3xl font-bold text-white mt-1">{submissions.filter(s => !s.reviewed).length}</p></div><div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center"><AlertCircle className="w-6 h-6 text-yellow-400" /></div></div></CardContent></Card>
        </div>
        <div className="glass-card glow-card rounded-2xl p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="Search by username, email, or phone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
        </div>
        <Card className="glass-card glow-card border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-purple-400 animate-spin" /></div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-20"><p className="text-gray-400 text-lg">No submissions found</p></div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="border-white/10 hover:bg-white/5">
                    <th className="text-gray-300 px-4 py-2">Username</th>
                    <th className="text-gray-300 px-4 py-2">Email</th>
                    <th className="text-gray-300 px-4 py-2">Phone</th>
                    <th className="text-gray-300 px-4 py-2">DOB</th>
                    <th className="text-gray-300 px-4 py-2">IP Address</th>
                    <th className="text-gray-300 px-4 py-2">Timestamp</th>
                    <th className="text-gray-300 px-4 py-2">Status</th>
                    <th className="text-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map(submission => (
                    <tr key={submission.created_date} className="border-white/10 hover:bg-white/5">
                      <td className="font-medium text-white px-4 py-2">{submission.username}</td>
                      <td className="text-gray-300 px-4 py-2">{submission.email}</td>
                      <td className="text-gray-300 px-4 py-2">{submission.phone}</td>
                      <td className="text-gray-300 px-4 py-2">{submission.dob || "N/A"}</td>
                      <td className="text-gray-300 font-mono text-sm px-4 py-2">{submission.ip_address}</td>
                      <td className="text-gray-300 text-sm px-4 py-2">{new Date(submission.created_date).toLocaleString()}</td>
                      <td className="px-4 py-2"><Badge className={submission.reviewed ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>{submission.reviewed ? "Reviewed" : "Pending"}</Badge></td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setSelectedSubmission(submission)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"><Eye className="w-4 h-4" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => handleToggleReviewed(submission.created_date)} className="text-green-400 hover:text-green-300 hover:bg-green-500/10"><CheckCircle className="w-4 h-4" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => { setSelectedSubmission(submission); setShowDeleteConfirm(true); }} className="text-red-400 hover:text-red-300 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
        {/* Published Plugins/Webs/APKs Section */}
        <div className="glass-card glow-card rounded-2xl p-6 mb-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Published Plugins / Websites / APKs</h2>
          <div className="overflow-x-auto">
            {getPlugins().length === 0 ? (
              <div className="text-center py-8 text-gray-400">No published items found.</div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="border-white/10 hover:bg-white/5">
                    <th className="text-gray-300 px-4 py-2">Name</th>
                    <th className="text-gray-300 px-4 py-2">Category</th>
                    <th className="text-gray-300 px-4 py-2">Created By</th>
                    <th className="text-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getPlugins().map(plugin => (
                    <tr key={plugin.id} className="border-white/10 hover:bg-white/5">
                      <td className="font-medium text-white px-4 py-2">{plugin.name}</td>
                      <td className="text-gray-300 px-4 py-2">{plugin.category}</td>
                      <td className="text-purple-400 px-4 py-2">{plugin.made_by}</td>
                      <td className="px-4 py-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                          onClick={() => {
                            const plugins = getPlugins().filter(p => p.id !== plugin.id);
                            savePlugins(plugins);
                            setSubmissions(getSubmissions()); // Refresh dashboard
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      {selectedSubmission && !showDeleteConfirm && (
        <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent className="glass-card border-white/10 text-white max-w-2xl">
            <DialogHeader><DialogTitle className="text-2xl">Submission Details</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-400">Username</p><p className="text-lg font-semibold">{selectedSubmission.username}</p></div>
                <div><p className="text-sm text-gray-400">Email</p><p className="text-lg font-semibold">{selectedSubmission.email}</p></div>
                <div><p className="text-sm text-gray-400">Phone</p><p className="text-lg font-semibold">{selectedSubmission.phone}</p></div>
                <div><p className="text-sm text-gray-400">Date of Birth</p><p className="text-lg font-semibold">{selectedSubmission.dob || "Not provided"}</p></div>
                <div><p className="text-sm text-gray-400">IP Address</p><p className="text-lg font-semibold font-mono">{selectedSubmission.ip_address}</p></div>
                <div><p className="text-sm text-gray-400">Submitted</p><p className="text-lg font-semibold">{new Date(selectedSubmission.created_date).toLocaleString()}</p></div>
              </div>
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setSelectedSubmission(null)} className="border-white/20 text-white hover:bg-white/10">Close</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showDeleteConfirm && selectedSubmission && (
        <Dialog open={showDeleteConfirm} onOpenChange={() => { setShowDeleteConfirm(false); setSelectedSubmission(null); }}>
          <DialogContent className="glass-card border-white/10 text-white">
            <DialogHeader><DialogTitle className="text-2xl">Confirm Deletion</DialogTitle></DialogHeader>
            <p className="text-gray-300 py-4">Are you sure you want to delete the submission from <strong>{selectedSubmission.username}</strong>? This action cannot be undone.</p>
            <DialogFooter className="flex gap-3">
              <Button variant="outline" onClick={() => { setShowDeleteConfirm(false); setSelectedSubmission(null); }} className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
              <Button onClick={() => handleDelete(selectedSubmission.created_date)} disabled={deletePending} className="bg-red-600 hover:bg-red-700 text-white">{deletePending ? "Deleting..." : "Delete"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showClearAllConfirm && (
        <Dialog open={showClearAllConfirm} onOpenChange={setShowClearAllConfirm}>
          <DialogContent className="glass-card border-white/10 text-white">
            <DialogHeader><DialogTitle className="text-2xl">Clear All Data</DialogTitle></DialogHeader>
            <p className="text-gray-300 py-4">Are you sure you want to delete ALL {submissions.length} submissions? This action cannot be undone.</p>
            <DialogFooter className="flex gap-3">
              <Button variant="outline" onClick={() => setShowClearAllConfirm(false)} className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
              <Button onClick={handleClearAll} className="bg-red-600 hover:bg-red-700 text-white">Clear All Data</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {/* AddPluginModal placeholder (not implemented in this patch) */}
      {showAddPlugin && (
        <Dialog open={showAddPlugin} onOpenChange={() => setShowAddPlugin(false)}>
          <DialogContent className="glass-card border-white/10 text-white max-w-2xl">
            <DialogHeader><DialogTitle className="text-2xl">Add Website / Plugin</DialogTitle></DialogHeader>
            <form
              className="space-y-6 py-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setPluginError("");
                if (!pluginName || !pluginCategory || !pluginUrl || !pluginCreator) {
                  setPluginError("All fields are required.");
                  return;
                }
                setPluginSubmitting(true);
                try {
                  const plugins = getPlugins();
                  const newPlugin = {
                    id: Date.now(),
                    name: pluginName,
                    category: pluginCategory,
                    redirect_url: pluginUrl,
                    banner_url: pluginBanner,
                    made_by: pluginCreator,
                    created_date: new Date().toISOString(),
                  };
                  plugins.unshift(newPlugin);
                  savePlugins(plugins);
                  // Do NOT collect email for plugins, only for consent popup
                  setShowAddPlugin(false);
                  setPluginName("");
                  setPluginCategory("web");
                  setPluginUrl("");
                  setPluginBanner("");
                  setPluginCreator("");
                  setPluginError("");
                } catch (err) {
                  setPluginError("Failed to add plugin. Try again.");
                } finally {
                  setPluginSubmitting(false);
                  setSubmissions(getSubmissions()); // Refresh dashboard
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-semibold">Plugin Name *</label>
                  <Input value={pluginName} onChange={e => setPluginName(e.target.value)} placeholder="Plugin or Website Name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-semibold">Category *</label>
                  <select value={pluginCategory} onChange={e => setPluginCategory(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                    <option value="web">Web</option>
                    <option value="apk">APK</option>
                    <option value="plugin">Plugin</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-semibold">Redirect URL *</label>
                  <Input value={pluginUrl} onChange={e => setPluginUrl(e.target.value)} placeholder="https://yourwebsite.com" required type="url" />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-semibold">Banner Image (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = function(ev) {
                          setPluginBanner(ev.target.result);
                          setBannerPreview(ev.target.result);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setPluginBanner("");
                        setBannerPreview("");
                      }
                    }}
                    style={{ background: '#181028', color: '#fff', border: '1px solid #6B21A8', borderRadius: '0.5rem', padding: '0.5rem 1rem' }}
                    className="w-full"
                  />
                  {bannerPreview && (
                    <img src={bannerPreview} alt="Banner Preview" className="mt-2 rounded-lg max-h-32" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white font-semibold">Created by <span className="text-purple-400">@username</span> *</label>
                <Input
                  value={pluginCreator}
                  onChange={e => setPluginCreator(e.target.value)}
                  placeholder="@yourusername"
                  required
                />
              </div>
              {pluginError && <div className="text-red-400 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" />{pluginError}</div>}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddPlugin(false)} className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
                <Button type="submit" className="gradient-bg text-white btn-glow" disabled={pluginSubmitting}>{pluginSubmitting ? "Adding..." : "Add Plugin"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
