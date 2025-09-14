import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ChatInterface from '@/components/ChatInterface';
import VirtualAvatar from '@/components/VirtualAvatar';
import LandingPage from '@/components/LandingPage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button-enhanced';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Activity,
  Brain,
  Heart,
  Users,
  Shield,
  Plus,
  Check,
  Lightbulb
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [userMood, setUserMood] = useState<'calm' | 'anxious' | 'sad' | 'happy' | 'stressed' | 'hopeful'>('calm');

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage onStartChat={() => setActiveTab('chat')} onNavigate={setActiveTab} />;
        
      case 'chat':
        return <ChatInterface />;
        
      case 'profile':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-serene shadow-raised border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Wellness Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VirtualAvatar mood={userMood} name="Your Digital Self" />
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">How are you feeling today?</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {(['calm', 'happy', 'hopeful', 'anxious', 'sad', 'stressed'] as const).map((mood) => (
                        <Button
                          key={mood}
                          variant={userMood === mood ? 'healing' : 'outline'}
                          size="sm"
                          onClick={() => setUserMood(mood)}
                          className="capitalize"
                        >
                          {mood}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Wellness Streak</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={75} className="flex-1" />
                        <span className="text-sm text-muted-foreground">18 days</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground">Goals Completed</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={60} className="flex-1" />
                        <span className="text-sm text-muted-foreground">6/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'journal':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-serene shadow-raised border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Reflective Journal</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Today's Reflection</label>
                  <Textarea 
                    placeholder="Write about your thoughts, feelings, and experiences today..."
                    className="mt-2 min-h-32 bg-card shadow-inset border-border resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Gratitude</label>
                    <Input 
                      placeholder="What are you grateful for?"
                      className="mt-1 bg-card shadow-inset border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Challenge</label>
                    <Input 
                      placeholder="What challenged you today?"
                      className="mt-1 bg-card shadow-inset border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Achievement</label>
                    <Input 
                      placeholder="What did you achieve?"
                      className="mt-1 bg-card shadow-inset border-border"
                    />
                  </div>
                </div>
                
                <Button variant="healing" size="lg" className="w-full">
                  <Plus className="w-5 h-5 mr-2" />
                  Save Entry & Get AI Insights
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/80 shadow-soft border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-3">Recent Entries</h3>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {[1, 2, 3].map((entry) => (
                    <div key={entry} className="p-3 bg-gradient-serene rounded-lg shadow-soft border border-border/50">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-foreground">Entry from March {entry + 10}</p>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Feeling more balanced today. The breathing exercises really helped...
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-serene shadow-raised border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Wellness Goals</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Daily Meditation', progress: 80, streak: 12 },
                  { title: 'Gratitude Practice', progress: 65, streak: 8 },
                  { title: 'Exercise Routine', progress: 45, streak: 3 },
                  { title: 'Sleep Schedule', progress: 90, streak: 20 }
                ].map((goal, index) => (
                  <div key={index} className="p-4 bg-card rounded-lg shadow-soft border border-muted">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-foreground">{goal.title}</h3>
                      <span className="text-sm text-muted-foreground">{goal.streak} day streak</span>
                    </div>
                    <Progress value={goal.progress} className="mb-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{goal.progress}% complete</span>
                      <Button variant="sage" size="sm">
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="healing" size="lg" className="w-full mt-4">
                <Plus className="w-5 h-5 mr-2" />
                Add New Goal
              </Button>
            </Card>
          </div>
        );

      case 'mood':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-serene shadow-raised border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Mood Tracker</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { mood: 'Great', color: 'bg-secondary-light', count: 8 },
                  { mood: 'Good', color: 'bg-primary-glow', count: 12 },
                  { mood: 'Okay', color: 'bg-warning', count: 6 },
                  { mood: 'Difficult', color: 'bg-destructive', count: 2 }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-card/80 rounded-lg shadow-soft border border-border/50">
                    <div className={`w-12 h-12 ${item.color} rounded-full mx-auto mb-2 shadow-soft`}></div>
                    <p className="font-medium text-foreground">{item.mood}</p>
                    <p className="text-sm text-muted-foreground">{item.count} days</p>
                  </div>
                ))}
              </div>
              
              <Button variant="healing" size="lg" className="w-full">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Detailed Analytics
              </Button>
            </Card>
          </div>
        );

      case 'cbt':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-serene shadow-raised border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">CBT Tools</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Thought Challenge', desc: 'Question negative thinking patterns' },
                  { title: 'Grounding Exercise', desc: '5-4-3-2-1 sensory technique' },
                  { title: 'Mood Reframing', desc: 'Transform perspective on situations' },
                  { title: 'Behavioral Activation', desc: 'Plan activities to improve mood' }
                ].map((tool, index) => (
                  <Card key={index} className="p-4 bg-card shadow-soft border-border hover:shadow-raised transition-all cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-foreground">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'crisis':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-serene shadow-raised border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Support Resources</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">Professional support is available 24/7. You're not alone in this journey.</p>
                
                <div className="space-y-3">
                  <Button variant="outline" size="lg" className="w-full justify-start text-foreground border-border/50">
                    📞 National Suicide Prevention Lifeline: 988
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start text-foreground border-border/50">
                    💬 Crisis Text Line: Text HOME to 741741
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start text-foreground border-border/50">
                    🌐 Online Chat Support Available 24/7
                  </Button>
                </div>
                
                <Card className="p-4 bg-gradient-healing shadow-soft border-border/50">
                  <h3 className="font-medium text-foreground mb-2">Immediate Grounding Exercise</h3>
                  <p className="text-sm text-muted-foreground">
                    Try the 5-4-3-2-1 technique: Name 5 things you can see, 4 things you can touch, 
                    3 things you can hear, 2 things you can smell, and 1 thing you can taste.
                  </p>
                </Card>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="p-6 bg-gradient-serene shadow-raised border-border/50">
            <h2 className="text-2xl font-bold text-foreground">Coming Soon</h2>
            <p className="text-muted-foreground">This feature is under development.</p>
          </Card>
        );
    }
  };

  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-screen max-h-screen">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="h-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;