import React from "react";
import { Participants } from "./Dashboard/Participants";
import ResultsCard from "./ResultsCard";

interface Props {
  participants: Participants[];
}

const Results = ({ participants }: Props) => {
  participants.sort(function (a: any, b: any) {
    return b.score - a.score;
  });
  const top3Participants = participants.slice(0, 3);

  return (
    <div className="flex justify-center items-center gap-10 mb-10">
      {top3Participants.map((participant, index) => {
        return (
          <ResultsCard key={index} position={index} participant={participant} />
        );
      })}
    </div>
  );
};

export default Results;
