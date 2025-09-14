import React from 'react';
import { Card } from '@/components/ui/card';

interface VirtualAvatarProps {
  mood: 'calm' | 'anxious' | 'sad' | 'happy' | 'stressed' | 'hopeful';
  name?: string;
}

const VirtualAvatar: React.FC<VirtualAvatarProps> = ({ mood, name = "Your Companion" }) => {
  const getMoodStyle = (mood: string) => {
    const styles = {
      calm: 'from-secondary-light to-secondary bg-gradient-to-br',
      anxious: 'from-warning to-orange-400 bg-gradient-to-br',
      sad: 'from-blue-400 to-blue-600 bg-gradient-to-br',
      happy: 'from-yellow-300 to-yellow-500 bg-gradient-to-br',
      stressed: 'from-destructive to-red-600 bg-gradient-to-br',
      hopeful: 'from-primary-glow to-primary bg-gradient-to-br'
    };
    return styles[mood as keyof typeof styles] || styles.calm;
  };

  const getMoodExpression = (mood: string) => {
    const expressions = {
      calm: '😌',
      anxious: '😰',
      sad: '😢',
      happy: '😊',
      stressed: '😫',
      hopeful: '🌅'
    };
    return expressions[mood as keyof typeof expressions] || '😌';
  };

  return (
    <Card className="p-6 bg-gradient-warm shadow-raised border-muted">
      <div className="text-center">
        <div className="mb-4">
          <div 
            className={`w-24 h-24 mx-auto rounded-full ${getMoodStyle(mood)} shadow-deep flex items-center justify-center text-4xl transition-all duration-500 hover:scale-105`}
          >
            {getMoodExpression(mood)}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground capitalize">Feeling {mood}</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-6 rounded-full transition-all duration-300 ${
                    level <= (mood === 'happy' ? 5 : mood === 'hopeful' ? 4 : mood === 'calm' ? 3 : mood === 'sad' ? 2 : mood === 'anxious' ? 2 : 1)
                      ? 'bg-primary shadow-soft'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Wellness Level</p>
        </div>
      </div>
    </Card>
  );
};

export default VirtualAvatar;