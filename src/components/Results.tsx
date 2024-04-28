import React from "react";
import { Participants } from "./Dashboard/Participants";
import ResultsCard from "./ResultsCard";

interface Props {
  participants: Participants[];
}

const Results = ({ participants }: Props) => {
  participants = participants.sort(function (a: any, b: any) {
    return b.score - a.score;
  });

  return (
    <div className="flex justify-center items-center gap-10 mb-10">
      {participants.map((participant, index) => {
        if (index === 3) return;
        return (
          <ResultsCard key={index} position={index} participant={participant} />
        );
      })}
    </div>
  );
};

export default Results;
