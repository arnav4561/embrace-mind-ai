import React, { useState } from 'react';
import { Button } from '@/components/ui/button-enhanced';
import { Card } from '@/components/ui/card';
import { 
  MessageCircle, 
  User, 
  BookOpen, 
  Target, 
  Activity, 
  Heart,
  Brain,
  Users,
  Shield
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'chat', label: 'AI Chat', icon: MessageCircle, variant: 'healing' as const },
    { id: 'profile', label: 'Profile', icon: User, variant: 'warm' as const },
    { id: 'journal', label: 'Journal', icon: BookOpen, variant: 'sage' as const },
    { id: 'goals', label: 'Goals', icon: Target, variant: 'healing' as const },
    { id: 'mood', label: 'Mood Tracker', icon: Activity, variant: 'warm' as const },
    { id: 'cbt', label: 'CBT Tools', icon: Brain, variant: 'sage' as const },
    { id: 'wellness', label: 'Wellness', icon: Heart, variant: 'healing' as const },
    { id: 'community', label: 'Support', icon: Users, variant: 'warm' as const },
    { id: 'crisis', label: 'Crisis Help', icon: Shield, variant: 'crisis' as const },
  ];

  return (
    <Card className="p-4 bg-gradient-leather shadow-deep border-leather-light">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-primary-foreground mb-4 text-center">
          Mental Wellness Hub
        </h2>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? item.variant : 'ghost'}
              size="default"
              className={`w-full justify-start gap-3 text-left ${
                activeTab === item.id 
                  ? 'bg-opacity-90 shadow-inset' 
                  : 'text-primary-foreground hover:bg-leather-light'
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default Navigation;