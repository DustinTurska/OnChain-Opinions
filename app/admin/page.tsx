'use client'

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, CardBody, Spinner } from "@nextui-org/react";

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
      } else {
        router.push('/');
      }
    }
    setIsLoading(false);
  }, [account, router]);

  const fetchSurveyResponses = async () => {
    try {
      const response = await fetch('/api/survey-responses');
      if (response.ok) {
        const data = await response.json();
        setSurveyResponses(data);
      } else {
        console.error('Failed to fetch survey responses');
        setSurveyResponses([]);
      }
    } catch (error) {
      console.error('Error fetching survey responses:', error);
      setSurveyResponses([]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // or a custom unauthorized message
  }

  return (
    <div className="p-2 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <h2 className="text-xl font-semibold mb-4">Survey Responses</h2>
      
      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
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

      {/* Mobile view */}
      <div className="md:hidden">
        {surveyResponses.map((response, index) => (
          <Card key={index} className="mb-4">
            <CardBody>
              <p><strong>Address:</strong> {response.address}</p>
              <p><strong>Answer:</strong> {response.answer}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {surveyResponses.length === 0 && (
        <p className="text-center text-gray-500">No survey responses yet.</p>
      )}
    </div>
  );
}