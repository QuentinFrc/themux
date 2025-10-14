import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <div className="flex @3xl:flex-row flex-col @3xl:items-start items-center gap-6">
      <Tabs className="max-w-[400px]" defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input defaultValue="Pedro Duarte" id="tabs-demo-name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input defaultValue="@peduarte" id="tabs-demo-username" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex @max-3xl:w-full flex-col items-start @3xl:justify-start gap-6">
        <Tabs className="@max-3xl:w-full" defaultValue="home">
          <TabsList className="@max-3xl:w-full">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs className="@max-3xl:w-full" defaultValue="home">
          <TabsList className="@max-3xl:w-full">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger disabled value="settings">
              Disabled
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs className="@max-3xl:w-full" defaultValue="preview">
          <TabsList className="@max-3xl:w-full">
            <TabsTrigger value="preview">
              <AppWindowIcon />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code">
              <CodeIcon />
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
