"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { alertCall } from "@/lib/toast/alertCall";

interface Props {
  compId: string;
}

const ParticipateButton: FC<Props> = ({ compId }) => {
  const [loading, setLoading] = useState(false);
  const participateComp = trpc.comp.participate.useMutation();

  const participate = async () => {
    try {
      setLoading(true);
      await participateComp.mutateAsync(
        {
          compId,
        },
        {
          onSuccess: () => {
            setLoading(false);
            alertCall("success", "Registered successfully");
          },
          onError: (err) => {
            if (err.data?.code === "PRECONDITION_FAILED") {
              setLoading(false);
              alertCall("error", "Some error Ocurred!");
            }
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        disabled={loading}
        onClick={() => participate()}
        className="btn btn-secondary btn-wide shadow-lg mb-10"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Participate
      </Button>
    </>
  );
};

export default ParticipateButton;
