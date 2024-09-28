"use client";

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { title } from "@/components/primitives";

export default function ProfilePage() {
  return (
    <div>
      <h1 className={title()}>Profile</h1>
    </div>
  );
}