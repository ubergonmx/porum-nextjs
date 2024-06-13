"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/phone-input";
import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import { signupSchema, SignupInput } from "@/lib/validators/auth";
import { signup } from "./actions";
import { useState, useTransition } from "react";
type FormFieldKey =
  | "firstName"
  | "lastName"
  | "username"
  | "email"
  | "password"
  | "phone";
export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [signupError, setSignupError] = useState<string | null>(null);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  function onSubmit(values: SignupInput) {
    startTransition(() => {
      setSignupError(null);
      signup(values).then((result) => {
        if (result?.fieldError) {
          Object.entries(result.fieldError).forEach(([field, message]) => {
            form.setError(field as FormFieldKey, {
              type: "manual",
              message,
            });
          });
        }
        if (result?.formError) setSignupError(result.formError);
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dela Cruz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jdcruz" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Phone Number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput placeholder="Enter a phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {signupError && (
          <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
            {signupError}
          </p>
        )}
        <div>
          <Link href={"/login"}>
            <span className="p-0 text-xs font-medium underline-offset-4 hover:underline">
              Already signed up? Login instead.
            </span>
          </Link>
        </div>
        <SubmitButton className="w-full" loading={isPending}>
          Sign Up
        </SubmitButton>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Cancel</Link>
        </Button>
      </form>
    </Form>
  );
}
