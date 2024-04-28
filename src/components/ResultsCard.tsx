import React from "react";
import { Participants } from "./Dashboard/Participants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
  participant: Participants;
  position: number;
}

const ResultsCard = ({ participant, position }: Props) => {
  return (
    <Card className="w-96 shadow-lg shadow-secondary">
      <CardHeader>
        <CardTitle>Congratulations</CardTitle>
        <CardTitle>{participant.username}!</CardTitle>
        <CardDescription>for Securing position {position + 1} </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Score: {participant.score}</p>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
