import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import defaultAvatar from "@/assets/avatars/defaultAvatar.png";
import Image from "next/image";
import { User } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: { image: string | null | undefined; name: string };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const avatarURL = user.image ?? defaultAvatar;

  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square size-full">
          <Image
            fill
            src={avatarURL}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <User className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
