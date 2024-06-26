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

interface Props {
  comp: any;
}

const JudgeEditor = ({ comp }: Props) => {
  return (
    <main className="w-full">
      <Dialog>
        <DialogTrigger className="w-full mx-auto my-4">
          <Button className="w-60">Add Judge</Button>
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
