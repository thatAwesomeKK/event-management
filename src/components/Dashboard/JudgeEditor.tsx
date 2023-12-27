import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CreateJudge from "../Forms/CreateJudge";
import { Comp } from "@prisma/client";

interface Props {
  comp: Comp;
}

const JudgeEditor = ({ comp }: Props) => {
  return (
    <main>
      <Dialog>
        <DialogTrigger>
          <Button>Add Judge</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Judge</DialogTitle>
            <DialogDescription>Make a Judges ID and Password</DialogDescription>
          </DialogHeader>
          <CreateJudge compId={comp.id} />
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default JudgeEditor;
