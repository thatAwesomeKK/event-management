"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";

interface Props {
  compId: string;
}

const formSchema = z.object({
  name: z.string().min(6),
  password: z.string().min(6),
});

const CreateJudge = ({ compId }: Props) => {
  const [loading, setLoading] = useState(false);
  const createUser = trpc.comp.createJudge.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createUser.mutateAsync(
      { ...values, compId },
      {
        onSuccess: () => {
          setLoading(false);
          //   alertCall("success", "Sign Up Success");
          //   router.push("/signin");
        },
        onError: (err) => {
          if (err.data?.code === "CONFLICT") {
            // alertCall("error", "Some error occurred!");
            setLoading(false);
          }
        },
      }
    );
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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
            Create
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default CreateJudge;
