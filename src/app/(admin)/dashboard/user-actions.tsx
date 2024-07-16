"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Delete, Edit } from "lucide-react";
import React, { useState } from "react";

interface UserActionsProps {
  userId: string;
  username: string;
}

export default function UserActions({ userId, username }: UserActionsProps) {
  const [editUserId, setEditUserId] = useState<string>("");
  const [deleteUserId, setDeleteUserId] = useState<string>("");

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserId(e.target.value);
  };

  const handleDeleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteUserId(e.target.value);
  };

  return (
    // Provide options to edit or delete user
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Edit className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <h2>{username}</h2>
            <DialogDescription>
              Update user {userId} information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="Unnamed User"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userId" className="text-right">
                Confirm user ID
              </Label>
              <Input
                id="userId"
                value={editUserId}
                placeholder="Type user ID to confirm"
                className="col-span-3"
                onChange={handleEditChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={editUserId !== userId}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Delete className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <h2>{username}</h2>
            <DialogDescription>
              Delete user {userId} information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userId" className="text-right">
                Confirm user ID
              </Label>
              <Input
                id="userId"
                value={deleteUserId}
                placeholder="Type user ID to confirm"
                className="col-span-3"
                onChange={handleDeleteChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              type="submit"
              disabled={deleteUserId !== userId}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
