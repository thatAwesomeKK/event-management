"use client";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import DatePicker from "react-date-picker";
import { Input } from "../ui/input";
import * as z from "zod";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Comp, Event } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { Card } from "../ui/card";
import { alertCall } from "@/lib/toast/alertCall";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(6),
  venue: z.string(),
  desc: z.string().min(10),
  eventId: z.string(),
  isRegistering: z.boolean().default(false).optional(),
  isVerified: z.boolean().default(false).optional(),
});

const CreateCompForm = ({
  initialEvents,
  initialComp,
  update = false,
}: {
  initialEvents?: Event[];
  initialComp?: Comp & {
    event: {
      title: string;
      id: string;
    };
  };
  update?: boolean;
}) => {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<string | null>(
    initialComp?.poster || ""
  );
  const [startDate, setStartDate] = useState(update ? new Date(initialComp?.date!) : new Date());
  const [loading, setLoading] = useState(false);
  const uploadProfileImgRef = useRef<HTMLInputElement>(null);

  const compHook = update
    ? trpc.comp.update.useMutation()
    : trpc.comp.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialComp?.title || "",
      venue: initialComp?.venue || "",
      desc: initialComp?.description || "",
      eventId: "",
      isRegistering: initialComp?.isRegistering || false,
      isVerified: initialComp?.isVerified || false,
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
    console.log({ ...values, poster: profileImg, date: startDate.toString() });
    console.log(update);

    const updData: any = {
      ...values,
      poster: profileImg!,
      date: startDate.toString(),
    };
    if (update) updData.id = initialComp?.id!;

    await compHook.mutateAsync(updData, {
      onSuccess: () => {
        setLoading(false);
        alertCall("success", `${update ? "Updated" : "Created"} Successfully`);
        router.refresh();
      },
      onError: (err) => {
        if (err.data?.code === "CONFLICT") {
          setLoading(false);
          alertCall("error", "Some Error occurred");
          router.refresh();
        }
      },
    });
  }

  return (
    <Card className="w-[87vw] lg:w-[25vw]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-10 rounded-lg"
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
          {!initialComp && (
            <FormField
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Event" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {initialEvents?.map((event, i) => (
                        <SelectItem
                          className="capitalize"
                          key={i}
                          value={event.id}
                        >
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {initialComp && (
            <>
              <FormField
                control={form.control}
                name="isRegistering"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Registering ?</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Verified ?</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
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

export default CreateCompForm;
