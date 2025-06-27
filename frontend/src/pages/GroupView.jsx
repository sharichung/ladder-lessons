import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Play, Volume2, Gamepad2, Spellcheck } from 'lucide-react'
import { getGroupById, playAudio } from '../data/phonicsData'

const GroupView = () => {
  const { groupId } = useParams()
  const group = getGroupById(groupId)

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Group Not Found</h1>
          <p className="text-gray-600 mb-6">The phonics group you're looking for doesn't exist.</p>
          <Link to="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handlePlayAudio = (audioUrl) => {
    playAudio(audioUrl)
    // In a real implementation, this would play the actual audio file
    // For demo purposes, we'll show a visual feedback
    console.log(`Playing: ${audioUrl}`)
  }

  const handlePlaySong = (song) => {
    console.log(`Playing song: ${song.title}`)
    // In a real implementation, this would play the video/song
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{group.title}</h1>
              <p className="text-xl text-gray-600">{group.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Ready for Zoom screen sharing</div>
              <div className="text-lg font-semibold text-green-600">Teacher-Led Mode</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Phonics Songs */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="h-5 w-5 mr-2 text-blue-500" />
                Phonics Songs
              </CardTitle>
              <CardDescription>
                Interactive songs for each letter sound
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.letters.map((letter) => {
                const song = group.songs[letter]
                return (
                  <div key={letter} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-lg">{song.title}</h3>
                      <p className="text-sm text-gray-600">{song.lyrics}</p>
                    </div>
                    <Button 
                      onClick={() => handlePlaySong(song)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Sound Pronunciation */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Volume2 className="h-5 w-5 mr-2 text-green-500" />
                Sound Pronunciation
              </CardTitle>
              <CardDescription>
                IPA-based audio for each phoneme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {group.letters.map((letter) => {
                  const sound = group.sounds[letter]
                  return (
                    <div key={letter} className="text-center">
                      <Button
                        onClick={() => handlePlayAudio(sound.audioUrl)}
                        className="w-20 h-20 text-2xl font-bold rounded-xl mb-2 bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white shadow-lg"
                      >
                        {letter.toUpperCase()}
                      </Button>
                      <div className="text-sm text-gray-600">{sound.ipa}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Games */}
        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gamepad2 className="h-5 w-5 mr-2 text-purple-500" />
              Interactive Games
            </CardTitle>
            <CardDescription>
              Teacher-led games perfect for Zoom screen sharing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matching Game */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 p-2 rounded-lg mr-3">
                    <Gamepad2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Matching Game</h3>
                    <p className="text-gray-600">Connect letters with images</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Click-to-connect gameplay perfect for teacher demonstration. 
                  Students watch as you match letters to their corresponding images.
                </p>
                <Link to={`/group/${groupId}/matching`}>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Start Matching Game
                  </Button>
                </Link>
              </div>

              {/* Spelling Practice */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500 p-2 rounded-lg mr-3">
                    <Spellcheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Spelling Practice</h3>
                    <p className="text-gray-600">Build words with letter tiles</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Interactive word building with visual feedback. 
                  Perfect for demonstrating spelling patterns and word construction.
                </p>
                <Link to={`/group/${groupId}/spelling`}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Start Spelling Game
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teaching Tips */}
        <Card className="shadow-lg mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Teaching Tips for Zoom Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Before You Start</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Share your screen in Zoom</li>
                  <li>• Ensure audio is enabled for sound effects</li>
                  <li>• Test your microphone for clear instruction</li>
                  <li>• Have students mute themselves initially</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">During Games</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Narrate your actions as you play</li>
                  <li>• Ask students to call out answers</li>
                  <li>• Use the chat for student responses</li>
                  <li>• Repeat sounds clearly for pronunciation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GroupView

