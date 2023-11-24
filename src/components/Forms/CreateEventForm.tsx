"use client";
import { SetStateAction, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Textarea } from "../ui/textarea";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { Card } from "../ui/card";
import { alertCall } from "@/lib/toast/alertCall";

const formSchema = z.object({
  title: z.string().min(6),
  venue: z.string(),
  desc: z.string().min(10),
});

const CreateEventForm = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const uploadProfileImgRef = useRef<HTMLInputElement>(null);
  const createEvent = trpc.event.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      venue: "",
      desc: "",
    },
  });

  const addImageToUpload = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setProfileImg(readerEvent.target?.result! as string);
    };
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await createEvent.mutateAsync(
      {
        ...values,
        poster: profileImg!,
        date: startDate.toString(),
      },
      {
        onSuccess: () => {
          setLoading(false);
          form.reset();
          alertCall("success", "Event Created!");
        },
        onError: (err) => {
          if (err.data?.code === "CONFLICT") {
            setLoading(false);
            alertCall("error", "Some Error occurred");
          }
        },
      }
    );
  }

  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-10 rounded-lg w-[25vw]"
        >
          <div
            className="cursor-pointer"
            onClick={() => uploadProfileImgRef.current?.click()}
          >
            <div className="relative h-96 w-72 overflow-hidden border rounded-lg shadow-md">
              <Image
                className="object-cover hover:scale-110 transition duration-150 ease-in-out "
                src={profileImg || "/images/default-profile-photo.png"}
                alt=""
                fill={true}
              />
            </div>
            <p className="font-bold group text-lg text-primary text-center">
              Select Poster
            </p>
            <input
              ref={uploadProfileImgRef}
              hidden
              type="file"
              accept="image/x-png,image/jpeg,image/png,image/jpg"
              onChange={(e: any) => addImageToUpload(e)}
            />
          </div>
          <DatePicker
            className={["font-medium"]}
            format="dd/MM/yyyy"
            onChange={(value) => setStartDate(value as SetStateAction<Date>)}
            value={startDate}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="Venue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            Save
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default CreateEventForm;
