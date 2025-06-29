import { Link, useNavigate } from 'react-router-dom'
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
  Zap,
  Heart,
  Award
} from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-blue-500" />,
      title: "Zoom-Optimized",
      description: "Perfect for screen sharing during live classes. Teacher controls everything while students watch and learn."
    },
    {
      icon: <Gamepad2 className="h-8 w-8 text-orange-500" />,
      title: "Interactive Games",
      description: "Engaging matching and spelling games that make phonics fun and memorable for young learners."
    },
    {
      icon: <Volume2 className="h-8 w-8 text-green-500" />,
      title: "Audio-Rich Learning",
      description: "IPA-based pronunciation, phonics songs, and clear audio feedback for every sound and word."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-500" />,
      title: "Progressive Structure",
      description: "Carefully sequenced sound groups that build upon each other for systematic phonics instruction."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Zap className="h-4 w-4 mr-1" />
            Perfect for Zoom Classes
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Interactive Phonics Made
            <span className="block bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Simple for Teachers
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Engage young learners with progressive phonics games designed for teacher-led instruction. 
            Perfect for screen sharing during live Zoom classes with zero student device requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-lg px-8 py-3"
              onClick={() => navigate('/login')}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Teaching Today
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => navigate('/demo')}
            >
              <Monitor className="h-5 w-5 mr-2" />
              View Demo Dashboard
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Free forever plan available • No credit card required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for Modern Teachers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature designed with live online instruction in mind
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Phonics Teaching?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teachers who are making phonics fun and effective with Ladder Lessons
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-3"
              onClick={() => navigate('/signup')}
            >
              <Users className="h-5 w-5 mr-2" />
              Start Your Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
              onClick={() => navigate('/demo')}
            >
              <Monitor className="h-5 w-5 mr-2" />
              View Demo Dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
