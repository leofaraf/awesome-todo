import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './components/mode-toggle'
import { TypographyH2, TypographyP } from './components/ui/typography'
import LandingMenu from '@/components/landing-menu'
import Freelancer from '@/assets/freelancer.svg'
import FlexibleContainer from '@/components/ui/flexible-container'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'

const points = [
  "Enchance your productivity",
  "Make more orders",
  "Get a access to big ecosystem"
]

function App() {
  return (
    <>
      <LandingMenu />
      <FlexibleContainer>
        <div className="flex flex-col sm:flex-row justify-center items-center h-screen gap-3 w-full">
          <img src={Freelancer} alt="Your SVG" className="w-96 h-96" />
          <Card>
            <CardHeader>
              <CardTitle>High-quility todo planner for freelancers</CardTitle>
              <CardDescription>Pros:</CardDescription>
            </CardHeader>
            <CardContent>
              {points.map(item => (
                <div className='flex items-center gap-3'>
                  <span className="flex h-2 w-2 rounded-full bg-sky-500" />
                  <p>{item}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className='flex w-full'>
                Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </FlexibleContainer>
    </>
  )
}

export default App
