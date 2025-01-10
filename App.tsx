import React, { useState } from 'react'
import { Factory, Car, Wrench, Palette, Settings, ChevronRight, ChevronLeft, PlayCircle, PauseCircle, Timer, Users, Gauge, Award, GripVertical, CheckCircle, XCircle } from 'lucide-react'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameItems, setGameItems] = useState([
    { id: 1, name: 'Body Frame', correct: false, position: 1 },
    { id: 2, name: 'Engine Block', correct: false, position: 2 },
    { id: 3, name: 'Interior Components', correct: false, position: 3 },
    { id: 4, name: 'Exterior Panels', correct: false, position: 4 }
  ])
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [inspectionGame, setInspectionGame] = useState({
    started: false,
    score: 0,
    attempts: 0,
    issues: [
      { id: 1, name: 'Panel Gap Alignment', found: false },
      { id: 2, name: 'Paint Finish Quality', found: false },
      { id: 3, name: 'Headlight Assembly', found: false },
      { id: 4, name: 'Door Handle Fitment', found: false },
      { id: 5, name: 'Wheel Alignment', found: false }
    ],
    timeLeft: 30
  })
  const [inspectionTimer, setInspectionTimer] = useState<number | null>(null)

  const shuffleArray = (array: typeof gameItems) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const startGame = () => {
    setGameItems(shuffleArray(gameItems.map(item => ({ ...item, correct: false }))))
    setScore(0)
    setAttempts(0)
    setGameStarted(true)
  }

  const startInspectionGame = () => {
    setInspectionGame(prev => ({
      ...prev,
      started: true,
      score: 0,
      attempts: 0,
      issues: prev.issues.map(issue => ({ ...issue, found: false })),
      timeLeft: 30
    }))
    
    if (inspectionTimer) clearInterval(inspectionTimer)
    const timer = window.setInterval(() => {
      setInspectionGame(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer)
          return { ...prev, timeLeft: 0 }
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)
    setInspectionTimer(timer)
  }

  const handleIssueClick = (id: number) => {
    setInspectionGame(prev => {
      const newIssues = prev.issues.map(issue =>
        issue.id === id ? { ...issue, found: true } : issue
      )
      const newScore = newIssues.filter(i => i.found).length
      return {
        ...prev,
        issues: newIssues,
        score: newScore,
        attempts: prev.attempts + 1
      }
    })
  }

  const checkOrder = () => {
    const newItems = gameItems.map((item, index) => ({
      ...item,
      correct: item.position === index + 1
    }))
    setGameItems(newItems)
    setAttempts(prev => prev + 1)
    const correctCount = newItems.filter(item => item.correct).length
    setScore(correctCount)
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...gameItems]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)
    setGameItems(newItems)
  }

  const manufacturingSteps = [
    {
      title: 'Body Assembly',
      duration: '8-10 hours',
      workers: '50-60',
      icon: <Car className="w-12 h-12" />,
      description: 'The foundation of every vehicle begins with the precise assembly of the body structure, combining advanced robotics with expert craftsmanship.',
      details: 'The process starts with the underbody assembly, where the floor pan, cross members, and side sills are joined. Next, the body sides, roof, and front/rear panels are robotically welded with over 5,000 precision welds. Quality control stations use ultrasonic testing to verify weld integrity. The body then moves to coordinate measuring machines that check 400+ points for dimensional accuracy to within 0.1mm.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Paint Shop',
      duration: '24-36 hours',
      workers: '30-40',
      icon: <Palette className="w-12 h-12" />,
      description: 'A sophisticated multi-stage process that provides both protection and aesthetic appeal to the vehicle body.',
      details: 'The process begins with phosphate treatment and E-coat immersion for corrosion protection. Seam sealing robots then apply precise beads of sealant to prevent water intrusion. The body receives a primer coat, followed by the basecoat color application in climate-controlled spray booths. Finally, a UV-resistant clearcoat is applied. Each layer is inspected using advanced light tunnels and digital imaging systems.',
      image: 'https://images.unsplash.com/photo-1632163674907-4b0b644dd040?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Engine Installation',
      duration: '3-4 hours',
      workers: '40-50',
      icon: <Settings className="w-12 h-12" />,
      description: 'The heart of the vehicle is installed through a precisely choreographed sequence of automated and manual operations.',
      details: 'The engine and transmission are first "married" on a sub-assembly line, where all fluid systems are connected and tested. The powertrain is then lifted by computer-controlled manipulators that can position it with millimeter precision. Technicians guide the assembly into place while automated systems secure critical mounting points. Over 40 different connections including electrical, cooling, and control systems are verified through electronic torque tools and vision systems.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Final Assembly',
      duration: '6-8 hours',
      workers: '70-80',
      icon: <Wrench className="w-12 h-12" />,
      description: 'The culmination of the manufacturing process where thousands of components come together to create the finished vehicle.',
      details: 'Assembly begins with the cockpit module installation, containing over 3,000 parts pre-assembled into a single unit. Door panels, seats, and trim are installed using ergonomic assist devices. The vehicle\'s electrical systems undergo comprehensive testing with diagnostic computers. Each car passes through a water test chamber and rolls onto a dynamometer for powertrain testing. Final quality gates include paint inspection under specialized lighting, gap and flush measurements, and a road test on a dedicated track.',
      image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const qualityCheckpoints = [
    'Dimensional accuracy verification',
    'Weld integrity testing',
    'Paint thickness measurements',
    'Electronic systems diagnostics',
    'Water leak testing',
    'Dynamic performance testing',
    'Final visual inspection'
  ];

  React.useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => 
          prev === manufacturingSteps.length - 1 ? 0 : prev + 1
        )
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [isPlaying])

  const handleNext = () => {
    setCurrentStep((prev) => 
      prev === manufacturingSteps.length - 1 ? 0 : prev + 1
    )
  }

  const handlePrev = () => {
    setCurrentStep((prev) => 
      prev === 0 ? manufacturingSteps.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <Factory className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Modern Car Manufacturing
          </h1>
        </div>
        <p className="text-center mt-4 text-gray-400 max-w-2xl mx-auto">
          Experience the precision and innovation behind modern automotive manufacturing,
          where cutting-edge technology meets masterful craftsmanship.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Timer className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold">Production Time</h3>
            </div>
            <p className="text-2xl font-bold text-gray-200">20-40 Hours</p>
            <p className="text-sm text-gray-400">Average per vehicle</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold">Workforce</h3>
            </div>
            <p className="text-2xl font-bold text-gray-200">200+ Workers</p>
            <p className="text-sm text-gray-400">Per production line</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold">Efficiency</h3>
            </div>
            <p className="text-2xl font-bold text-gray-200">1 Car / Hour</p>
            <p className="text-sm text-gray-400">Production rate</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold">Quality</h3>
            </div>
            <p className="text-2xl font-bold text-gray-200">99.9%</p>
            <p className="text-sm text-gray-400">First-time quality rate</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative h-[400px] sm:h-[500px]">
            <div className="absolute inset-0">
              {manufacturingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                    index === currentStep
                      ? 'opacity-100 translate-x-0'
                      : index < currentStep
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="relative h-[180px]">
              {manufacturingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out absolute w-full ${
                    index === currentStep
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {step.icon}
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      {step.title}
                    </h2>
                  </div>

                  <p className="text-gray-300 text-lg">
                    {step.description}
                  </p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{step.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{step.workers} workers</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {isPlaying ? (
                    <PauseCircle className="w-6 h-6" />
                  ) : (
                    <PlayCircle className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex gap-2">
                {manufacturingSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-700 transform ${
                      currentStep === index ? 'bg-blue-400' : 'bg-gray-600'
                    } ${currentStep === index ? 'scale-125' : 'scale-100'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            * Production times and workforce numbers may vary based on facility and model specifications
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Quality Control Process</h3>
            <div className="space-y-4">
              {qualityCheckpoints.map((checkpoint, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{checkpoint}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Manufacturing Facts</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">Robotics Integration</h4>
                <p className="text-gray-300">Modern car manufacturing facilities employ over 500 robots per plant, performing tasks with precision up to 0.02mm. Robotic welding alone accounts for 95% of body shop welds.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">Supply Chain</h4>
                <p className="text-gray-300">A typical car contains 30,000+ parts sourced from over 400 different suppliers across multiple countries. Just-in-time delivery systems maintain only 4 hours of inventory on the production line.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">Environmental Impact</h4>
                <p className="text-gray-300">Modern plants recycle 95% of materials used in production. Water usage per vehicle has decreased by 45% since 2000, with some facilities achieving zero-waste-to-landfill status.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <h4 className="font-semibold text-gray-200 mb-3">Testing & Validation</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• 500+ quality control checkpoints</li>
              <li>• 50km road test for random vehicles</li>
              <li>• 8-hour water leak testing</li>
              <li>• 200+ electronic system checks</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <h4 className="font-semibold text-gray-200 mb-3">Safety Systems</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• AI-powered defect detection</li>
              <li>• Real-time process monitoring</li>
              <li>• Automated emergency stops</li>
              <li>• Predictive maintenance alerts</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <h4 className="font-semibold text-gray-200 mb-3">Innovation Metrics</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• 60% reduction in assembly time since 1990</li>
              <li>• 40% improvement in energy efficiency</li>
              <li>• 75% of tasks automated</li>
              <li>• 99.9% first-time-through quality</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-8 rounded-xl">
          <h3 className="text-xl font-bold text-center text-blue-400 mb-6">Industry 4.0 Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-200 mb-2">5TB+</div>
              <p className="text-gray-400">Data generated per vehicle during production</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-200 mb-2">1,000+</div>
              <p className="text-gray-400">IoT sensors per assembly line</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-200 mb-2">85%</div>
              <p className="text-gray-400">Processes with digital twin monitoring</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-200 mb-2">24/7</div>
              <p className="text-gray-400">Real-time quality monitoring</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-xl backdrop-blur-sm p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-blue-400 mb-2">Car Assembly Challenge</h2>
              <p className="text-gray-300 text-sm">Arrange the assembly steps in the correct order</p>
            </div>

            {!gameStarted ? (
              <div className="text-center">
                <button
                  onClick={startGame}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
                >
                  Start Challenge
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 mb-4">
                {gameItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                      item.correct === true
                        ? 'bg-green-500/20'
                        : item.correct === false && attempts > 0
                        ? 'bg-red-500/20'
                        : 'bg-gray-700/50'
                    } transition-colors cursor-move backdrop-blur-sm`}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
                      moveItem(fromIndex, index)
                    }}
                  >
                    <GripVertical className="w-6 h-6 text-gray-400" />
                    <span className="flex-1 text-gray-200 text-sm">{item.name}</span>
                    {attempts > 0 && (
                      item.correct
                        ? <CheckCircle className="w-6 h-6 text-green-500" />
                        : <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={checkOrder}
                  className="bg-blue-500/90 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm backdrop-blur-sm"
                >
                  Check Order
                </button>

                {attempts > 0 && (
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-200 mb-2">
                      Score: {score} / {gameItems.length}
                    </p>
                    <p className="text-gray-400">
                      {score === gameItems.length
                        ? '🎉 Perfect! You know your assembly process!'
                        : 'Keep trying to improve your score!'}
                    </p>
                    <button
                      onClick={startGame}
                      className="mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      Restart Challenge
                    </button>
                  </div>
                )}
              </div>
            </>
            )}
          </div>

          <div className="bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-blue-400 mb-2">Quality Control Inspector</h2>
              <p className="text-gray-300 text-sm mb-4">Find all quality issues before time runs out!</p>
            
            {!inspectionGame.started ? (
              <button
                onClick={startInspectionGame}
                className="bg-blue-500/90 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm backdrop-blur-sm"
              >
                Start Quality Inspection
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-200">{inspectionGame.timeLeft}s</div>
                    <div className="text-sm text-gray-400">Time Left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-200">{inspectionGame.score}</div>
                    <div className="text-sm text-gray-400">Issues Found</div>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200"
                    alt="Car for inspection"
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                  
                  {inspectionGame.issues.map((issue, index) => (
                    <button
                      key={issue.id}
                      onClick={() => handleIssueClick(issue.id)}
                      disabled={issue.found}
                      className={`absolute w-8 h-8 rounded-full transition-all transform hover:scale-110 ${
                        issue.found
                          ? 'bg-green-500/90 cursor-default backdrop-blur-sm'
                          : 'bg-blue-500/20 cursor-pointer animate-pulse backdrop-blur-sm'
                      }`}
                      style={{
                        top: `${20 + (index * 15)}%`,
                        left: `${20 + (index * 15)}%`
                      }}
                    >
                      {issue.found && <CheckCircle className="w-6 h-6 text-white" />}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                  {inspectionGame.issues.map(issue => (
                    <div
                      key={issue.id}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        issue.found
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-700/50 text-gray-300'
                      }`}
                    >
                      {issue.name}
                    </div>
                  ))}
                </div>

                {inspectionGame.timeLeft === 0 && (
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-200 mb-2">
                      Score: {inspectionGame.score}/{inspectionGame.issues.length}
                    </p>
                    <p className="text-gray-400 mb-2 text-sm">
                      {inspectionGame.score === inspectionGame.issues.length
                        ? '🎉 Perfect inspection! You have a keen eye for detail!'
                        : 'Keep trying to improve your inspection skills!'}
                    </p>
                    <button
                      onClick={startInspectionGame}
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm mt-2"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}

export default App
