"use client";

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
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateBlog } from "../api-common-client/create-blog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

// Define form input types
type Inputs = {
  title: string;
  content: string;
};

export default function Blogsform() {
  const form = useForm<Inputs>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await CreateBlog(data?.title, data?.content);
      setAlert({
        type: "success",
        message: "Blog is successfully created!",
      });
    } catch (error: any) {
      console.log(error);
      setAlert({
        type: "error",
        message: error.response?.data || "Failed to create blog",
      });
    }
  };

  return (
    <div className=" flex items-center justify-center mt-20">
      <div className=" border p-6 w-[500px] rounded-md">
        {alert && (
          <Alert variant={alert.type === "error" ? "destructive" : "default"}>
            {alert.type === "error" && <AlertCircle className="h-4 w-4" />}
            <AlertTitle>
              {alert.type === "success" ? "Heads up!" : "Error"}
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-md mx-auto"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content Field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Enter blog content"
                      {...field}
                      rows={3}
                      className="block w-full rounded-md border border-gray-300 p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
