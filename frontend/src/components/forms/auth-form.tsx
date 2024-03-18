import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useContext } from "react"
import { AuthContext } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const authFormSchema = z.object({
    email: z
        .string()
        .min(2, {
            message: "Email must be at least 2 characters."
        })
        .max(160, {
            message: "Email must not be longer than 160 characters."
        })
        .email({
            message: "Email must be in email format"
        }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters."
        })
        .max(30, {
            message: "Password must not be longer than 30 characters."
        })
})

export default function AuthForm() {
    const authContext = useContext(AuthContext)

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
      });
    
    const onSubmit = (data: z.infer<typeof authFormSchema>) => {
        console.log(data);
    };

    return (
      <Dialog open={authContext.authModal.isActive} onOpenChange={authContext.authModal.toogleActive}>

        <DialogContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </DialogContent>
      </Dialog>
    )
}