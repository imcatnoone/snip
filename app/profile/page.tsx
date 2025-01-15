'use client'

import { Sidebar } from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const user = {
    username: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "I own a computer.",
    urls: []
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="w-52 border-r" />
      <div className="flex-1 flex justify-center p-8">
        <div className="max-w-[600px] w-full space-y-6">
          <div>
            <h3 className="text-lg font-medium">Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-4">
              <Card className="p-6">
                <form className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      This is how others will see you on the site.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue={user.username} />
                      <p className="text-sm text-muted-foreground">
                        This is your public display name.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Select defaultValue={user.email}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={user.email}>{user.email}</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        You can manage verified email addresses in your email settings.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={user.bio} />
                      <p className="text-sm text-muted-foreground">
                        You can @mention other users and organizations.
                      </p>
                    </div>
                  </div>
                  <Button>Update profile</Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
