import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';

const Profile: React.FC = () => {
  const { profile, loading, updateProfile } = useProfile();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  if (loading) {
    return <div>Loading profile...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await updateProfile({
      username,
      full_name: fullName
    });

    if (!error) {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {profile?.email}</p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={profile?.username || 'Set username'}
          />
        </div>
        
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={profile?.full_name || 'Set full name'}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;