"use client";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  field1: z.string().email(),
});

const JudgingForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      field1: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      //   await signIn("credentials", values);
      //   alertCall("success", "Signed in successfully!");
      setLoading(false);
    } catch (error) {
      //   alertCall("error", "Some error occurred!");
      setLoading(true);
    }
  }
  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-10 rounded-lg w-[87vw] lg:w-[25vw]"
        >
          <FormField
            control={form.control}
            name="field1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field 1</FormLabel>
                <FormControl>
                  <Input placeholder="field1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
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
          /> */}
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            SignIn
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default JudgingForm;
