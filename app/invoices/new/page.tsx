"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAction } from "@/app/actions";
import { SyntheticEvent, useState } from "react";
import Form from "next/form";
import Container from "@/components/Container";
export default function Home() {
  const [isReady, setIsReady] = useState(true);
  const handleOnSubmit = async (event: SyntheticEvent) => {
    if (isReady) {
      event.preventDefault();
      return;
    }
    setIsReady(false);
    // const target = event.target as HTMLFormElement;
    // const formData = new FormData(target)
    // await createAction(formData)
    // console.log("Hye")
  };

  return (
    <main className="h-full ">
      <Container>

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold">Create Invoice</h1>
      </div>
      <Form
        action={createAction}
        onSubmit={() => handleOnSubmit}
        className="grid gap-4 max-w-xs text-left"
      >
        <div>
          <Label htmlFor="name" className="block font-semibold text-sm mb-2">
            Billing name
          </Label>
          <Input type="text" name="name" id="name" />
        </div>
        <div>
          <Label htmlFor="email" className="block font-semibold text-sm mb-2">
            Billing Email
          </Label>
          <Input type="email" name="email" id="email" />
        </div>
        <div>
          <Label htmlFor="value" className="block font-semibold text-sm mb-2">
            Value
          </Label>
          <Input type="text" name="value" id="value" />
        </div>

        <div>
          <Label
            htmlFor="description"
            className="block font-semibold text-sm mb-2"
          >
            Description
          </Label>
          <Textarea name="description" id="description"></Textarea>
        </div>

        <div>
          <Button className="w-full font-semibold">Submit</Button>
        </div>
      </Form>
      </Container>

    </main>
  );
}
