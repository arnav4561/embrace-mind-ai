import React, { useState } from 'react';
import { Button } from '@/components/ui/button-enhanced';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Brain, 
  Heart, 
  Shield, 
  Users, 
  BookOpen, 
  Target, 
  Activity,
  Send,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onStartChat: () => void;
  onNavigate: (tab: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, onNavigate }) => {
  const [message, setMessage] = useState('');

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Personalized emotional awareness and reflection'
    },
    {
      icon: Heart,
      title: 'Wellness Tracking',
      description: 'Mood tracking and goal setting with habit formation'
    },
    {
      icon: BookOpen,
      title: 'Smart Journaling',
      description: 'AI-powered journaling with insight generation'
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Safe community connections with AI moderation'
    },
    {
      icon: Target,
      title: 'CBT Techniques',
      description: 'Real-time cognitive behavioral therapy tools'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Anonymous usage with complete confidentiality'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      onStartChat();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-serene">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">MindHeal AI</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your compassionate AI companion for mental wellness and emotional growth
          </p>
        </div>

        {/* Central Chat Bar */}
        <Card className="max-w-4xl mx-auto mb-16 p-8 bg-card/50 backdrop-blur-sm shadow-raised border-border/50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Start Your Wellness Journey</h2>
            <p className="text-muted-foreground">Share what's on your mind and let our AI guide you</p>
          </div>
          
          <div className="flex gap-3 max-w-2xl mx-auto">
            <Input
              placeholder="How are you feeling today? What's on your mind?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 bg-background/80 border-border/50 text-foreground placeholder:text-muted-foreground"
            />
            <Button 
              onClick={handleSendMessage}
              variant="healing"
              size="lg"
              className="h-12 px-6"
            >
              <Send className="w-5 h-5 mr-2" />
              Chat
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setMessage("I'm feeling anxious today")}>
              I'm feeling anxious
            </Button>
            <Button variant="outline" size="sm" onClick={() => setMessage("I need help with stress")}>
              Help with stress
            </Button>
            <Button variant="outline" size="sm" onClick={() => setMessage("I want to track my mood")}>
              Track my mood
            </Button>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 bg-card/80 shadow-soft border-border/50 hover:shadow-raised transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Access */}
        <Card className="max-w-4xl mx-auto p-8 bg-card/50 backdrop-blur-sm shadow-raised border-border/50">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="healing" 
              className="h-16 flex-col gap-2"
              onClick={() => onNavigate('journal')}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-sm">Journal</span>
            </Button>
            <Button 
              variant="sage" 
              className="h-16 flex-col gap-2"
              onClick={() => onNavigate('mood')}
            >
              <Activity className="w-5 h-5" />
              <span className="text-sm">Mood Tracker</span>
            </Button>
            <Button 
              variant="warm" 
              className="h-16 flex-col gap-2"
              onClick={() => onNavigate('goals')}
            >
              <Target className="w-5 h-5" />
              <span className="text-sm">Goals</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col gap-2 text-muted-foreground border-muted"
              onClick={() => onNavigate('crisis')}
            >
              <Shield className="w-5 h-5" />
              <span className="text-sm">Support</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;