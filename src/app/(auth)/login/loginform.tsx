"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { loginSchema, SignupInput } from "@/lib/validators/auth";
import { login } from "./actions";

export default function LogInForm() {
  const [state, formAction] = useFormState(login, null);

  const form = useForm<SignupInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignupInput) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action={formAction}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="juandelacruz@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="current-password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.fieldError ? (
          <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
            {Object.values(state.fieldError).map((err) => (
              <li className="ml-4" key={err}>
                {err}
              </li>
            ))}
          </ul>
        ) : state?.formError ? (
          <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
            {state?.formError}
          </p>
        ) : null}
        <div>
          <Link href={"/signup"}>
            <span className="p-0 text-xs font-medium underline-offset-4 hover:underline">
              Don&apos;t have an account yet? Sign up instead.
            </span>
          </Link>
        </div>
        <SubmitButton className="w-full">Log In</SubmitButton>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Cancel</Link>
        </Button>
      </form>
    </Form>
  );
}
