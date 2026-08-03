"use client";

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInWithGoogle, signupWithEmail } from "@/lib/auth-client";
import { toast } from "sonner";
import { Form, Field as FormischField, useForm } from "@formisch/react";
import * as v from "valibot";

const SignupSchema = v.pipe(
  v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your email."),
      v.email("The email address is badly formatted."),
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your password."),
      v.minLength(8, "Password must be at least 8 characters."),
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.nonEmpty("Please confirm your password."),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two passwords do not match.",
    ),
    ["confirmPassword"],
  ),
);

export function SignupForm({
  className,
  isFullPage = false,
  ...props
}: React.ComponentProps<"div"> & { isFullPage?: boolean }) {
  const signupForm = useForm({
    schema: SignupSchema,
    initialInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: "submit",
    revalidate: "change",
  });

  const handleSignupGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error && error.message) {
      toast.error(error.message);
    }
  };

  const handleSignupEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await signupWithEmail({
      callbackURL: "/setup",
      email,
      password,
    });
    if (error && error.message) {
      toast.error(error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card
        className={`overflow-hidden h-full p-0 ${isFullPage && "border-0"}`}
      >
        <CardContent className="grid p-4 h-full md:grid-cols-2">
          <Form
            of={signupForm}
            onSubmit={({ email, password }) =>
              handleSignupEmail({ email, password })
            }
            className={`p-6 md:p-8 ${isFullPage && "space-y-4 max-w-md w-full place-self-center"}`}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <FormischField of={signupForm} path={["email"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      className="h-10"
                      type="email"
                      placeholder="juandelacruz@example.com"
                      required
                      aria-invalid={field.errors !== null}
                      {...field.props}
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your
                      email with anyone else.
                    </FieldDescription>
                  </Field>
                )}
              </FormischField>
              <FormischField of={signupForm} path={["password"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      className="h-10"
                      required
                      aria-invalid={field.errors !== null}
                      {...field.props}
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                  </Field>
                )}
              </FormischField>
              <FormischField of={signupForm} path={["confirmPassword"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="h-10"
                      required
                      aria-invalid={field.errors !== null}
                      {...field.props}
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
              <Field>
                <Button type="submit" size={"lg"}>
                  Create Account
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="flex w-full">
                <Button
                  onClick={handleSignupGoogle}
                  variant="outline"
                  className={"w-full"}
                  size={"lg"}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Login</a>
              </FieldDescription>
            </FieldGroup>
            {isFullPage && (
              <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </FieldDescription>
            )}
          </Form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/auth-design-6.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover "
            />
          </div>
        </CardContent>
      </Card>
      {!isFullPage && (
        <FieldDescription className="px-6 text-white text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      )}
    </div>
  );
}
