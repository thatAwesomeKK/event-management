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
import { Comp } from "@prisma/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  initialParticipants: Participants[];
}

export type Participants = {
  id: string;
  username: string;
  email: string;
};

const JudgingSheet = ({ initialParticipants }: Props) => {
  const [loading, setLoading] = useState(false);
  const [marks, setMarks] = useState({
    field1: 0,
    field2: 0,
    field3: 0,
  });
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
                onChange={(e) =>
                  setMarks({ ...marks, field1: parseInt(e.target.value) })
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                onChange={(e) =>
                  setMarks({ ...marks, field2: parseInt(e.target.value) })
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                onChange={(e) =>
                  setMarks({ ...marks, field3: parseInt(e.target.value) })
                }
              />
            </TableCell>
            <TableCell>
              <Button disabled={loading} type="submit">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}
                Submit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JudgingSheet;
