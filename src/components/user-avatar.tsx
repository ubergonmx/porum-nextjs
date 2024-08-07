import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import defaultAvatar from "@/assets/avatars/defaultAvatar.png";
import Image from "next/image";
import { User as UserIcon } from "lucide-react";
import { User } from "lucia";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "avatar" | "username"> | null;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const avatarURL = user?.avatar ?? defaultAvatar;

  return (
    <Avatar {...props}>
      {user?.avatar ? (
        <div className="relative aspect-square size-full">
          <Image
            fill
            src={avatarURL}
            alt="avatar"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.username}</span>
          <UserIcon className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
