import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Map from '../components/Map';
import { MapPin, Clock } from 'lucide-react';

const NGOPortal = () => {
  const [surplusList, setSurplusList] = useState([]);
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [surplusRes, ngosRes] = await Promise.all([
        fetch('http://localhost:5000/api/surplus'),
        fetch('http://localhost:5000/api/ngos')
      ]);
      
      if (surplusRes.ok) setSurplusList(await surplusRes.json());
      if (ngosRes.ok) setNgos(await ngosRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleClaim = async (item) => {
    try {
      const res = await fetch(`http://localhost:5000/api/surplus/${item.id}/claim`, {
        method: 'PUT'
      });
      if (res.ok) {
        // Refresh the list instantly to remove the claimed item
        fetchData();
        alert('Surplus claimed successfully! Opening Google Maps for pickup routing.');
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`, '_blank');
      } else {
        alert('Failed to claim. It may have already been claimed.');
      }
    } catch (error) {
      console.error('Claim error:', error);
      alert('Error claiming surplus.');
    }
  };

  const markers = [
    ...surplusList.map(s => ({
      lat: s.lat,
      lng: s.lng,
      type: 'surplus',
      title: s.kitchenName,
      description: `${s.quantity}kg of ${s.foodType}`
    })),
    ...ngos.map(n => ({
      lat: n.lat,
      lng: n.lng,
      type: 'ngo',
      title: n.name,
      description: `Needs: ${n.needs}`
    }))
  ];

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>NGO & Recipient Portal</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Live view of available surplus food and NGO locations.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4ade80' }}></div>
            Available Surplus
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#60a5fa' }}></div>
            NGOs
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', minHeight: '600px' }}>
        <motion.div 
          className="glass-panel map-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ height: '100%' }}
        >
          <Map markers={markers} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingRight: '8px' }}
        >
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Live Matches</h3>
          
          {surplusList.length === 0 ? (
            <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No active surplus available right now.
            </div>
          ) : (
            surplusList.map((item, index) => (
              <div key={item.id} className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-color)' }}>
                      Available Now
                    </span>
                    <h4 style={{ fontSize: '1.1rem', marginTop: '4px' }}>{item.kitchenName}</h4>
                  </div>
                </div>
                
                <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                  <p style={{ fontWeight: 600 }}>{item.foodType}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-color)', marginBottom: item.photoUrl ? '12px' : '0' }}>{item.quantity} kg</p>
                  {item.photoUrl && (
                    <img 
                      src={item.photoUrl} 
                      alt="Food" 
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  )}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} /> Lat: {item.lat.toFixed(4)}, Lng: {item.lng.toFixed(4)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} /> Posted: {new Date(item.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => handleClaim(item)}
                >
                  Claim & Schedule Pickup
                </button>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NGOPortal;
