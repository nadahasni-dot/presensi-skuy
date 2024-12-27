import React from "react";
import Container from "../Container";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SECURE_CODE } from "@/config/config";
import { toast } from "sonner";

interface SecureCheckProps {
  onCheck: (allowed: boolean) => void;
}

export default function SecureCheck({ onCheck }: Readonly<SecureCheckProps>) {
  const [code, setCode] = React.useState("");

  const validateCode: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (code !== SECURE_CODE) {
      onCheck(false);
      setCode("");
      toast.error("😔 Sorry, you entered the wrong code.");
      return;
    }

    toast.success("😃 Welcome!");
    onCheck(true);
  };

  return (
    <Container className="flex bg-slate-100 min-h-screen flex-col justify-center">
      <form onSubmit={validateCode}>
        <Card>
          <CardHeader>
            <CardTitle>Secure Checking</CardTitle>
            <CardDescription>
              Please enter valid code to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="secure_code">Secure Code</Label>
                <Input
                  required
                  id="secure_code"
                  type="password"
                  placeholder="Please enter the secure code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-grow">
            <Button className="w-full">Validate</Button>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}
