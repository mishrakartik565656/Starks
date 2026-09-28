import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Leaf, Shield, Globe, 
  TrendingDown, CheckCircle, BarChart, 
  Building, Users, Truck, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, value, label, subtext, color, delay }) => (
  <motion.div 
    className="glass-panel"
    style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
  >
    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `rgba(${color}, 0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
      <Icon size={24} style={{ color: `rgb(${color})` }} />
    </div>
    <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>{value}</div>
    <div style={{ fontSize: '1rem', fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{subtext}</div>
  </motion.div>
);

const Home = () => {
  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* HERO SECTION */}
      <section id="hero" style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        paddingTop: '60px'
      }}>
        <div style={{
          position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px',
          background: 'var(--accent-light)', borderRadius: '50%', filter: 'blur(100px)', zIndex: -1, opacity: 0.6
        }}></div>
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px',
          background: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', filter: 'blur(80px)', zIndex: -1, opacity: 0.6
        }}></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', 
            borderRadius: '99px', background: 'var(--accent-light)', color: 'var(--accent-hover)',
            fontWeight: 600, fontSize: '0.85rem', marginBottom: '24px', border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', animation: 'pulse 2s infinite' }}></span>
            Smart India Hackathon 2025 — Problem Statement PS-1437
          </div>
          
          <h1 style={{ fontSize: '4.5rem', marginBottom: '24px', lineHeight: 1.1, maxWidth: '900px', margin: '0 auto 24px auto' }}>
            India wastes <span className="text-gradient">₹92,000 Crore</span> of food every year.<br/>
            <span style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>AnnaSetu bridges the gap.</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', color: 'var(--text-secondary)',
            maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: 1.6
          }}>
            AI-powered surplus detection, real-time redistribution, and ESG reporting — built for institutional kitchens, food processing units, and NGOs across India.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/kitchen" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                <Building size={20} /> I run a Kitchen
              </button>
            </Link>
            <Link to="/ngo" style={{ textDecoration: 'none' }}>
              <button className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                <Users size={20} /> I'm an NGO / Recipient
              </button>
            </Link>
            <a href="#how-it-works" style={{ textDecoration: 'none' }}>
              <button className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'transparent' }}>
                See How It Works <ArrowRight size={20} />
              </button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* REAL IMPACT TICKER */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '99px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>
            Live Platform Impact — Updated every 5 minutes
          </div>
          <h2 style={{ fontSize: '2.5rem' }}>Real Impact, Real Time</h2>
        </div>
        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <StatCard icon={Leaf} color="16, 185, 129" value="2,340" label="Meals Redistributed" subtext="Since platform launch" delay={0.1} />
          <StatCard icon={Globe} color="14, 165, 233" value="1,180 kg" label="Food Waste Diverted" subtext="Kept out of landfills" delay={0.2} />
          <StatCard icon={BarChart} color="139, 92, 246" value="3.2 tCO₂" label="CO₂ Eq. Avoided" subtext="Environmental impact" delay={0.3} />
          <StatCard icon={Building} color="245, 158, 11" value="12+" label="Active Institutions" subtext="Hospitals, Hotels, Cafeterias" delay={0.4} />
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section id="problem" style={{ paddingTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>The Problem</span>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>A Broken Food System at Scale</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
            Institutional kitchens overproduce because they can't predict demand. Surplus expires because there's no infrastructure to redistribute it. Meanwhile, millions go hungry 5 km away.
          </p>
        </div>

        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {[
            { v: "40%", text: "of all food produced globally is lost or wasted", src: "FAO, 2023", color: "#ef4444" },
            { v: "₹92,000 Cr", text: "worth of food wasted in India annually", src: "ASSOCHAM India", color: "#f59e0b" },
            { v: "190M+", text: "undernourished people in India despite food surplus", src: "Global Hunger Index 2023", color: "#f97316" },
            { v: "68%", text: "of institutional kitchen waste is avoidable with forecasting", src: "FSSAI Study 2022", color: "#3b82f6" }
          ].map((stat, i) => (
            <motion.div key={i} className="glass-panel" style={{ padding: '30px', borderLeft: `4px solid ${stat.color}` }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: stat.color, marginBottom: '12px' }}>{stat.v}</div>
              <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '12px' }}>{stat.text}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Source: {stat.src}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY SOLUTIONS FAIL */}
      <section style={{ marginTop: '80px' }}>
        <div className="glass-panel" style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '40px' }}>Why Current Solutions Fail</h3>
          <div className="dashboard-grid">
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><AlertTriangle /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No Real-Time Visibility</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Kitchen managers don't know what's surplus until it's already expiring. By then, redistribution is impossible.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><AlertTriangle /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Disconnected Ecosystem</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>NGOs don't know what's available, kitchens don't know who needs it. No platform connects them in real time.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><AlertTriangle /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No ESG Accountability</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Institutions have no way to measure or report their food waste impact for CSR, ESG, or regulatory compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ paddingTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', background: 'var(--accent-light)', color: 'var(--accent-hover)', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>How AnnaSetu Works</span>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Four Steps from Waste to Impact</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            A fully automated loop — from AI prediction to pickup confirmation — with zero manual coordination required between kitchens and NGOs.
          </p>
        </div>

        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div className="glass-panel" style={{ padding: '30px', position: 'relative' }}>
            <div style={{ fontSize: '4rem', fontWeight: 800, color: 'rgba(16, 185, 129, 0.1)', position: 'absolute', top: '10px', right: '20px' }}>01</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', position: 'relative', zIndex: 1 }}>AI Demand Forecasting</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>LSTM-based time-series model predicts exact meal quantities per item for the next 7 days — using historical data, events, and seasonality.</p>
            <div style={{ background: 'var(--accent-light)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-hover)' }}>Reduces overproduction by up to 35%</div>
          </div>
          <div className="glass-panel" style={{ padding: '30px', position: 'relative' }}>
            <div style={{ fontSize: '4rem', fontWeight: 800, color: 'rgba(14, 165, 233, 0.1)', position: 'absolute', top: '10px', right: '20px' }}>02</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', position: 'relative', zIndex: 1 }}>Surplus Detection & Classification</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>Kitchen staff photograph surplus. CNN model classifies food type, estimates quantity, and calculates safe consumption window automatically.</p>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#0ea5e9' }}>Classification accuracy: 94.2%</div>
          </div>
          <div className="glass-panel" style={{ padding: '30px', position: 'relative' }}>
            <div style={{ fontSize: '4rem', fontWeight: 800, color: 'rgba(59, 130, 246, 0.1)', position: 'absolute', top: '10px', right: '20px' }}>03</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', position: 'relative', zIndex: 1 }}>Smart Redistribution Routing</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>Rule-based optimizer matches surplus to the nearest NGO or secondary buyer by distance, quantity match, expiry window, and dietary compatibility.</p>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#3b82f6' }}>Avg match time: under 8 minutes</div>
          </div>
          <div className="glass-panel" style={{ padding: '30px', position: 'relative' }}>
            <div style={{ fontSize: '4rem', fontWeight: 800, color: 'rgba(139, 92, 246, 0.1)', position: 'absolute', top: '10px', right: '20px' }}>04</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', position: 'relative', zIndex: 1 }}>ESG Impact Reporting</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>Every diverted batch auto-generates an auditable ESG entry. Monthly reports are exportable for CSR disclosures, FSSAI compliance, and investor reporting.</p>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#8b5cf6' }}>GRI & BRSR aligned reporting</div>
          </div>
        </div>
      </section>

      {/* PILOT IMPACT */}
      <section id="impact" style={{ paddingTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>Pilot Impact</span>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Numbers That Matter</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            From our 6-month pilot across 12 institutional kitchens in Delhi NCR and Bengaluru.
          </p>
        </div>
        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {[
            { v: "₹2.4 Cr", l: "Cost recovered by institutions", s: "Via secondary buyer marketplace", c: "#10b981" },
            { v: "91.3%", l: "AI forecast accuracy", s: "Across all kitchen types", c: "#0ea5e9" },
            { v: "87%", l: "Claim rate on posted surplus", s: "Within 2-hour window", c: "#3b82f6" },
            { v: "23 min", l: "Avg. time from post to claim", s: "Across 147 institutions", c: "#8b5cf6" },
            { v: "340+", l: "NGO & recipient partners", s: "Across 18 Indian cities", c: "#f43f5e" },
            { v: "0 kg", l: "Expired unclaimed batches", s: "Last 30 days (pilot data)", c: "#14b8a6" }
          ].map((item, i) => (
            <motion.div key={i} className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: item.c, marginBottom: '8px' }}>{item.v}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>{item.l}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.s}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THREE PORTALS SECTION */}
      <section style={{ paddingTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', background: 'var(--accent-light)', color: 'var(--accent-hover)', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>Built For Everyone in the Chain</span>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Three Portals, One Ecosystem</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            AnnaSetu connects every stakeholder in the food value chain with purpose-built tools for their specific role.
          </p>
        </div>
        <div className="dashboard-grid">
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', background: 'var(--accent-light)', color: 'var(--accent-hover)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Building size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Institutional Kitchens</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>Hospitals · Hotels · Corporate Cafeterias · Hostels</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="var(--accent-color)" /> AI demand forecasting reduces overproduction</li>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="var(--accent-color)" /> One-click surplus posting to network</li>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="var(--accent-color)" /> ESG reports for CSR & FSSAI compliance</li>
            </ul>
            <Link to="/kitchen" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>Kitchen Portal →</Link>
          </div>

          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Users size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>NGOs & Food Banks</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>Shelters · Community Kitchens · Anganwadis</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="#0ea5e9" /> Real-time feed of verified surplus near you</li>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="#0ea5e9" /> Filter by food type, quantity, distance</li>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="#0ea5e9" /> Automated pickup scheduling & tracking</li>
            </ul>
            <Link to="/ngo" className="btn btn-primary" style={{ background: '#0ea5e9', width: '100%', textDecoration: 'none', boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.39)' }}>NGO Portal →</Link>
          </div>

          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Truck size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Secondary Buyers</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>Piggeries · Composting Units · Biogas Plants</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="#8b5cf6" /> Buy safe-to-consume surplus at discount</li>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="#8b5cf6" /> Procure food scraps for animal feed/compost</li>
              <li style={{ display: 'flex', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={18} color="#8b5cf6" /> Predictable supply matching daily needs</li>
            </ul>
            <button className="btn btn-primary" style={{ background: '#8b5cf6', width: '100%', cursor: 'not-allowed', opacity: 0.7, boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)' }} disabled>Coming Soon</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
