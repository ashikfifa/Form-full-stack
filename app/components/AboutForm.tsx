'use client'
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Inputs = {
  title: string;
  content: string;
  image: File | null; // Added the image field
};

const AboutForm = () => {
  const [load, setLoad] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    content: z.string().min(2, {
      message: "Content must be at least 2 characters.",
    }),
    image: z.any().refine((file) => file instanceof File || file === null, {
      message: "Please provide a valid image file.",
    }), // Image validation
  });

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: null,

    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoad(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.image) {
        formData.append("image", data.image); // Include the image in the form data
      }

      // Example: Replace CreateBlog with an API call that supports FormData
      const result=await fetch('/api/image-store', {
        method: 'POST',
        body: formData,
      });
      console.log('1111111111111', result);
      
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoad(false);
      form.reset();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border p-6 w-[500px] rounded-md">
        {!load ? (
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

              {/* Image Upload Field */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          field.onChange(e.target.files ? e.target.files[0] : null)
                        }
                        className="block w-full border border-gray-300 rounded-md p-2"
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
        ) : (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutForm;
