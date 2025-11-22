import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, Shield, Lock } from "lucide-react";

function LegalSection({ title, children }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}

export default function Legal() {
  const [activeSection, setActiveSection] = useState("tos");
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg rounded-2xl mb-4"><FileText className="w-8 h-8 text-white" /></div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Legal Information</h1>
          <p className="text-lg text-gray-400">Terms of Service, Terms & Conditions, and Privacy Policy</p>
        </div>
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="glass-card glow-card rounded-2xl p-4 sticky top-24 space-y-2">
              <Button variant={activeSection === "tos" ? "default" : "ghost"} className={`w-full justify-start ${activeSection === "tos" ? "gradient-bg text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`} onClick={() => scrollToSection("tos")}> <Shield className="w-4 h-4 mr-2" />Terms of Service</Button>
              <Button variant={activeSection === "toc" ? "default" : "ghost"} className={`w-full justify-start ${activeSection === "toc" ? "gradient-bg text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`} onClick={() => scrollToSection("toc")}> <FileText className="w-4 h-4 mr-2" />Terms & Conditions</Button>
              <Button variant={activeSection === "privacy" ? "default" : "ghost"} className={`w-full justify-start ${activeSection === "privacy" ? "gradient-bg text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`} onClick={() => scrollToSection("privacy")}> <Lock className="w-4 h-4 mr-2" />Privacy Policy</Button>
            </div>
          </div>
          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Terms of Service */}
            <Card id="tos" className="glass-card glow-card border-white/10 scroll-mt-24">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center"><Shield className="w-6 h-6 text-white" /></div><h2 className="text-3xl font-bold text-white">Terms of Service</h2></div>
                <LegalSection title="1. Agreement to Terms">By using Kyle's Hub you agree to these Terms of Service. If you do not agree, do not use the site.</LegalSection>
                <LegalSection title="2. Service Description">Kyle's Hub is an informational and demo platform combining creator content and white-hat cybersecurity resources.</LegalSection>
                <LegalSection title="3. Use of Service">Users must not use the site to upload or distribute malware, illegal content, or violate third-party rights.</LegalSection>
                <LegalSection title="4. User Content">User-submitted content (form entries, plugin metadata) may be stored and displayed in the Dashboard. The site may use anonymized data for analytics.</LegalSection>
                <LegalSection title="5. Account & Data">The demo Sign Up collects usernames, email, phone, DOB (if provided), IP address and timestamp. No real authentication is required.</LegalSection>
                <LegalSection title="6. Termination">Kyle's Hub reserves the right to suspend or remove content or users that violate policies.</LegalSection>
                <LegalSection title="7. Liability Disclaimer">Kyle's Hub provides content "as is". The site disclaims warranties to the maximum allowed by law.</LegalSection>
                <LegalSection title="8. Changes to Terms">Terms can be updated; continued use after changes implies acceptance.</LegalSection>
                <LegalSection title="9. Contact">For questions: <a href="mailto:nexai.official26@gmail.com" className="text-purple-400 hover:text-purple-300">nexai.official26@gmail.com</a></LegalSection>
              </CardContent>
            </Card>
            {/* Terms & Conditions */}
            <Card id="toc" className="glass-card glow-card border-white/10 scroll-mt-24">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center"><FileText className="w-6 h-6 text-white" /></div><h2 className="text-3xl font-bold text-white">Terms & Conditions</h2></div>
                <LegalSection title="1. Definitions">
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>"Service"</strong>: Kyle's Hub platform and all its features</li>
                    <li><strong>"User"</strong>: Any individual accessing or using the Service</li>
                    <li><strong>"Content"</strong>: All data, text, images, and materials submitted</li>
                    <li><strong>"Dashboard"</strong>: Admin interface for data management</li>
                  </ul>
                </LegalSection>
                <LegalSection title="2. Access & Restrictions">Access is allowed for lawful, non-malicious activities only. White-hat testing only; no unauthorized attacks.</LegalSection>
                <LegalSection title="3. Content Ownership">Users retain ownership of content they submit but grant Kyle's Hub a license to host, display, and process it.</LegalSection>
                <LegalSection title="4. Plugin Policy">Plugins listed must not be malware. Kyle's Hub does not host executable plugin binaries — only metadata and links.</LegalSection>
                <LegalSection title="5. Modification & Suspension">The site can modify features and remove content for safety reasons.</LegalSection>
                <LegalSection title="6. Governing Law & Dispute">These Terms are governed by applicable law. Any disputes will be resolved through appropriate legal channels. Users should review local jurisdiction requirements.</LegalSection>
                <LegalSection title="7. Contact + Reporting">Security problems should be reported to: <a href="mailto:nexai.official26@gmail.com" className="text-purple-400 hover:text-purple-300">nexai.official26@gmail.com</a></LegalSection>
              </CardContent>
            </Card>
            {/* Privacy Policy */}
            <Card id="privacy" className="glass-card glow-card border-white/10 scroll-mt-24">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center"><Lock className="w-6 h-6 text-white" /></div><h2 className="text-3xl font-bold text-white">Privacy Policy</h2></div>
                <p className="text-gray-300 text-lg">This Privacy Policy explains what data we collect, why, and how it's used.</p>
                <LegalSection title="1. Data Collected">
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Account/form data:</strong> username, email, phone, DOB (if provided), form timestamp</li>
                    <li><strong>Technical data:</strong> IP address, user agent, and basic analytics (page views)</li>
                    <li><strong>Contact messages:</strong> if user uses contact form</li>
                  </ul>
                </LegalSection>
                <LegalSection title="2. Purpose of Collection">To demo features, contact users, improve service, security monitoring, and analytics.</LegalSection>
                <LegalSection title="3. Legal Basis & Consent">Users must explicitly consent to data collection via the form checkbox. Consent is the legal basis for storing personal data.</LegalSection>
                <LegalSection title="4. Data Sharing & Third Parties">We do not sell personal data. Data may be shared with third-party hosting or email providers for delivery and storage (list providers if applicable).</LegalSection>
                <LegalSection title="5. Data Retention">Data retained for a defined period (e.g., 2 years) unless user requests deletion sooner.</LegalSection>
                <LegalSection title="6. User Rights">Users can request deletion, access or correction via: <a href="mailto:nexai.official26@gmail.com" className="text-purple-400 hover:text-purple-300">nexai.official26@gmail.com</a></LegalSection>
                <LegalSection title="7. Security">Reasonable measures taken to protect data. No absolute guarantee — advise users accordingly.</LegalSection>
                <LegalSection title="8. Children">Not intended for children under 13. If data of minors is found, it will be deleted.</LegalSection>
                <LegalSection title="9. Changes">Policy updates will be posted; continued use equals acceptance.</LegalSection>
                <LegalSection title="10. Contact">For privacy questions: <a href="mailto:nexai.official26@gmail.com" className="text-purple-400 hover:text-purple-300">nexai.official26@gmail.com</a></LegalSection>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
