"use client";
import React, { useState } from "react";
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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateAbout } from "../api-common-client/create-blog";

type Inputs = {
  title: string;
  content: string;
  image: File | null; // Added the image field
};

const AboutForm = () => {
  const [load, setLoad] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      let base64Image = null;
      if (data.image) {
        base64Image = await convertToBase64(data.image);
      }

      const payload = {
        title: data.title,
        content: data.content,
        image: base64Image,
      };

      await CreateAbout(payload);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoad(false);
      form.reset();
      setImagePreview(null);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
                      <Input placeholder="Enter about title" {...field} />
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
                        placeholder="Enter about content"
                        {...field}
                        rows={3}
                        className="block w-full rounded-md border border-gray-300 p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Field */}
              <Controller
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                        setImagePreview(
                          file ? URL.createObjectURL(file) : null
                        );
                      }}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 h-40 w-full object-cover"
                      />
                    )}
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
