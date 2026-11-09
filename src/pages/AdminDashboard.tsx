import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { AstraLogo } from '../components/common/AstraLogo';
import { OverviewModule } from '../components/admin/OverviewModule';
import { ProfileModule } from '../components/admin/ProfileModule';
import { HeroModule } from '../components/admin/HeroModule';
import { ProjectsModule } from '../components/admin/ProjectsModule';
import { ServicesModule } from '../components/admin/ServicesModule';
import { SkillsModule } from '../components/admin/SkillsModule';
import { TestimonialsModule } from '../components/admin/TestimonialsModule';
import { EnquiriesModule } from '../components/admin/EnquiriesModule';
import { SettingsModule } from '../components/admin/SettingsModule';
import {
  LayoutDashboard,
  User,
  Sparkles,
  FolderGit2,
  Layers,
  Code,
  Star,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { token, user, isAuthenticated, logout } = useAuth();
  const { refetch: refetchPublic } = usePortfolio();

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalServices: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    readEnquiries: 0,
    completedEnquiries: 0,
    totalTestimonials: 0,
  });

  const [profile, setProfile] = useState<any>(null);
  const [hero, setHero] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication Guard
  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, token, navigate]);

  // Fetch all collections
  const loadDashboardData = async () => {
    if (!token) return;
    setIsLoading(true);

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [
        statsRes,
        profRes,
        heroRes,
        projRes,
        servRes,
        skillRes,
        testRes,
        enqRes,
        setRes,
      ] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/profile', { headers }),
        fetch('/api/admin/hero', { headers }),
        fetch('/api/admin/projects', { headers }),
        fetch('/api/admin/services', { headers }),
        fetch('/api/admin/skills', { headers }),
        fetch('/api/admin/testimonials', { headers }),
        fetch('/api/admin/enquiries', { headers }),
        fetch('/api/admin/settings', { headers }),
      ]);

      if (statsRes.ok) setStats((await statsRes.json()).stats);
      if (profRes.ok) setProfile((await profRes.json()).profile);
      if (heroRes.ok) setHero((await heroRes.json()).hero);
      if (projRes.ok) setProjects((await projRes.json()).projects);
      if (servRes.ok) setServices((await servRes.json()).services);
      if (skillRes.ok) setSkills((await skillRes.json()).skills);
      if (testRes.ok) setTestimonials((await testRes.json()).testimonials);
      if (enqRes.ok) setEnquiries((await enqRes.json()).enquiries);
      if (setRes.ok) setSettings((await setRes.json()).settings);

      // Sync public state as well
      refetchPublic();
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile Management', icon: User },
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'projects', label: 'Projects Showcase', icon: FolderGit2, badge: stats.totalProjects },
    { id: 'services', label: 'Services & Solutions', icon: Layers, badge: stats.totalServices },
    { id: 'skills', label: 'Skills & Stack', icon: Code },
    { id: 'testimonials', label: 'Client Testimonials', icon: Star, badge: stats.totalTestimonials },
    { id: 'enquiries', label: 'Contact Enquiries', icon: Inbox, badge: stats.newEnquiries, badgeColor: 'bg-emerald-500 text-space-950 font-bold' },
    { id: 'settings', label: 'Website Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-space-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-space-900/90 border-b border-white/10 backdrop-blur-xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-space-850 text-slate-300 hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <AstraLogo size="sm" showSubtitle={false} />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-electric-cyan/15 border border-electric-cyan/30 text-[10px] font-mono uppercase tracking-wider text-electric-cyan">
              Admin Console
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Refresh */}
          <button
            onClick={loadDashboardData}
            className="p-2 rounded-xl bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="Refresh Database Cache"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-electric-cyan' : ''}`} />
            <span className="hidden md:inline">Sync Data</span>
          </button>

          {/* View Live Public Site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-space-850 hover:bg-space-800 border border-white/10 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5 text-electric-cyan" />
          </a>

          {/* Admin Info & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-xs font-bold text-white leading-tight">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {user?.email}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 transition-colors"
              title="Logout from ASTRA Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar & Content Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 bg-space-900/60 border-r border-white/10 p-4 space-y-1.5 shrink-0">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            Modules &amp; Settings
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30 shadow-[0_0_12px_rgba(0,245,255,0.15)]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      item.badgeColor || 'bg-space-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-space-950/80 backdrop-blur-md"
            />
            <div className="relative w-72 bg-space-900 border-r border-white/10 p-5 space-y-2 flex flex-col justify-between z-10">
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-electric-cyan font-bold">
                    ASTRA Modules
                  </span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-space-800 text-slate-300 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-space-950">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'overview' && (
              <OverviewModule stats={stats} onNavigateTab={setActiveTab} />
            )}

            {activeTab === 'profile' && profile && token && (
              <ProfileModule
                profile={profile}
                token={token}
                onUpdateSuccess={(p) => {
                  setProfile(p);
                  refetchPublic();
                }}
              />
            )}

            {activeTab === 'hero' && hero && token && (
              <HeroModule
                hero={hero}
                token={token}
                onUpdateSuccess={(h) => {
                  setHero(h);
                  refetchPublic();
                }}
              />
            )}

            {activeTab === 'projects' && token && (
              <ProjectsModule
                projects={projects}
                token={token}
                onRefresh={loadDashboardData}
              />
            )}

            {activeTab === 'services' && token && (
              <ServicesModule
                services={services}
                token={token}
                onRefresh={loadDashboardData}
              />
            )}

            {activeTab === 'skills' && token && (
              <SkillsModule
                skills={skills}
                token={token}
                onRefresh={loadDashboardData}
              />
            )}

            {activeTab === 'testimonials' && token && (
              <TestimonialsModule
                testimonials={testimonials}
                token={token}
                onRefresh={loadDashboardData}
              />
            )}

            {activeTab === 'enquiries' && token && (
              <EnquiriesModule
                enquiries={enquiries}
                token={token}
                onRefresh={loadDashboardData}
              />
            )}

            {activeTab === 'settings' && settings && token && (
              <SettingsModule
                settings={settings}
                token={token}
                onUpdateSuccess={(s) => {
                  setSettings(s);
                  refetchPublic();
                }}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

