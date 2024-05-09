"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { alertCall } from "@/lib/toast/alertCall";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

export type Participants = {
  id: string;
  username: string;
  email: string;
  score: number;
};

interface Props {
  initialParticipants: Participants[];
}

const JudgingSheet = ({ initialParticipants }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [marks, setMarks] = useState({
    field1: 0,
    field2: 0,
    field3: 0,
  });

  const judgeHook = trpc.comp.judgeMarks.useMutation();

  const handleMarks = async (participantId: string) => {
    setLoading(true);
    console.log(marks, participantId);

    const data: any = {
      marks,
      participantId,
    };

    await judgeHook.mutateAsync(data, {
      onSuccess: () => {
        setLoading(false);
        alertCall("success", "Created Successfully");
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
  };

  return (
    <Table>
      <TableCaption>A list of the participants.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Field 1</TableHead>
          <TableHead>Field 2</TableHead>
          <TableHead>Field 3</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialParticipants.map((participant) => (
          <TableRow key={participant.id}>
            <TableCell className="font-medium">
              {participant.username}
            </TableCell>
            <TableCell>
              <Input
                type="number"
                disabled={participant.score !== 0}
                onChange={(e) =>
                  setMarks({ ...marks, field1: parseInt(e.target.value) })
                }
                min={0}
                max={10}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                disabled={participant.score !== 0}
                onChange={(e) =>
                  setMarks({ ...marks, field2: parseInt(e.target.value) })
                }
                min={0}
                max={10}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                disabled={participant.score !== 0}
                onChange={(e) =>
                  setMarks({ ...marks, field3: parseInt(e.target.value) })
                }
                min={0}
                max={10}
              />
            </TableCell>
            <TableCell>
              <Button
                disabled={loading}
                type="submit"
                onClick={() => handleMarks(participant.id)}
              >
                Submit
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
            </TableCell>
            <TableCell className="flex items-center">
              <Label htmlFor="email">Previous Total</Label>
              <Input
                type="number"
                value={participant.score}
                disabled
                min={0}
                max={10}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JudgingSheet;
