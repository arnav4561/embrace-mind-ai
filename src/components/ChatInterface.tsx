import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button-enhanced';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, AlertCircle, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: 'supportive' | 'crisis' | 'educational' | 'encouraging';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI mental wellness companion. I'm here to listen, support, and help you on your journey to better mental health. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      mood: 'supportive'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'can\'t go on'];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const detectCrisis = (text: string) => {
    return crisisKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const generateAIResponse = (userMessage: string): Message => {
    const isCrisis = detectCrisis(userMessage);
    
    if (isCrisis) {
      toast({
        title: "Crisis Support Available",
        description: "We detected you might be in distress. Professional help is available.",
        variant: "destructive",
      });
      
      return {
        id: Date.now().toString(),
        text: "I'm really concerned about you right now. Your feelings are valid, and you don't have to go through this alone. Please consider reaching out to a mental health professional or crisis hotline immediately. In the US, you can call 988 for the Suicide & Crisis Lifeline. Would you like me to guide you through some grounding exercises while you seek professional help?",
        sender: 'ai',
        timestamp: new Date(),
        mood: 'crisis'
      };
    }

    // Simple response generation based on keywords
    const responses = {
      anxious: "I understand that anxiety can feel overwhelming. Let's try a breathing exercise together. Take a deep breath in for 4 counts, hold for 4, and exhale for 6. Remember, this feeling will pass.",
      sad: "It's okay to feel sad sometimes. Your emotions are valid. Would you like to talk about what's making you feel this way, or would you prefer some gentle coping strategies?",
      stressed: "Stress can really weigh us down. Let's break this down together. What's the most pressing thing on your mind right now? Sometimes talking through it helps.",
      default: "Thank you for sharing that with me. I'm here to listen and support you. How would you like to explore this feeling or situation further?"
    };

    const message = userMessage.toLowerCase();
    let responseText = responses.default;
    let mood: 'supportive' | 'crisis' | 'educational' | 'encouraging' = 'supportive';

    if (message.includes('anxious') || message.includes('worried') || message.includes('panic')) {
      responseText = responses.anxious;
      mood = 'educational';
    } else if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      responseText = responses.sad;
      mood = 'supportive';
    } else if (message.includes('stress') || message.includes('overwhelm') || message.includes('pressure')) {
      responseText = responses.stressed;
      mood = 'educational';
    } else if (message.includes('better') || message.includes('good') || message.includes('happy')) {
      responseText = "I'm so glad to hear that! It's wonderful when we have moments of feeling better. What's contributing to this positive feeling?";
      mood = 'encouraging';
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'ai',
      timestamp: new Date(),
      mood
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMoodColor = (mood?: string) => {
    const colors = {
      supportive: 'border-l-secondary',
      crisis: 'border-l-destructive',
      educational: 'border-l-primary',
      encouraging: 'border-l-warning'
    };
    return colors[mood as keyof typeof colors] || 'border-l-muted';
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="p-4 bg-gradient-warm shadow-raised border-muted mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" />
          AI Companion Chat
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Confidential • Culturally Sensitive • Crisis-Aware
        </p>
      </Card>

      <Card className="flex-1 flex flex-col bg-card shadow-inset border-border">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg shadow-soft border-l-4 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground border-l-primary-glow'
                      : `bg-card text-card-foreground ${getMoodColor(message.mood)}`
                  }`}
                >
                  {message.sender === 'ai' && message.mood === 'crisis' && (
                    <div className="flex items-center gap-2 mb-2 text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Crisis Support</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card text-card-foreground p-4 rounded-lg shadow-soft border-l-4 border-l-muted">
                  <div className="flex items-center gap-1">
                    <div className="animate-bounce">●</div>
                    <div className="animate-bounce delay-100">●</div>
                    <div className="animate-bounce delay-200">●</div>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-gradient-warm">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts and feelings..."
              className="flex-1 bg-background shadow-inset border-border focus:shadow-raised"
              disabled={isTyping}
            />
            <Button
              variant="healing"
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="sage"
              size="icon"
              onClick={() => toast({ title: "Voice input coming soon!" })}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This AI provides support but is not a replacement for professional mental health care
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;