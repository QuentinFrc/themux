"use client";

import { Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupItem,
  InputGroupText,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

export function InputGroupDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupItem>
          <Input placeholder="themux.vercel.app" />
        </InputGroupItem>
        <InputGroupButton>
          <Button size="sm" variant="secondary">
            Check
          </Button>
        </InputGroupButton>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>
        <InputGroupItem>
          <Input placeholder="Search components" />
        </InputGroupItem>
        <InputGroupText>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupText>
      </InputGroup>

      <InputGroup>
        <InputGroupItem>
          <Input placeholder="Invite with email" type="email" />
        </InputGroupItem>
        <InputGroupButton>
          <Button size="sm">
            <Share2 className="mr-2 size-4" />
            Share link
          </Button>
        </InputGroupButton>
      </InputGroup>
    </div>
  );
}
