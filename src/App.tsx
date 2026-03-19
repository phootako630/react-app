import { useState, useCallback } from 'react'
import { Code2, BookOpen, Trophy, Timer, ChevronRight, CheckCircle2, XCircle, Zap, Layers, Globe, Palette, RotateCcw, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import './App.css'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
  description: string
  questions: Question[]
}

const categories: Category[] = [
  {
    id: 'html',
    name: 'HTML',
    icon: <Globe className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    description: 'Semantic HTML, accessibility, forms & more',
    questions: [
      {
        id: 1,
        question: 'What is the purpose of the <meta charset="UTF-8"> tag?',
        options: [
          'It defines the character encoding for the HTML document',
          'It sets the page title',
          'It links an external stylesheet',
          'It defines the viewport'
        ],
        correctAnswer: 0,
        explanation: 'The <meta charset="UTF-8"> tag specifies the character encoding for the HTML document, ensuring that special characters are displayed correctly.'
      },
      {
        id: 2,
        question: 'Which HTML5 element is used for self-contained content that could be distributed independently?',
        options: ['<section>', '<div>', '<article>', '<aside>'],
        correctAnswer: 2,
        explanation: 'The <article> element represents a self-contained composition that could be independently distributable or reusable, such as a blog post or news article.'
      },
      {
        id: 3,
        question: 'What does the "defer" attribute do on a <script> tag?',
        options: [
          'It makes the script execute immediately',
          'It delays script execution until the HTML document has been fully parsed',
          'It prevents the script from running',
          'It loads the script from a CDN'
        ],
        correctAnswer: 1,
        explanation: 'The "defer" attribute tells the browser to download the script in parallel with HTML parsing but wait to execute it until the document has been fully parsed.'
      },
      {
        id: 4,
        question: 'Which attribute makes an input field mandatory before form submission?',
        options: ['mandatory', 'required', 'validate', 'necessary'],
        correctAnswer: 1,
        explanation: 'The "required" attribute specifies that an input field must be filled out before submitting the form.'
      },
      {
        id: 5,
        question: 'What is the difference between <strong> and <b> tags?',
        options: [
          'There is no difference',
          '<strong> has semantic importance, <b> is purely visual',
          '<b> has semantic importance, <strong> is purely visual',
          'Both are deprecated in HTML5'
        ],
        correctAnswer: 1,
        explanation: '<strong> indicates that its contents have strong importance and conveys semantic meaning, while <b> is used for stylistically bold text without extra importance.'
      },
      {
        id: 6,
        question: 'What is the purpose of the <figure> and <figcaption> elements?',
        options: [
          'To create a navigation menu',
          'To embed videos',
          'To group media content with a caption',
          'To create a sidebar'
        ],
        correctAnswer: 2,
        explanation: '<figure> is used to group self-contained media content like images, diagrams, or code, and <figcaption> provides a caption for it.'
      },
      {
        id: 7,
        question: 'Which HTML element is used to define a description list?',
        options: ['<dl>', '<desc>', '<list>', '<dd>'],
        correctAnswer: 0,
        explanation: '<dl> defines a description list. It contains <dt> (term) and <dd> (description) elements.'
      },
      {
        id: 8,
        question: 'What is the role attribute used for in HTML?',
        options: [
          'To style elements',
          'To define ARIA roles for accessibility',
          'To assign CSS classes',
          'To create links'
        ],
        correctAnswer: 1,
        explanation: 'The role attribute is used to define ARIA (Accessible Rich Internet Applications) roles, improving accessibility for screen readers and assistive technologies.'
      }
    ]
  },
  {
    id: 'css',
    name: 'CSS',
    icon: <Palette className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'Flexbox, Grid, animations, selectors & layouts',
    questions: [
      {
        id: 1,
        question: 'What is the CSS Box Model?',
        options: [
          'A layout model using flexbox',
          'Content, padding, border, and margin around an element',
          'A CSS framework',
          'A 3D rendering model'
        ],
        correctAnswer: 1,
        explanation: 'The CSS Box Model describes the rectangular boxes generated for elements, consisting of content, padding, border, and margin areas.'
      },
      {
        id: 2,
        question: 'What is the difference between "display: none" and "visibility: hidden"?',
        options: [
          'No difference',
          '"display: none" removes the element from flow; "visibility: hidden" hides it but keeps the space',
          '"visibility: hidden" removes the element from flow',
          'Both remove the element from the DOM'
        ],
        correctAnswer: 1,
        explanation: '"display: none" completely removes the element from the document flow. "visibility: hidden" hides the element but it still occupies space in the layout.'
      },
      {
        id: 3,
        question: 'Which CSS property is used to create a flexible container?',
        options: ['display: block', 'display: flex', 'display: inline', 'display: table'],
        correctAnswer: 1,
        explanation: '"display: flex" creates a flex container, enabling a flexible layout model where child elements can be arranged dynamically.'
      },
      {
        id: 4,
        question: 'What does "position: sticky" do?',
        options: [
          'Fixes the element at a specific position permanently',
          'Toggles between relative and fixed positioning based on scroll',
          'Removes the element from normal flow',
          'Positions the element relative to its parent'
        ],
        correctAnswer: 1,
        explanation: '"position: sticky" makes an element toggle between relative and fixed positioning depending on the user\'s scroll position. It sticks when it reaches a specified offset.'
      },
      {
        id: 5,
        question: 'What is the specificity order from lowest to highest?',
        options: [
          'ID > Class > Element > Inline',
          'Element > Class > ID > Inline',
          'Inline > ID > Class > Element',
          'Class > Element > ID > Inline'
        ],
        correctAnswer: 1,
        explanation: 'CSS specificity from lowest to highest: element/pseudo-element selectors, class/attribute/pseudo-class selectors, ID selectors, and inline styles.'
      },
      {
        id: 6,
        question: 'Which CSS Grid property defines the number and size of columns?',
        options: ['grid-columns', 'grid-template-columns', 'grid-auto-columns', 'grid-column-count'],
        correctAnswer: 1,
        explanation: '"grid-template-columns" defines the column structure of a CSS Grid layout, specifying the number and widths of columns.'
      },
      {
        id: 7,
        question: 'What is the "z-index" property used for?',
        options: [
          'Setting font size',
          'Controlling the stacking order of positioned elements',
          'Adding zoom effects',
          'Setting element width'
        ],
        correctAnswer: 1,
        explanation: '"z-index" controls the vertical stacking order of elements that overlap. Higher values are displayed in front of lower values. It only works on positioned elements.'
      },
      {
        id: 8,
        question: 'What does the CSS "clamp()" function do?',
        options: [
          'Clamps an element to its parent',
          'Sets a value that is constrained between a minimum and maximum',
          'Creates a clamping animation',
          'Restricts the number of children'
        ],
        correctAnswer: 1,
        explanation: 'The clamp() function takes three values — a minimum, preferred, and maximum — and returns the preferred value clamped between the min and max bounds. E.g. clamp(1rem, 2.5vw, 2rem).'
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    description: 'Closures, promises, event loop, ES6+ features',
    questions: [
      {
        id: 1,
        question: 'What is a closure in JavaScript?',
        options: [
          'A way to close the browser window',
          'A function that has access to its outer function\'s scope even after the outer function returns',
          'A method to end a loop',
          'A way to prevent memory leaks'
        ],
        correctAnswer: 1,
        explanation: 'A closure is a function that retains access to variables from its lexical scope (outer function) even after the outer function has finished executing.'
      },
      {
        id: 2,
        question: 'What is the difference between "==" and "===" in JavaScript?',
        options: [
          'No difference',
          '"==" compares with type coercion; "===" compares without type coercion',
          '"===" is faster than "=="',
          '"==" is used for strings only'
        ],
        correctAnswer: 1,
        explanation: '"==" (loose equality) performs type coercion before comparison, while "===" (strict equality) compares both value and type without coercion.'
      },
      {
        id: 3,
        question: 'What does the "event loop" do in JavaScript?',
        options: [
          'It handles mouse events only',
          'It continuously checks the call stack and task queue, executing tasks when the stack is empty',
          'It loops through DOM events',
          'It prevents infinite loops'
        ],
        correctAnswer: 1,
        explanation: 'The event loop continuously monitors the call stack and the task queue. When the call stack is empty, it pushes the first task from the queue onto the stack for execution.'
      },
      {
        id: 4,
        question: 'What is the output of: console.log(typeof null)?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctAnswer: 2,
        explanation: 'typeof null returns "object" — this is a well-known historical bug in JavaScript that has been kept for backward compatibility.'
      },
      {
        id: 5,
        question: 'What is the purpose of Promise.all()?',
        options: [
          'It runs promises sequentially',
          'It waits for all promises to resolve (or any to reject)',
          'It cancels all pending promises',
          'It creates a new promise'
        ],
        correctAnswer: 1,
        explanation: 'Promise.all() takes an iterable of promises and returns a single promise that resolves when all input promises resolve, or rejects if any promise rejects.'
      },
      {
        id: 6,
        question: 'What is "hoisting" in JavaScript?',
        options: [
          'Moving elements up in the DOM',
          'The behavior where declarations are moved to the top of their scope during compilation',
          'A CSS layout technique',
          'A way to optimize performance'
        ],
        correctAnswer: 1,
        explanation: 'Hoisting is JavaScript\'s behavior of moving variable and function declarations to the top of their containing scope during the compilation phase, before code execution.'
      },
      {
        id: 7,
        question: 'What does the spread operator (...) do?',
        options: [
          'It only works with strings',
          'It expands an iterable into individual elements',
          'It merges two functions',
          'It creates a new scope'
        ],
        correctAnswer: 1,
        explanation: 'The spread operator (...) expands an iterable (array, string, object) into individual elements. It can be used for copying arrays, merging objects, and passing arguments.'
      },
      {
        id: 8,
        question: 'What is the difference between "let", "const", and "var"?',
        options: [
          'They are all the same',
          '"var" is function-scoped; "let" and "const" are block-scoped; "const" cannot be reassigned',
          '"let" is global, "const" is local, "var" is both',
          '"const" can be reassigned, "let" cannot'
        ],
        correctAnswer: 1,
        explanation: '"var" is function-scoped and hoisted, "let" is block-scoped and can be reassigned, "const" is block-scoped and cannot be reassigned (though object properties can be mutated).'
      }
    ]
  },
  {
    id: 'react',
    name: 'React',
    icon: <Layers className="w-6 h-6" />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    description: 'Hooks, state management, lifecycle & patterns',
    questions: [
      {
        id: 1,
        question: 'What is the Virtual DOM in React?',
        options: [
          'The actual browser DOM',
          'A lightweight in-memory representation of the real DOM for efficient updates',
          'A CSS rendering engine',
          'A server-side rendering technique'
        ],
        correctAnswer: 1,
        explanation: 'The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to batch and optimize updates by comparing the virtual DOM with the real one (reconciliation).'
      },
      {
        id: 2,
        question: 'What is the purpose of useEffect hook?',
        options: [
          'To create state variables',
          'To perform side effects in function components',
          'To handle routing',
          'To define CSS styles'
        ],
        correctAnswer: 1,
        explanation: 'useEffect is used to perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM. It runs after render.'
      },
      {
        id: 3,
        question: 'What is "lifting state up" in React?',
        options: [
          'Moving state to a CDN',
          'Moving shared state to the closest common ancestor component',
          'Removing state from components',
          'Using global variables instead of state'
        ],
        correctAnswer: 1,
        explanation: '"Lifting state up" means moving state to the closest common ancestor component when multiple components need to share and sync the same data.'
      },
      {
        id: 4,
        question: 'What is the purpose of React.memo()?',
        options: [
          'To add comments to components',
          'To memoize a component, preventing re-renders if props haven\'t changed',
          'To create a new component',
          'To store data in memory'
        ],
        correctAnswer: 1,
        explanation: 'React.memo() is a higher-order component that memoizes the rendered output. If props are the same, React skips rendering the component and reuses the last rendered result.'
      },
      {
        id: 5,
        question: 'What are React keys used for in lists?',
        options: [
          'To add keyboard shortcuts',
          'To help React identify which items have changed, been added, or removed',
          'To encrypt component data',
          'To set CSS properties'
        ],
        correctAnswer: 1,
        explanation: 'Keys help React identify which list items have changed, been added, or removed. They give elements a stable identity, enabling efficient DOM updates during reconciliation.'
      },
      {
        id: 6,
        question: 'What is the difference between controlled and uncontrolled components?',
        options: [
          'Controlled are faster',
          'Controlled components have their state managed by React; uncontrolled use refs to access DOM values',
          'Uncontrolled components cannot have events',
          'There is no difference'
        ],
        correctAnswer: 1,
        explanation: 'Controlled components have their form data handled by React state, while uncontrolled components store their own state internally and you access values using refs.'
      },
      {
        id: 7,
        question: 'What does useMemo hook do?',
        options: [
          'It memoizes a computed value to avoid expensive recalculations on every render',
          'It creates a new memo component',
          'It stores data in localStorage',
          'It adds comments to code'
        ],
        correctAnswer: 0,
        explanation: 'useMemo memoizes the result of an expensive computation. It only recalculates when its dependencies change, preventing unnecessary recalculations on every render.'
      },
      {
        id: 8,
        question: 'What is the Context API used for?',
        options: [
          'Routing between pages',
          'Making API calls',
          'Passing data through the component tree without prop drilling',
          'Creating animations'
        ],
        correctAnswer: 2,
        explanation: 'The Context API provides a way to pass data through the component tree without having to pass props down manually at every level (prop drilling).'
      }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: <Code2 className="w-6 h-6" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    description: 'Types, interfaces, generics & type guards',
    questions: [
      {
        id: 1,
        question: 'What is the difference between "interface" and "type" in TypeScript?',
        options: [
          'They are exactly the same',
          'Interfaces can be extended/merged; types are more flexible with unions & intersections',
          'Types can only define primitives',
          'Interfaces are deprecated'
        ],
        correctAnswer: 1,
        explanation: 'Interfaces support declaration merging and extending. Type aliases are more flexible, supporting unions, intersections, tuples, and mapped types. Both can describe object shapes.'
      },
      {
        id: 2,
        question: 'What is a generic in TypeScript?',
        options: [
          'A general-purpose variable',
          'A way to create reusable components that work with multiple types',
          'A default type for all variables',
          'A global configuration setting'
        ],
        correctAnswer: 1,
        explanation: 'Generics allow you to create reusable components, functions, and classes that work with multiple types while maintaining type safety. They act as type parameters.'
      },
      {
        id: 3,
        question: 'What does the "unknown" type represent in TypeScript?',
        options: [
          'The same as "any"',
          'A type-safe counterpart of "any" that requires type checking before use',
          'An undefined variable',
          'A deprecated type'
        ],
        correctAnswer: 1,
        explanation: '"unknown" is a type-safe counterpart of "any". You must perform some type checking or assertion before you can use a value of type "unknown" in operations.'
      },
      {
        id: 4,
        question: 'What is a type guard in TypeScript?',
        options: [
          'A security feature',
          'An expression that performs a runtime check to narrow the type within a scope',
          'A way to lock types',
          'A type of error handling'
        ],
        correctAnswer: 1,
        explanation: 'A type guard is an expression that performs a runtime check and narrows the type of a variable within a conditional block. Common examples: typeof, instanceof, and custom type predicates.'
      },
      {
        id: 5,
        question: 'What does "keyof" operator do?',
        options: [
          'Creates a new key',
          'Produces a union type of all property names of a type',
          'Deletes a key from an object',
          'Checks if a key exists'
        ],
        correctAnswer: 1,
        explanation: '"keyof" takes an object type and produces a string or numeric literal union of its keys. E.g., keyof { name: string; age: number } results in "name" | "age".'
      },
      {
        id: 6,
        question: 'What is the "never" type used for?',
        options: [
          'To represent null values',
          'To represent values that never occur (e.g., functions that always throw)',
          'To skip type checking',
          'To create optional properties'
        ],
        correctAnswer: 1,
        explanation: 'The "never" type represents values that never occur. It\'s used for functions that always throw errors, infinite loops, or exhaustive type checking in switch statements.'
      },
      {
        id: 7,
        question: 'What is a discriminated union in TypeScript?',
        options: [
          'A union that filters out types',
          'A union of types that share a common literal property used to narrow the type',
          'A way to combine interfaces',
          'A type of enum'
        ],
        correctAnswer: 1,
        explanation: 'A discriminated union is a pattern where multiple types share a common property (the discriminant) with literal types. TypeScript can narrow the union based on this property.'
      },
      {
        id: 8,
        question: 'What is the "Partial<T>" utility type?',
        options: [
          'It removes all properties from T',
          'It makes all properties of T optional',
          'It makes all properties required',
          'It creates a partial copy of an array'
        ],
        correctAnswer: 1,
        explanation: 'Partial<T> constructs a type with all properties of T set to optional. It\'s useful when you want to update only some properties of an object.'
      }
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: <Timer className="w-6 h-6" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    description: 'Optimization, lazy loading, caching & web vitals',
    questions: [
      {
        id: 1,
        question: 'What is "code splitting" in web development?',
        options: [
          'Writing code in multiple files',
          'Breaking the bundle into smaller chunks that are loaded on demand',
          'Splitting CSS from JavaScript',
          'Using multiple programming languages'
        ],
        correctAnswer: 1,
        explanation: 'Code splitting breaks the application bundle into smaller chunks that can be loaded on demand. This reduces the initial load time by only loading the code needed for the current page.'
      },
      {
        id: 2,
        question: 'What is the purpose of "lazy loading"?',
        options: [
          'Making the app load slowly',
          'Deferring the loading of non-critical resources until they are needed',
          'Loading all resources at startup',
          'Removing unused code'
        ],
        correctAnswer: 1,
        explanation: 'Lazy loading defers the loading of non-critical resources (images, components, modules) until they are actually needed, improving initial page load performance.'
      },
      {
        id: 3,
        question: 'What is the Critical Rendering Path?',
        options: [
          'The path to the server',
          'The sequence of steps the browser takes to convert HTML, CSS, and JS into pixels on screen',
          'A testing methodology',
          'A deployment pipeline'
        ],
        correctAnswer: 1,
        explanation: 'The Critical Rendering Path is the sequence of steps the browser goes through to convert HTML, CSS, and JavaScript into actual pixels rendered on the screen.'
      },
      {
        id: 4,
        question: 'What is "debouncing" in JavaScript?',
        options: [
          'Removing event listeners',
          'Delaying function execution until a pause in rapid events',
          'Bouncing data between servers',
          'A CSS animation technique'
        ],
        correctAnswer: 1,
        explanation: 'Debouncing delays function execution until there is a pause in rapid triggering events. It\'s commonly used for search inputs, window resize handlers, etc.'
      },
      {
        id: 5,
        question: 'What is Largest Contentful Paint (LCP)?',
        options: [
          'The time to paint the background color',
          'A Core Web Vital measuring the time to render the largest visible content element',
          'The time to load all CSS',
          'A metric for JavaScript execution speed'
        ],
        correctAnswer: 1,
        explanation: 'LCP is a Core Web Vital that measures the time from page load to when the largest content element (image, text block, video) is rendered in the viewport. Good LCP is under 2.5 seconds.'
      },
      {
        id: 6,
        question: 'What is tree shaking?',
        options: [
          'A testing technique',
          'Removing unused code from the final bundle during build',
          'Reorganizing the DOM tree',
          'A CSS optimization method'
        ],
        correctAnswer: 1,
        explanation: 'Tree shaking is a dead code elimination technique used by bundlers (like Webpack, Rollup) to remove unused exports from the final bundle, reducing file size.'
      },
      {
        id: 7,
        question: 'What is the purpose of a Service Worker?',
        options: [
          'To manage server deployments',
          'To run scripts in the background, enabling offline functionality and caching',
          'To handle database queries',
          'To manage CSS styles'
        ],
        correctAnswer: 1,
        explanation: 'A Service Worker is a script that runs in the background, separate from the web page. It enables features like offline functionality, push notifications, and advanced caching strategies.'
      },
      {
        id: 8,
        question: 'What is the difference between "throttling" and "debouncing"?',
        options: [
          'They are the same thing',
          'Throttling limits execution to once per interval; debouncing waits until events stop',
          'Debouncing is faster than throttling',
          'Throttling only works with click events'
        ],
        correctAnswer: 1,
        explanation: 'Throttling ensures a function executes at most once per specified time interval. Debouncing delays execution until a pause in events. Throttle for scroll; debounce for search input.'
      }
    ]
  }
]

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeQuiz, setActiveQuiz] = useState<Category | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<Array<'correct' | 'incorrect' | null>>([])
  const [totalQuizzesCompleted, setTotalQuizzesCompleted] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)

  const startQuiz = (category: Category) => {
    setActiveQuiz(category)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
    setAnsweredQuestions(new Array(category.questions.length).fill(null))
    setDialogOpen(true)
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    const isCorrect = answerIndex === activeQuiz!.questions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 1)
      setTotalCorrect(prev => prev + 1)
    }
    setTotalAnswered(prev => prev + 1)
    setAnsweredQuestions(prev => {
      const updated = [...prev]
      updated[currentQuestion] = isCorrect ? 'correct' : 'incorrect'
      return updated
    })
  }

  const nextQuestion = () => {
    if (currentQuestion < activeQuiz!.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
      setTotalQuizzesCompleted(prev => prev + 1)
    }
  }

  const closeQuiz = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const getScoreMessage = () => {
    if (!activeQuiz) return ''
    const percentage = (score / activeQuiz.questions.length) * 100
    if (percentage === 100) return 'Perfect Score! You\'re a master!'
    if (percentage >= 75) return 'Great job! You know your stuff!'
    if (percentage >= 50) return 'Good effort! Keep practicing!'
    return 'Keep learning! You\'ll get there!'
  }

  const getScoreColor = () => {
    if (!activeQuiz) return ''
    const percentage = (score / activeQuiz.questions.length) * 100
    if (percentage >= 75) return 'text-green-500'
    if (percentage >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getProgressValue = () => {
    if (!activeQuiz) return 0
    return ((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / activeQuiz.questions.length) * 100
  }

  const getScoreBarColor = () => {
    if (!activeQuiz) return 'bg-green-500'
    const percentage = (score / activeQuiz.questions.length) * 100
    if (percentage >= 75) return 'bg-gradient-to-r from-green-500 to-emerald-400'
    if (percentage >= 50) return 'bg-gradient-to-r from-yellow-500 to-amber-400'
    return 'bg-gradient-to-r from-red-500 to-rose-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-violet-500/25">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Frontend Interview Prep</h1>
                <p className="text-xs text-slate-400">Master your frontend knowledge</p>
              </div>
            </div>
            {totalAnswered > 0 && (
              <div className="hidden sm:flex items-center gap-3">
                <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600 gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  {totalQuizzesCompleted} quiz{totalQuizzesCompleted !== 1 ? 'zes' : ''}
                </Badge>
                <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600 gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  {totalCorrect}/{totalAnswered} correct
                </Badge>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="bg-violet-500/10 border-violet-500/20 text-violet-300 mb-6 gap-2 px-4 py-1.5 rounded-full">
              <Zap className="w-4 h-4 text-violet-400" />
              Interactive Quiz Platform
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Ace Your Next{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Frontend Interview
              </span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Test your knowledge across HTML, CSS, JavaScript, React, TypeScript, and Performance.
              Each quiz features curated questions with detailed explanations.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>{categories.length} Categories</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>{categories.reduce((acc, cat) => acc + cat.questions.length, 0)} Questions</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Choose a Topic</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Card
              key={category.id}
              className={cn(
                'group relative overflow-hidden cursor-pointer bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/10 hover:border-violet-500/50',
                category.borderColor
              )}
              onClick={() => startQuiz(category)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-6">
                <div className={cn(
                  'inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110',
                  category.bgColor, category.color
                )}>
                  {category.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">{category.name}</h4>
                <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-slate-700/50 text-slate-500 border-slate-600 text-xs">
                    {category.questions.length} questions
                  </Badge>
                  <div className="flex items-center gap-1 text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Start Quiz</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quiz Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeQuiz() }}>
        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto bg-slate-800 border-slate-700 p-0 gap-0 sm:rounded-2xl">
          {activeQuiz && (
            <>
              <DialogHeader className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 px-6 py-4 z-10">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'inline-flex items-center justify-center w-10 h-10 rounded-lg',
                    activeQuiz.bgColor, activeQuiz.color
                  )}>
                    {activeQuiz.icon}
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-semibold text-white">
                      {activeQuiz.name} Quiz
                    </DialogTitle>
                    {!quizComplete ? (
                      <DialogDescription className="text-xs text-slate-400">
                        Question {currentQuestion + 1} of {activeQuiz.questions.length}
                      </DialogDescription>
                    ) : (
                      <DialogDescription className="sr-only">
                        Quiz results
                      </DialogDescription>
                    )}
                  </div>
                </div>
              </DialogHeader>

              {/* Progress Bar */}
              {!quizComplete && (
                <div className="px-6 pt-4">
                  <Progress
                    value={getProgressValue()}
                    className="h-2 bg-slate-700"
                    indicatorClassName="bg-gradient-to-r from-violet-500 to-indigo-500"
                  />
                </div>
              )}

              {/* Quiz Content */}
              <div className="p-6">
                {!quizComplete ? (
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                      {activeQuiz.questions[currentQuestion].question}
                    </h4>

                    <div className="space-y-3 mb-6">
                      {activeQuiz.questions[currentQuestion].options.map((option, index) => {
                        const isSelected = selectedAnswer === index
                        const isCorrect = index === activeQuiz.questions[currentQuestion].correctAnswer
                        const showResult = selectedAnswer !== null

                        return (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => handleAnswer(index)}
                            disabled={selectedAnswer !== null}
                            className={cn(
                              'w-full text-left p-4 h-auto rounded-xl border transition-all duration-200 flex items-start gap-3 justify-start whitespace-normal',
                              showResult
                                ? isCorrect
                                  ? 'border-green-500/50 bg-green-500/10 text-green-300 hover:bg-green-500/10 hover:text-green-300'
                                  : isSelected
                                    ? 'border-red-500/50 bg-red-500/10 text-red-300 hover:bg-red-500/10 hover:text-red-300'
                                    : 'border-slate-700 bg-slate-800/50 text-slate-500 hover:bg-slate-800/50 hover:text-slate-500'
                                : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-violet-500/50 hover:bg-violet-500/5'
                            )}
                          >
                            <span className={cn(
                              'inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-medium shrink-0 mt-0.5',
                              showResult
                                ? isCorrect
                                  ? 'bg-green-500/20 text-green-400'
                                  : isSelected
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-slate-700 text-slate-500'
                                : 'bg-slate-700 text-slate-400'
                            )}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-sm leading-relaxed">{option}</span>
                            {showResult && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5 ml-auto" />
                            )}
                            {showResult && isSelected && !isCorrect && (
                              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 ml-auto" />
                            )}
                          </Button>
                        )
                      })}
                    </div>

                    {showExplanation && (
                      <Card className="bg-slate-700/50 border-slate-600 mb-6">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <BookOpen className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-violet-300 mb-1">Explanation</p>
                              <p className="text-sm text-slate-300 leading-relaxed">
                                {activeQuiz.questions[currentQuestion].explanation}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {selectedAnswer !== null && (
                      <Button
                        onClick={nextQuestion}
                        className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25"
                        size="lg"
                      >
                        {currentQuestion < activeQuiz.questions.length - 1 ? (
                          <>Next Question <ArrowRight className="w-4 h-4" /></>
                        ) : (
                          <>See Results <Trophy className="w-4 h-4" /></>
                        )}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 mb-6">
                      <Trophy className={cn('w-10 h-10', getScoreColor())} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
                    <p className="text-slate-400 mb-6">{getScoreMessage()}</p>

                    <Card className="bg-slate-700/50 border-slate-600 mb-8 max-w-xs mx-auto">
                      <CardContent className="p-6">
                        <div className={cn('text-5xl font-extrabold mb-2', getScoreColor())}>
                          {score}/{activeQuiz.questions.length}
                        </div>
                        <p className="text-sm text-slate-400">
                          {Math.round((score / activeQuiz.questions.length) * 100)}% correct
                        </p>
                        <div className="mt-4">
                          <Progress
                            value={(score / activeQuiz.questions.length) * 100}
                            className="h-3 bg-slate-600"
                            indicatorClassName={getScoreBarColor()}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <div className="text-left mb-8">
                      <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Question Summary</h4>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {answeredQuestions.map((result, index) => (
                          <div
                            key={index}
                            className={cn(
                              'w-full aspect-square rounded-lg flex items-center justify-center text-sm font-medium',
                              result === 'correct'
                                ? 'bg-green-500/20 text-green-400'
                                : result === 'incorrect'
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'bg-slate-700/30 text-slate-600'
                            )}
                          >
                            {index + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => startQuiz(activeQuiz)}
                        className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25"
                        size="lg"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Retry Quiz
                      </Button>
                      <Button
                        onClick={closeQuiz}
                        variant="secondary"
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
                        size="lg"
                      >
                        Back to Topics
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {!quizComplete && (
                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span>
                    <span>{activeQuiz.questions.length - currentQuestion - (selectedAnswer !== null ? 1 : 0)} remaining</span>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-slate-500">
            <p>Frontend Interview Prep - Practice makes perfect</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
