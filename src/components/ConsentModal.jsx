
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertCircle, Shield, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl, getSubmissions, saveSubmissions } from "../utils";

export default function ConsentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("kyleshub_consent");
    if (!hasConsented) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  const getIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return "Unknown";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!emailConfirmed) {
      setError("Please confirm your email by clicking the checkmark");
      return;
    }
    if (!acceptTerms) {
      setError("You must accept the Terms & Conditions and Privacy Policy");
      return;
    }
    setIsSubmitting(true);
    try {
      const ipAddress = await getIPAddress();
      const submissions = getSubmissions();
      submissions.unshift({
        username: "Visitor",
        email,
        phone: "N/A",
        ip_address: ipAddress,
        accept_terms: acceptTerms,
        consent_data_ip: acceptTerms,
        reviewed: false,
        created_date: new Date().toISOString(),
        consent: true,
      });
      saveSubmissions(submissions);
      localStorage.setItem("kyleshub_consent", "true");
      localStorage.setItem("kyleshub_user_email", email);
      setIsOpen(false);
    } catch (error) {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-card border-white/10 text-white max-w-md" onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">Welcome to Kyle's Hub</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <p className="text-gray-300 text-center text-sm">To continue, please provide your email and accept our terms.</p>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="flex items-center gap-2">
              <Input id="email" type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailConfirmed(false); }} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" placeholder="your@email.com" required />
              <button
                type="button"
                className={`rounded-full p-2 border-2 ${emailConfirmed ? 'border-green-500 bg-green-500/20' : 'border-white/20 bg-white/10'} text-white flex items-center justify-center`}
                title="Confirm Email"
                onClick={() => {
                  if (email && /.+@.+\..+/.test(email)) setEmailConfirmed(true);
                }}
              >
                {emailConfirmed ? <CheckCircle className="w-5 h-5 text-green-400" /> : <CheckCircle className="w-5 h-5 text-white/40" />}
              </button>
            </div>
            {!emailConfirmed && email && (
              <span className="text-xs text-yellow-400">Click the checkmark to confirm your email</span>
            )}
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
            <input id="terms" type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} className="mt-1 w-5 h-5 rounded border border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500" />
            <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
              I accept the {" "}
              <Link to={createPageUrl("Legal")} className="text-purple-400 hover:text-purple-300 underline" onClick={() => setIsOpen(false)}>Terms & Conditions</Link>
              {" "}and{" "}
              <Link to={createPageUrl("Legal")} className="text-purple-400 hover:text-purple-300 underline" onClick={() => setIsOpen(false)}>Privacy Policy</Link>.
              I consent to the collection of my email address and IP address for security and analytics purposes.
            </label>
          </div>
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full gradient-bg text-white hover:opacity-90 btn-glow rounded-full py-6 text-lg font-semibold">
              {isSubmitting ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />Processing...</>) : ("Continue to Kyle's Hub")}
            </Button>
          </DialogFooter>
        </form>
        <p className="text-xs text-gray-500 text-center">Your data is secure and will only be used as described in our Privacy Policy.</p>
      </DialogContent>
    </Dialog>
  );
}
