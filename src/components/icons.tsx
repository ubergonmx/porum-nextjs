import { forwardRef, type SVGProps } from "react";
import { cn } from "@/lib/utils";
import { LucideProps, User, MessageSquare } from "lucide-react";

const AnimatedSpinner = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn(className)}
    >
      <g className="animated-spinner">
        <rect x="11" y="1" width="2" height="5" opacity=".14" />
        <rect
          x="11"
          y="1"
          width="2"
          height="5"
          transform="rotate(30 12 12)"
          opacity=".29"
        />
        <rect
          x="11"
          y="1"
          width="2"
          height="5"
          transform="rotate(60 12 12)"
          opacity=".43"
        />
        <rect
          x="11"
          y="1"
          width="2"
          height="5"
          transform="rotate(90 12 12)"
          opacity=".57"
        />
        <rect
          x="11"
          y="1"
          width="2"
          height="5"
          transform="rotate(120 12 12)"
          opacity=".71"
        />
        <rect
          x="11"
          y="1"
          width="2"
          height="5"
          transform="rotate(150 12 12)"
          opacity=".86"
        />
        <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" />
      </g>
    </svg>
  ),
);
AnimatedSpinner.displayName = "AnimatedSpinner";

export { AnimatedSpinner };

export { Eye as EyeOpenIcon, EyeOff as EyeCloseIcon } from "lucide-react";

export const Icons = {
  user: User,
  logo: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 497 497">
      <g>
        <path
          d="m392 30c-71.75 0-71.75-30-143.5-30l128.5 497h30c33.137 0 60-26.863 60-60v-228.526c18.555-18.938 30-44.867 30-73.474 0-57.99-47.01-105-105-105z"
          fill="#c87044"
        />
        <path
          d="m437 437-45-377c-41.895 0-63.904-18.405-83.322-34.644-16.942-14.167-30.323-25.356-60.178-25.356-71.75 0-71.75 30-143.5 30-57.99 0-105 47.01-105 105 0 28.607 11.445 54.537 30 73.474v228.526c0 33.137 26.863 60 60 60h287c33.137 0 60-26.863 60-60z"
          fill="#db905a"
        />
        <path
          d="m392 60-15 407h30c16.542 0 30-13.458 30-30v-228.526c0-7.851 3.077-15.388 8.571-20.996 13.819-14.103 21.429-32.74 21.429-52.478 0-41.355-33.645-75-75-75z"
          fill="#ffd185"
        />
        <path
          d="m407 437v-228.526c0-15.796 6.088-30.708 17.143-41.991 8.291-8.462 12.857-19.643 12.857-31.483 0-41.355-20.187-75-45-75-41.895 0-63.904-9.203-83.322-17.322-16.942-7.083-30.323-12.678-60.178-12.678-29.856 0-43.236 5.595-60.177 12.678-19.419 8.119-41.429 17.322-83.323 17.322-41.355 0-75 33.645-75 75 0 19.738 7.61 38.375 21.429 52.479 5.494 5.607 8.571 13.145 8.571 20.995v228.526c0 16.542 13.458 30 30 30h287c16.542 0 30-13.458 30-30z"
          fill="#ffe8c2"
        />
        <g fill="#ffd185">
          <circle cx="392" cy="135" r="7.5" />
          <circle cx="362" cy="165" r="7.5" />
          <circle cx="105" cy="377" r="7.5" />
          <circle cx="135" cy="407" r="7.5" />
          <circle cx="105" cy="135" r="7.5" />
        </g>
      </g>
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
  commentReply: MessageSquare,
};
