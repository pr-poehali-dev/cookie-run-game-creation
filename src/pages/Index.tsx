import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Character {
  id: number;
  name: string;
  health: number;
  attack: number;
  level: number;
  emoji: string;
  unlocked: boolean;
  price: number;
}

interface Player {
  id: number;
  name: string;
  score: number;
  rank: number;
}

const Index = () => {
  const [coins, setCoins] = useState(1000);
  const [characters, setCharacters] = useState<Character[]>([
    { id: 1, name: 'Gingerbrave', health: 60, attack: 52, level: 2000, emoji: '🍪', unlocked: true, price: 0 },
    { id: 2, name: 'Strawberry Cookie', health: 55, attack: 48, level: 1800, emoji: '🍓', unlocked: true, price: 0 },
    { id: 3, name: 'Wizard Cookie', health: 50, attack: 65, level: 2200, emoji: '🧙', unlocked: false, price: 500 },
    { id: 4, name: 'Ninja Cookie', health: 58, attack: 70, level: 2500, emoji: '🥷', unlocked: false, price: 800 },
    { id: 5, name: 'Knight Cookie', health: 75, attack: 55, level: 2100, emoji: '⚔️', unlocked: false, price: 600 },
    { id: 6, name: 'Angel Cookie', health: 52, attack: 60, level: 1900, emoji: '👼', unlocked: false, price: 700 },
  ]);

  const [leaderboard] = useState<Player[]>([
    { id: 1, name: 'SuperRunner', score: 15420, rank: 1 },
    { id: 2, name: 'CookieMaster', score: 14890, rank: 2 },
    { id: 3, name: 'SweetPlayer', score: 13750, rank: 3 },
    { id: 4, name: 'Вы', score: 12300, rank: 4 },
    { id: 5, name: 'FastCookie', score: 11980, rank: 5 },
  ]);

  const unlockCharacter = (characterId: number) => {
    const character = characters.find(c => c.id === characterId);
    if (character && !character.unlocked && coins >= character.price) {
      setCoins(coins - character.price);
      setCharacters(characters.map(c => 
        c.id === characterId ? { ...c, unlocked: true } : c
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cookie-cream via-cookie-peach to-cookie-pink">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-6xl font-black text-cookie-brown mb-4" style={{
            textShadow: '4px 4px 0px #FFB74D, 8px 8px 0px #FF6B9D'
          }}>
            COOKIE RUN
          </h1>
          <p className="text-2xl text-cookie-brown font-bold">GAME</p>
          
          <div className="flex items-center justify-center gap-2 mt-6 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 inline-flex">
            <span className="text-3xl">🪙</span>
            <span className="text-2xl font-bold text-cookie-brown">{coins}</span>
          </div>
        </div>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm p-2 rounded-full">
            <TabsTrigger value="home" className="rounded-full data-[state=active]:bg-cookie-pink data-[state=active]:text-white">
              <Icon name="Home" className="w-5 h-5 mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="characters" className="rounded-full data-[state=active]:bg-cookie-orange data-[state=active]:text-white">
              <Icon name="Users" className="w-5 h-5 mr-2" />
              Персонажи
            </TabsTrigger>
            <TabsTrigger value="shop" className="rounded-full data-[state=active]:bg-cookie-purple data-[state=active]:text-white">
              <Icon name="ShoppingBag" className="w-5 h-5 mr-2" />
              Магазин
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="rounded-full data-[state=active]:bg-cookie-brown data-[state=active]:text-white">
              <Icon name="Trophy" className="w-5 h-5 mr-2" />
              Рейтинг
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="animate-slide-up">
            <Card className="bg-white/90 backdrop-blur-sm border-4 border-cookie-orange rounded-3xl p-8 text-center">
              <div className="mb-6">
                <div className="text-9xl mb-4 animate-bounce-slow inline-block">🍪</div>
                <h2 className="text-4xl font-black text-cookie-brown mb-4">Добро пожаловать!</h2>
                <p className="text-xl text-cookie-brown/80 mb-6">
                  Соревнуйтесь с игроками со всего мира в захватывающих гонках!
                </p>
              </div>
              
              <Button 
                className="bg-cookie-pink hover:bg-cookie-purple text-white text-2xl font-bold py-6 px-12 rounded-full transform hover:scale-105 transition-all"
                size="lg"
              >
                <Icon name="Play" className="w-6 h-6 mr-2" />
                Начать игру
              </Button>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: '⚡', label: 'Скорость', value: '95' },
                  { icon: '🎯', label: 'Точность', value: '88' },
                  { icon: '🏆', label: 'Побед', value: '42' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-white to-cookie-cream rounded-2xl p-4 border-2 border-cookie-orange">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-cookie-brown">{stat.value}</div>
                    <div className="text-sm text-cookie-brown/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="characters" className="animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <Card 
                  key={character.id}
                  className={`bg-white/90 backdrop-blur-sm border-4 rounded-3xl p-6 transform hover:scale-105 transition-all ${
                    character.unlocked ? 'border-cookie-orange' : 'border-gray-300 opacity-60'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="text-7xl mb-3 animate-bounce-slow inline-block">{character.emoji}</div>
                    <h3 className="text-2xl font-bold text-cookie-brown mb-2">{character.name}</h3>
                    {character.unlocked ? (
                      <Badge className="bg-cookie-pink text-white">Разблокирован</Badge>
                    ) : (
                      <Badge variant="outline" className="border-cookie-brown text-cookie-brown">Заблокирован</Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-cookie-brown">
                        <span className="text-xl">❤️</span> Здоровье
                      </span>
                      <span className="font-bold text-cookie-brown">{character.health}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-cookie-brown">
                        <span className="text-xl">⚔️</span> Атака
                      </span>
                      <span className="font-bold text-cookie-brown">{character.attack}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-cookie-brown">
                        <span className="text-xl">⭐</span> Уровень
                      </span>
                      <span className="font-bold text-cookie-brown">{character.level}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shop" className="animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.filter(c => !c.unlocked).map((character) => (
                <Card 
                  key={character.id}
                  className="bg-white/90 backdrop-blur-sm border-4 border-cookie-purple rounded-3xl p-6 transform hover:scale-105 transition-all"
                >
                  <div className="text-center mb-4">
                    <div className="text-7xl mb-3 animate-pulse-slow inline-block">{character.emoji}</div>
                    <h3 className="text-2xl font-bold text-cookie-brown mb-2">{character.name}</h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-cookie-brown">
                        <span className="text-xl">❤️</span> Здоровье
                      </span>
                      <span className="font-bold text-cookie-brown">{character.health}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-cookie-brown">
                        <span className="text-xl">⚔️</span> Атака
                      </span>
                      <span className="font-bold text-cookie-brown">{character.attack}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-cookie-brown">
                        <span className="text-xl">⭐</span> Уровень
                      </span>
                      <span className="font-bold text-cookie-brown">{character.level}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => unlockCharacter(character.id)}
                    disabled={coins < character.price}
                    className="w-full bg-cookie-orange hover:bg-cookie-pink text-white font-bold py-3 rounded-full transform hover:scale-105 transition-all disabled:opacity-50"
                  >
                    <span className="text-xl mr-2">🪙</span>
                    Разблокировать ({character.price})
                  </Button>
                </Card>
              ))}
              
              {characters.filter(c => !c.unlocked).length === 0 && (
                <Card className="col-span-full bg-white/90 backdrop-blur-sm border-4 border-cookie-orange rounded-3xl p-12 text-center">
                  <div className="text-7xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-cookie-brown mb-2">Все разблокировано!</h3>
                  <p className="text-xl text-cookie-brown/70">Вы собрали всех персонажей</p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="animate-slide-up">
            <Card className="bg-white/90 backdrop-blur-sm border-4 border-cookie-brown rounded-3xl p-8">
              <h2 className="text-3xl font-black text-cookie-brown mb-6 text-center">
                <Icon name="Trophy" className="w-8 h-8 inline-block mr-2 text-cookie-orange" />
                Таблица лидеров
              </h2>

              <div className="space-y-4">
                {leaderboard.map((player) => (
                  <div 
                    key={player.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transform hover:scale-105 transition-all ${
                      player.name === 'Вы' 
                        ? 'bg-gradient-to-r from-cookie-orange to-cookie-pink border-cookie-purple' 
                        : 'bg-white border-cookie-cream'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl font-black ${
                        player.rank === 1 ? 'text-yellow-500' :
                        player.rank === 2 ? 'text-gray-400' :
                        player.rank === 3 ? 'text-orange-600' :
                        'text-cookie-brown'
                      }`}>
                        {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `#${player.rank}`}
                      </div>
                      <div>
                        <div className={`text-xl font-bold ${
                          player.name === 'Вы' ? 'text-white' : 'text-cookie-brown'
                        }`}>
                          {player.name}
                        </div>
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${
                      player.name === 'Вы' ? 'text-white' : 'text-cookie-brown'
                    }`}>
                      {player.score.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button 
                  className="bg-cookie-pink hover:bg-cookie-purple text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all"
                >
                  <Icon name="Zap" className="w-5 h-5 mr-2" />
                  Обновить рейтинг
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
