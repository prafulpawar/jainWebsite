import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, User, ArrowLeft } from 'lucide-react';
import api from '@/utils/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ userName: '', userPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/login', formData);
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', res.data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron/5 via-background to-gold/5 px-4 py-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-saffron/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card */}
      {/* Changes made here: w-full md:w-1/2 max-w-lg */}
      <Card className="w-full md:w-1/2 max-w-lg shadow-2xl border-gold/20 relative z-10 backdrop-blur-sm bg-card/95">

        {/* Header with Logo */}
        <CardHeader className="bg-gradient-to-r from-secondary via-secondary to-maroon text-secondary-foreground rounded-t-lg pb-8 pt-6">
          <div className="flex flex-col items-center gap-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-lg">
              <span className="text-3xl font-serif font-bold text-primary-foreground">॥</span>
            </div>

            {/* Title */}
            <div className="text-center">
              <CardTitle className="text-2xl font-serif mb-1">Admin Portal</CardTitle>
              <p className="text-secondary-foreground/80 text-sm font-light">Jain Society of Toronto</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          {/* Welcome Message */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-foreground mb-1">Welcome Back</h3>
            <p className="text-sm text-muted-foreground">Please sign in to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm text-center animate-fade-in">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Username
              </label>
              <div className="flex items-center border border-gold/30 rounded h-11 focus-within:ring-1 focus-within:ring-gold focus-within:border-gold">
                {/* Icon on the left */}
                <User className="ml-3 h-5 w-12 text-muted-foreground" />

                {/* Input takes remaining space */}
                <Input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  // Change: text-right hataya, text-left lagaya, pr-3 ko pl-2 kiya
                  className="flex-1 text-left pl-2 h-full border-none focus:ring-0 placeholder:text-muted-foreground"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>


            <div className="space-y-2 pb-4">
              <label className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="flex items-center border border-gold/30 rounded h-11 focus-within:ring-1 focus-within:ring-gold focus-within:border-gold">
                {/* Icon on the left */}
                <Lock className="ml-3 h-5 w-12 text-muted-foreground" />

                {/* Input takes full remaining width */}
                <Input
                  type="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  // Change: text-right hataya, text-left lagaya, pr-3 ko pl-2 kiya
                  className="flex-1 text-left pl-2 h-full border-none focus:ring-0 placeholder:text-muted-foreground"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 pt-6 bg-gradient-to-r from-secondary to-maroon hover:from-secondary/90 hover:to-maroon/90 text-secondary-foreground font-medium shadow-lg transition-all duration-300 hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold/20"></div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex pt-2 items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </div>
        </CardContent>

        {/* Footer Decoration */}
        <div className="h-1 bg-gradient-to-r from-saffron via-gold to-maroon rounded-b-lg"></div>
      </Card>

      {/* Bottom Text */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Jain Society of Toronto. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;