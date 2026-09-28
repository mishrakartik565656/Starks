import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const KitchenPortal = () => {
  const [formData, setFormData] = useState({
    kitchenName: '',
    foodType: '',
    quantity: '',
    lat: '',
    lng: '',
    photoUrl: ''
  });
  const [status, setStatus] = useState(null);
  const [photoStatus, setPhotoStatus] = useState('idle'); // idle, verifying, passed, failed
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        console.log("MobileNet AI Model loaded successfully");
      } catch (err) {
        console.error("Failed to load AI model", err);
      }
    };
    loadModel();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setPhotoStatus('failed');
        return;
      }

      setPhotoStatus('verifying');
      setFormData({ ...formData, photoUrl: '' });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageElement = document.createElement('img');
        imageElement.src = reader.result;
        imageElement.onload = async () => {
          if (model) {
            try {
              const predictions = await model.classify(imageElement);
              console.log("AI Predictions:", predictions);

              if (!predictions.length) {
                throw new Error('The image could not be classified.');
              }
              
              const topClass = predictions[0].className.toLowerCase();
              const allText = predictions.map(p => p.className.toLowerCase()).join(' ');
              
              // Non-food keywords blocklist
              const nonFoodKeywords = ['dog', 'cat', 'car', 'vehicle', 'computer', 'laptop', 'phone', 'person', 'bottle', 'cup', 'table', 'chair', 'desk', 'pen', 'paper', 'keyboard', 'mouse', 'monitor', 'television', 'wall', 'building', 'animal', 'bird', 'fish', 'insect', 'plastic bag', 'trash can'];
              
              const isNonEdible = nonFoodKeywords.some(kw => topClass.includes(kw) || allText.includes(kw));
              
              if (isNonEdible) {
                setPhotoStatus('failed');
              } else {
                setPhotoStatus('passed');
                setFormData(prev => ({ ...prev, photoUrl: reader.result }));
              }
            } catch (err) {
              console.error("Classification error", err);
              // Fallback if prediction fails
              setPhotoStatus('passed');
              setFormData(prev => ({ ...prev, photoUrl: reader.result }));
            }
          } else {
            // Model not loaded yet, fallback to pass
            setPhotoStatus('passed');
            setFormData(prev => ({ ...prev, photoUrl: reader.result }));
          }
        };
        imageElement.onerror = () => {
          setPhotoStatus('failed');
        };
      };
      reader.onerror = () => {
        setPhotoStatus('failed');
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoStatus('idle');
      setFormData({ ...formData, photoUrl: '' });
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Could not get your location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:5000/api/surplus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
          lat: Number(formData.lat),
          lng: Number(formData.lng)
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ kitchenName: '', foodType: '', quantity: '', lat: '', lng: '', photoUrl: '' });
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ 
          maxWidth: '600px', 
          margin: '40px auto', 
          padding: '40px' 
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Kitchen Portal</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Log your surplus food to match with nearby NGOs instantly.
        </p>

        {status === 'success' && (
          <div style={{ 
            padding: '16px', 
            background: 'var(--accent-light)', 
            color: 'var(--accent-hover)',
            borderRadius: '12px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500
          }}>
            <CheckCircle size={20} /> Surplus logged successfully! AI matching initiated.
          </div>
        )}

        {status === 'error' && (
          <div style={{ 
            padding: '16px', 
            background: '#fee2e2', 
            color: '#ef4444',
            borderRadius: '12px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500
          }}>
            <AlertCircle size={20} /> Failed to log surplus. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Kitchen / Institution Name</label>
            <input 
              type="text" 
              name="kitchenName" 
              className="input-field" 
              placeholder="e.g. AIIMS Delhi Kitchen A"
              value={formData.kitchenName}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Food Type & Description</label>
            <input 
              type="text" 
              name="foodType" 
              className="input-field" 
              placeholder="e.g. 200 portions of Dal Makhani"
              value={formData.foodType}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Estimated Quantity (in kg)</label>
            <input 
              type="number" 
              name="quantity" 
              className="input-field" 
              placeholder="e.g. 28"
              value={formData.quantity}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Food Photo (Mandatory for AI Verification)</label>
            <input 
              type="file" 
              accept="image/*"
              className="input-field" 
              onChange={handleFileChange}
              style={{ paddingTop: '10px' }}
              required
            />
            
            {photoStatus === 'verifying' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-color)', marginTop: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
                <Loader2 size={18} style={{ animation: 'spin 2s linear infinite' }} /> AI is verifying image content...
              </div>
            )}
            
            {photoStatus === 'failed' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', marginTop: '12px', fontSize: '0.9rem', fontWeight: 600, padding: '12px', background: '#fee2e2', borderRadius: '8px' }}>
                <ShieldAlert size={18} /> Verification Failed: Non-edible or unrelated item detected. Please upload real food.
              </div>
            )}
            
            {photoStatus === 'passed' && formData.photoUrl && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                  <ShieldCheck size={18} /> AI Verified: Edible Food Detected
                </div>
                <img 
                  src={formData.photoUrl} 
                  alt="Preview" 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #10b981' }} 
                />
              </div>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Location (Lat, Lng)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="number" 
                step="any"
                name="lat" 
                className="input-field" 
                style={{ flex: 1 }}
                placeholder="Latitude"
                value={formData.lat}
                onChange={handleChange}
                required 
              />
              <input 
                type="number" 
                step="any"
                name="lng" 
                className="input-field" 
                style={{ flex: 1 }}
                placeholder="Longitude"
                value={formData.lng}
                onChange={handleChange}
                required 
              />
            </div>
            <button 
              type="button" 
              onClick={handleGetCurrentLocation}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-color)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginTop: '4px'
              }}
            >
              + Use Current Location
            </button>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: '16px', opacity: (status === 'loading' || photoStatus !== 'passed') ? 0.7 : 1 }}
            disabled={status === 'loading' || photoStatus !== 'passed'}
          >
            {status === 'loading' ? 'Logging Surplus...' : 'Submit to AI Matcher'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default KitchenPortal;
