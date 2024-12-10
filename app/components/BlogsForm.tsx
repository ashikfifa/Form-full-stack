'use client';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, SubmitHandler } from "react-hook-form"

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className=" border">
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
              <FormDescription>
                The title of your blog post.
              </FormDescription>
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
                <Input
                  placeholder="Enter blog content"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The main content of your blog post.
              </FormDescription>
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
  );
}
