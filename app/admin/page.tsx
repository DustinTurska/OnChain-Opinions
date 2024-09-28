'use client'

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const ADMIN_ADDRESS = '0x829d9E61EFb24636Ec631446859CF5c5D210f919';

interface SurveyResponse {
  timestamp: string;
  address: string;
  answer: string;
}

export default function AdminPage() {
  const account = useActiveAccount();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    if (account) {
      const adminStatus = account.address.toLowerCase() === ADMIN_ADDRESS.toLowerCase();
      setIsAdmin(adminStatus);
      if (adminStatus) {
        fetchSurveyResponses();
      }
    }
    setIsLoading(false);
  }, [account]);

  const fetchSurveyResponses = async () => {
  try {
    const response = await fetch('/api/survey-responses');
    if (response.ok) {
      const data = await response.json();
      setSurveyResponses(data);
    } else {
      console.error('Failed to fetch survey responses');
      setSurveyResponses([]); // Set to empty array on error
    }
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    setSurveyResponses([]); // Set to empty array on error
  }
};

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-2">Survey Responses</h2>
      <Table aria-label="Survey responses">
        <TableHeader>
          <TableColumn>Timestamp</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Answer</TableColumn>
        </TableHeader>
        <TableBody>
          {surveyResponses.map((response, index) => (
            <TableRow key={index}>
              <TableCell>{response.timestamp}</TableCell>
              <TableCell>{response.address}</TableCell>
              <TableCell>{response.answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}