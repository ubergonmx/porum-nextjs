import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import Image from "next/image";

interface UserAvatarProps extends AvatarProps {
  user: { image: string; name: string };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const avatarURL = user ? `/avatars/${user.image}` : "/avatars/default.png";

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
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
