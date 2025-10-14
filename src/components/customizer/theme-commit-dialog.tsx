"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

export type CommitAuthorFormState = {
  name: string;
  email: string;
};

export type ThemeCommitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  message: string;
  onMessageChange: (value: string) => void;
  author: CommitAuthorFormState;
  onAuthorChange: (author: CommitAuthorFormState) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  error?: string | null;
  messageReadOnly?: boolean;
};

export function ThemeCommitDialog({
  open,
  onOpenChange,
  title = "Save theme",
  description = "Provide details for this commit. Author information will be remembered for future saves.",
  message,
  onMessageChange,
  author,
  onAuthorChange,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save",
  error,
  messageReadOnly = false,
}: ThemeCommitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="commit-message">Commit message</Label>
            <Textarea
              id="commit-message"
              value={message}
              onChange={(event) => onMessageChange(event.target.value)}
              placeholder="Describe your changes"
              className="min-h-[96px]"
              required
              readOnly={messageReadOnly}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="commit-author-name">Author name</Label>
              <Input
                id="commit-author-name"
                value={author.name}
                onChange={(event) =>
                  onAuthorChange({ ...author, name: event.target.value })
                }
                placeholder="Ada Lovelace"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commit-author-email">Author email</Label>
              <Input
                id="commit-author-email"
                type="email"
                value={author.email}
                onChange={(event) =>
                  onAuthorChange({ ...author, email: event.target.value })
                }
                placeholder="ada@example.com"
              />
            </div>
          </div>

          {error ? (
            <p className="text-destructive text-sm" role="alert">
              {error}
            </p>
          ) : null}

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
