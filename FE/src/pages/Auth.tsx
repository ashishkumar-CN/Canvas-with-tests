import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Logged in successfully!" });
      }
    } else {
      const { error } = await signUp(formData.fullName, formData.email, formData.password);
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Account created!" });
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-background">
        <div className="w-full max-w-md p-8 rounded-xl border border-border bg-card shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-tighter">
              <span className="text-primary">yf</span> decor
            </h1>
          </div>

          <div className="flex border-b border-border mb-6">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 font-semibold ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}>LOGIN</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 font-semibold ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}>REGISTER</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <Label>Full Name</Label>
                <div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input name="fullName" placeholder="John Doe" className="pl-10" onChange={(e) => setFormData({...formData, fullName: e.target.value})} required/></div>
              </div>
            )}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input type="email" placeholder="email@example.com" className="pl-10" onChange={(e) => setFormData({...formData, email: e.target.value})} required/></div>
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10" onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3"><Eye className="h-4 w-4 text-muted-foreground"/></button>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>{loading ? "Working..." : isLogin ? "SIGN IN" : "CREATE ACCOUNT"}</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;