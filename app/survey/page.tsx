"use client";

import React, { useState, useEffect } from "react";
import { Spacer, Button, Progress } from "@nextui-org/react";
import Survey from "../../components/Survey";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";

export default function SurveyPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const account = useActiveAccount();
  const router = useRouter();
  const surveyQuestions = [
    {
      question: "What's your favorite blockchain?",
      options: ["Ethereum", "Solana", "Cardano", "Polkadot"],
    },
    {
      question: "How long have you been involved in crypto?",
      options: ["Less than a year", "1-3 years", "3-5 years", "More than 5 years"],
    },
    {
      question: "What's your primary interest in blockchain?",
      options: ["Investment", "Technology", "Decentralization", "Other"],
    },
  ];
  

  useEffect(() => {
    if (!account) {
      router.push("/");
    }
  }, [account, router]);

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSurveyCompleted(false);
    setError(null);
    setTransactionHash(null);
  };

  const handleSurveySubmit = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLoading(true);
      setError(null);
      try {
        if (account) {
          // Send transaction
          const transactionPayload = {
            data: [
              {
                toAddress: account.address,
                amount: "5000000000000000", // 0.005 ETH in wei
              },
            ],
          };
          const transactionResponse = await fetch("/api/sendTransaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transactionPayload),
          });

          if (!transactionResponse.ok) {
            throw new Error(
              `Transaction error! status: ${transactionResponse.status}`
            );
          }

          const transactionData = await transactionResponse.json();
          setTransactionHash(transactionData[0].transactionHash);

          setSurveyCompleted(true);
        } else {
          throw new Error("No active account found");
        }
      } catch (error) {
        console.error("Error submitting survey:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!account) {
    return <div>Please connect your wallet to participate in the survey.</div>;
  }

  const progress = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;

  return (
    <div className="text-center">
      <Spacer y={2} />
      {!surveyCompleted ? (
        <div className="flex flex-col items-center">
          {isLoading ? (
            <>
              <Spinner size="lg" />
              <p className="mt-4">Processing your submission...</p>
            </>
          ) : (
            <>
              <Survey
                question={surveyQuestions[currentQuestionIndex].question}
                options={surveyQuestions[currentQuestionIndex].options}
                onSubmit={handleSurveySubmit}
                isLoading={isLoading}
                isLastQuestion={currentQuestionIndex === surveyQuestions.length - 1}
              />
              <Spacer y={2} />
              <Progress
                aria-label="Survey progress"
                value={progress}
                className="max-w-md"
              />
              <p className="mt-2">Question {currentQuestionIndex + 1} of {surveyQuestions.length}</p>
            </>
          )}
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-semibold">
            Thank you for completing the survey!
          </h3>
          <br />
          <h3 className="text-2xl font-semibold">You have been rewarded: 0.005 ETH</h3>
          <br />
          {transactionHash && (
            <p>
              Transaction Hash:
              <a
                href={`https://holesky.beaconcha.in/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {transactionHash.substring(0, 10)}...
                {transactionHash.substring(transactionHash.length - 10)}
              </a>
            </p>
          )}
          <br />
          <Spacer y={2} />
          <Button onClick={handleReset}>Take Another Survey</Button>
        </>
      )}
      {error && <div className="text-red-500 mt-4">Error: {error}</div>}
    </div>
  );
}