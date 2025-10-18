import { Card, Modal, TextInput, Label, Button, Spinner, Alert, ModalHeader, ModalBody, HelperText } from "flowbite-react";
import { Edit, LogOut, Snowflake, X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { getToken, removeToken } from "../utils/auth";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://saraha-app-theta.vercel.app";

interface ErrorResponse {
  message: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
  isFrozen?: boolean;
}

interface EditFormData {
  email: string;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<EditFormData>({ email: '' });
  const [formErrors, setFormErrors] = useState({ email: '' });
  const token = getToken();

  const handleLogout = () => {
    setIsProcessing(true);
    try {
      removeToken();
      toast.success('logout successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('error during logout');
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchUserData = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(data.user);
      setEditForm({ email: data.user.email || '' });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching user data:", error);

      if (axiosError.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        handleLogout();
      } else {
        const errorData = axiosError.response?.data as ErrorResponse;
        toast.error(errorData?.message || "Failed to load profile data");
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  const validateForm = (): boolean => {
    const errors = { email: '' };
    let isValid = true;

    if (!editForm.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Profile",
          text: "Check out my profile!",
          url: `${API_BASE_URL}/users/profile/${userData?._id}`,
        });
        console.log("Profile shared successfully!");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(`${API_BASE_URL}/users/profile/${userData?._id}`);
      toast.success("Profile link copied to clipboard!");
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      await axios.patch(`${API_BASE_URL}/users/profile`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setUserData(prev => prev ? { ...prev, email: editForm.email } : null);
      setShowEditModal(false);
      toast.success('Email updated successfully!');
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error('Failed to update email. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFreezeAccount = async () => {
    if (!userData?._id) return;
    const action = userData.isFrozen ? 'unfreeze' : 'freeze';
    const confirmAction = window.confirm(`Are you sure you want to ${action} your account?`);
    if (!confirmAction) return;

    setIsProcessing(true);
    try {
      await axios.delete(`${API_BASE_URL}/users/${action}/${userData._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(prev => prev ? { ...prev, isFrozen: !prev.isFrozen } : null);
      toast.success(`Your account has been ${action === 'freeze' ? 'frozen' : 'unfrozen'} successfully.`);
      if (action === 'freeze') setShowEditModal(false);
    } catch (error) {
      console.error('Error freezing account:', error);
      alert('Failed to freeze account. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Spinner size="xl" color="pink" />
        <p className="mt-4 text-gray-600">Loading user data...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Alert color="failure" className="max-w-md">
          <div className="flex flex-col items-center text-center">
            <span className="font-medium">Error loading user data</span>
            <p className="text-sm mt-2">Failed to load user data. Please try again later.</p>
            <Button color="pink" className="mt-4" onClick={fetchUserData} disabled={loading}>
              {loading ? 'retrying...' : 'retry'}
            </Button>
          </div>
        </Alert>
      </div>

    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center py-12 px-4">
      {/* Edit Email Modal */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="md" className="[&>div]:rounded-xl">
        <ModalHeader className="border-b border-gray-100">
          <div className="flex justify-between items-center w-full px-6 py-4">
            <h3 className="text-xl font-bold text-gray-800">Update Email</h3>
            <button 
              onClick={() => setShowEditModal(false)} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
        </ModalHeader>
        <ModalBody className="p-6">
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={editForm.email}
                onChange={handleInputChange}
                color={formErrors.email ? 'failure' : 'gray'}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                placeholder="Enter your new email"
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button 
                color="light" 
                onClick={() => setShowEditModal(false)} 
                disabled={isProcessing}
                className="px-5 py-2.5 text-sm font-medium"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                color="pink" 
                disabled={isProcessing}
                className="px-5 py-2.5 text-sm font-medium"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" />
                    <span>Saving...</span>
                  </div>
                ) : 'Save Changes'}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="mt-2 text-gray-500">Manage your account settings and preferences</p>
        </div>

        <Card className="overflow-hidden border-0 shadow-xl">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-pink-500 to-purple-600"></div>
            <div className="px-6 pb-8">
              <div className="flex flex-col items-center -mt-16">
                <div className="relative group">
                  <img
                    src={userData.image }
                    alt={userData.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Edit className="text-white" size={20} />
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                  <p className="text-pink-600 font-medium">{userData.email}</p>
                  <div className="mt-2 text-sm text-gray-500 flex items-center justify-center">
                    <span>Member since {formatDate(userData.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      {userData.isFrozen ? (
                        <span className="flex items-center text-amber-600">
                          <Snowflake size={14} className="mr-1" /> Frozen
                        </span>
                      ) : (
                        <span className="flex items-center text-green-600">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                          Active
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="w-full mt-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      disabled={userData.isFrozen || isProcessing}
                      onClick={() => setShowEditModal(true)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        userData.isFrozen 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-pink-200'
                      }`}
                    >
                      <Edit size={16} />
                      {userData.isFrozen ? 'Account Frozen' : 'Edit Profile'}
                    </button>

                    <button
                      onClick={handleFreezeAccount}
                      disabled={isProcessing}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        userData.isFrozen
                          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-200'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <Snowflake size={16} />
                      {isProcessing ? 'Processing...' : userData.isFrozen ? 'Unfreeze Account' : 'Freeze Account'}
                    </button>
                  </div>

                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-pink-200 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share-2">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    Share Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-100 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-xl text-sm font-medium shadow-sm hover:shadow transition-all"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
