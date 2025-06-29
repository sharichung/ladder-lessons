import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  BookOpen, 
  Users, 
  Monitor, 
  Volume2, 
  Gamepad2, 
  Star,
  Check,
  Play,
  Settings,
  Award,
  Crown,
  Zap
} from 'lucide-react'

const DemoPage = () => {
  const navigate = useNavigate()
  const [currentUser] = useState({
    name: "Demo Teacher",
    email: "demo@teacher.com",
    school: "Demo Elementary School",
    subscription: "Premium"
  })

  const phonicsGroups = [
    { id: 1, name: "Group 1: s, a, t", progress: 100, unlocked: true },
    { id: 2, name: "Group 2: i, p, n", progress: 85, unlocked: true },
    { id: 3, name: "Group 3: m, d, g", progress: 60, unlocked: true },
    { id: 4, name: "Group 4: o, c, k", progress: 30, unlocked: true },
    { id: 5, name: "Group 5: ck, e, u", progress: 0, unlocked: false },
  ]

  const recentActivities = [
    { activity: "Completed Spelling Game", group: "Group 2", time: "2 hours ago" },
    { activity: "Played Matching Game", group: "Group 3", time: "1 day ago" },
    { activity: "Unlocked new group", group: "Group 4", time: "3 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Ladder Lessons</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Crown className="h-3 w-3 mr-1" />
                {currentUser.subscription}
              </Badge>
              <span className="text-sm text-gray-700">歡迎, {currentUser.name}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                返回首頁
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            教師儀表板
          </h1>
          <p className="text-gray-600">
            管理您的語音教學課程和學生進度
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">完成的組別</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                共 5 個組別
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總進度</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">
                語音課程完成度
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">遊戲次數</CardTitle>
              <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                本週遊戲活動
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">學生參與</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                活躍學生數量
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Phonics Groups */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>語音組別進度</CardTitle>
                <CardDescription>
                  您的語音教學進度和可用的遊戲
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phonicsGroups.map((group) => (
                    <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          group.unlocked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {group.unlocked ? <BookOpen className="h-5 w-5" /> : <span className="text-sm">{group.id}</span>}
                        </div>
                        <div>
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-sm text-gray-500">進度: {group.progress}%</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {group.unlocked ? (
                          <>
                            <Button size="sm" variant="outline">
                              <Gamepad2 className="h-4 w-4 mr-1" />
                              配對遊戲
                            </Button>
                            <Button size="sm" variant="outline">
                              <Volume2 className="h-4 w-4 mr-1" />
                              拼字遊戲
                            </Button>
                          </>
                        ) : (
                          <Badge variant="secondary">已鎖定</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>最近活動</CardTitle>
                <CardDescription>
                  您最近的教學活動
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <p className="text-xs text-gray-500">{activity.group}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  開始新課程
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Monitor className="h-4 w-4 mr-2" />
                  Zoom 分享模式
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  課程設定
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Showcase */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>平台功能特色</CardTitle>
            <CardDescription>
              Ladder Lessons 為現代教師設計的完整功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Monitor className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Zoom 優化</h3>
                <p className="text-sm text-gray-600">
                  完美適配螢幕分享，教師控制一切，學生觀看學習
                </p>
              </div>
              <div className="text-center">
                <Gamepad2 className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">互動遊戲</h3>
                <p className="text-sm text-gray-600">
                  引人入勝的配對和拼字遊戲，讓語音學習變得有趣難忘
                </p>
              </div>
              <div className="text-center">
                <Volume2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">豐富音效</h3>
                <p className="text-sm text-gray-600">
                  基於 IPA 的發音、語音歌曲和清晰的音效回饋
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DemoPage
