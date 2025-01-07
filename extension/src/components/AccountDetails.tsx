import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Heart, User, Mail, LogOut } from 'lucide-react';

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

export function AccountDetails() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'profiles', user.uid));
        const userData = userDoc.data();
        if (userData) {
          const profileData = {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: user.email || ''
          };
          setProfile(profileData);
          setEditedProfile(profileData);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, 'profiles', user.uid), {
          firstName: editedProfile.firstName,
          lastName: editedProfile.lastName
        });
        setProfile(editedProfile);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = 'https://joinkindly.org/signin';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="bg-white">
      {/* Extension Header */}
      <div className="bg-rose-500 rounded-t-lg border border-gray-200 shadow-xl">
        <div className="flex items-center px-4 py-3 space-x-2">
          <Heart className="text-white" style={{ width: '18px', height: '18px' }} />
          <div className="text-base text-white font-medium">Kindly</div>
          <div className="flex-1"></div>
          <div className="text-white">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Account Content */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-lg shadow-xl">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-500">Account Details</h4>
        </div>

        <div className="p-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={editedProfile.firstName}
                  onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={editedProfile.lastName}
                  onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editedProfile.email}
                  disabled
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditedProfile(profile);
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-gray-700">Name</div>
                  <div className="text-sm text-gray-500">
                    {profile.firstName} {profile.lastName}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-rose-500 hover:text-rose-600"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div>
                  <div className="text-sm font-medium text-gray-700">Email</div>
                  <div className="text-sm text-gray-500">{profile.email}</div>
                </div>
                <Mail className="w-4 h-4 text-gray-400" />
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
