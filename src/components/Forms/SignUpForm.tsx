"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { Card } from "../ui/card";
import { alertCall } from "@/lib/toast/alertCall";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const createUser = trpc.auth.signup.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await createUser.mutateAsync(
        { ...values },
        {
          onSuccess: () => {
            setLoading(false);
            alertCall("success", "Sign Up Success");
            router.push("/signin");
          },
          onError: (err) => {
            if (err.data?.code === "UNPROCESSABLE_CONTENT") {
              alertCall("error", "Some error occurred!");
              setLoading(false);
            }
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-10 rounded-lg w-[25vw]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
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
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            SignUp
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default SignUpForm;
