"use client";

import React, { useState, useEffect } from "react";
import { Spacer, Button } from "@nextui-org/react";
import Survey from "../../components/Survey";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";

export default function SurveyPage() {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.push("/"); // Redirect to home if not connected
    }
  }, [account, router]);

  const handleReset = () => {
    setSurveyCompleted(false);
    setUserAnswer("");
    setError(null);
    setTransactionHash(null);
  };

  const handleSurveySubmit = async (answer: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (account) {
        // Removed for live demo purposes
        const surveyPayload = { address: account.address, answer };
        const surveyResponse = await fetch("/api/log-survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(surveyPayload),
        });

        if (!surveyResponse.ok) {
          throw new Error(`Please use vercel kv or similar for survey responses for PROD`);
        }

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

        setUserAnswer(answer);
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
  };

  if (!account) {
    return <div>Please connect your wallet to participate in the survey.</div>;
  }

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
            <Survey
              question="What's your favorite blockchain?"
              options={["Ethereum", "Solana", "Cardano", "Polkadot"]}
              onSubmit={handleSurveySubmit}
              isLoading={isLoading}
            />
          )}
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-semibold">
            Thank you for your opinion!
          </h3>
          <br />
          <h3 className="text-2xl font-semibold">
            You have been rewarded: 0.005 ETH
          </h3>
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
