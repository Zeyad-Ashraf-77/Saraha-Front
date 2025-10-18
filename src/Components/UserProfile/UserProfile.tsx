import { Card, Modal, TextInput, Label, Button, Spinner, Alert, ModalHeader, ModalBody, HelperText } from "flowbite-react";
import { Edit, LogOut, Snowflake, X, User, Lock, Mail, Calendar } from "lucide-react";
import axios, { AxiosError } from "axios";
import { getToken, removeToken } from "../utils/auth";
import { useState, useEffect, useRef, useCallback } from "react";

interface ErrorResponse {
  message: string;
  // Add other error response fields if needed
}
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

// Base URL for API requests
const API_BASE_URL = "https://saraha-app-theta.vercel.app";

interface UserData {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt: string;
  isFrozen?: boolean;
}

interface EditFormData {
  name: string;
  email: string;
}




export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<EditFormData>({ name: '', email: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '' });
  const token = getToken();

  // Enhanced logout with loading state
  const handleLogout = () => {
    setIsProcessing(true);
    try {
      removeToken();
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    } finally {
      setIsProcessing(false);
    }
  };

  // Enhanced fetch user data with better error handling
  const fetchUserData = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(data.user);
      setEditForm({
        name: data.user.name || '',
        email: data.user.email || ''
      });
      
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
    const errors = { name: '', email: '' };
    let isValid = true;

    if (!editForm.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    try {
      await axios.patch(
        'https://saraha-app-theta.vercel.app/users/profile',
        editForm,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setUserData(prev => prev ? { ...prev, ...editForm } : null);
      setShowEditModal(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Loading state with better UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Spinner size="xl" color="pink" />
        <p className="mt-4 text-gray-600">Loading user data...</p>
      </div>
    );
  }

  // Error state with retry button
  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Alert color="failure" className="max-w-md">
          <div className="flex flex-col items-center text-center">
            <span className="font-medium">Error loading user data</span>
            <p className="text-sm mt-2">Failed to load user data. Please try again later.</p>
            <Button 
              color="pink" 
              className="mt-4"
              onClick={fetchUserData}
              disabled={loading}
            >
              {loading ? ' جاري   المحاولة...' : 'إعادة المحاولة'}
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  const handleFreezeAccount = async () => {
    if (!userData?._id) return;
    
    const action = userData.isFrozen ? 'unfreeze' : 'freeze';
    const confirmAction = window.confirm(
      `Are you sure you want to ${action} your account?`
    );
    if (!confirmAction) return;

    setIsProcessing(true);
    try {
      // Use the same endpoint for both freeze and unfreeze
      await axios.delete(
        `https://saraha-app-theta.vercel.app/users/${action}/${userData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Toggle the frozen status
      setUserData(prev => prev ? { 
        ...prev, 
        isFrozen: !prev.isFrozen 
      } : null);
      
      toast.success(`Your account has been ${action === 'freeze' ? 'frozen' : 'unfrozen'} successfully.`);
      
      // If account is frozen, close the edit modal
      if (action === 'freeze') {
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error freezing account:', error);
      alert('Failed to freeze account. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50">
        <div id="toast-container"></div>
      </div>
      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="md">
        <ModalHeader className="border-b-0 pb-0">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-semibold">تعديل الملف الشخصي</h3>
            <button 
              onClick={() => setShowEditModal(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="إغلاق"
            >
              <X size={24} />
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput
                id="name"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                color={formErrors.name ? 'failure' : 'gray'}
              />
              {formErrors.name && (
                <HelperText color="failure">
                  {formErrors.name}
                </HelperText>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={editForm.email}
                onChange={handleInputChange}
                color={formErrors.email ? 'failure' : 'gray'}
              />
              {formErrors.email && (
                <HelperText color="failure">
                  {formErrors.email}
                </HelperText>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                color="gray" 
                onClick={() => setShowEditModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                color="pink"
                disabled={isProcessing}
                className="flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Spinner size="sm" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-lg">
        {userData.name}'s Profile
      </h1>

      <Card className="max-w-md w-full p-6 bg-white shadow-xl">
        <div className="flex flex-col items-center">
          <img
            src={userData.profileImage || "https://i.pravatar.cc/150"}
            alt={userData.name}
            className="w-28 h-28 rounded-full mb-4 shadow-md object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150';
            }}
          />
          <h2 className="text-2xl font-semibold">{userData.name}</h2>
          <p className="text-gray-500 text-sm mb-2">{userData.email}</p>
          <p className="text-gray-600 text-sm mb-4">
            Joined: {formatDate(userData.createdAt)}
          </p>

          <div className="flex flex-col gap-3 mt-4 w-full">
            <div className="flex gap-3">
              <button 
                type="button"
                disabled={userData.isFrozen || isProcessing}
                onClick={() => setShowEditModal(true)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow ${
                  userData.isFrozen 
                    ? 'bg-gray-200 cursor-not-allowed' 
                    : 'bg-pink-600 hover:bg-pink-700 text-white'
                }`}
              >
                <Edit size={18} /> 
                {userData.isFrozen ? 'Account Frozen' : 'Edit Profile'}
              </button>
              <button 
                onClick={handleFreezeAccount}
                disabled={isProcessing}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow ${
                  userData.isFrozen 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                <Snowflake size={18} /> 
                {isProcessing 
                  ? 'Processing...' 
                  : userData.isFrozen 
                    ? 'Unfreeze Account' 
                    : 'Freeze Account'}
              </button>
            </div>
            {userData.isFrozen && (
              <div className="mt-2 text-center text-sm text-red-500">
                Your account is currently frozen. Please unfreeze to make changes.
              </div>
            )}
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 mt-6 rounded-lg shadow hover:bg-red-600 transition-colors"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </Card>
    </div>
  );
}
