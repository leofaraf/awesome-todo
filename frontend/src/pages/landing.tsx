import LandingMenu from "@/components/landing-menu";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import FlexibleContainer from "@/components/ui/flexible-container";
import Person from "@/assets/person.png"
import { AuthContext } from "@/components/auth-provider";
import { useContext } from "react";
import AuthForm from "@/components/forms/auth-form";

const points = [
    "Enchance your productivity",
    "Make more orders",
    "Get a access to big ecosystem"
]

export default function Landing() {
  const authContext = useContext(AuthContext)
  
  return (
    <>
      <AuthForm />
      <LandingMenu />
      <FlexibleContainer>
        <div className="flex justify-center items-center h-[85vh] gap-3 w-full">
          <Card className='bg-foreground text-primary-foreground'>
            <CardHeader>
              <img src={Person} alt="Your SVG" className="" />
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
              <Button variant="outline" className='flex w-full text-primary'
              onClick={() => authContext.authModal.toogleActive()}>
                Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </FlexibleContainer>
    </>
  )
}
  