"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { CloudUpload, Paperclip } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { getBase64String } from "@/components/data/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "@/actions/employee/employee";
import { returnErrorMessage } from "@/data/returnErrorMessage";
import { companyPositonInfo } from "@/app/(branch)/_data";
import { customToast } from "@/components/shared/ToastContainer";

const formSchema = z.object({
  name_9544990989: z.string().optional(),
  name_9960351393: z.string(),
  name_1380821614: z.string(),
  name_8946578421: z.string().min(11).max(11),
  name_9392361282: z.string(),
  name_5459613867: z.string(),
  name_6331645617: z.string(),
});

export default function EmployeeForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[] | null>(null);

  // create employee
  const { isPending, mutate } = useMutation({
    mutationFn: createEmployee,
    onSuccess: async ({ message }) => {
      if (message) {
        closeModal();
        await queryClient.invalidateQueries({ queryKey: ["employees"] });
        return customToast("success", message);
      }
    },
  });

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files?.length === 1) {
      let formdata = new FormData();

      let imgString = await getBase64String(files[0]);

      formdata.append("imgFile", imgString);
      formdata.append("fullName", values.name_9960351393);
      formdata.append("fatherName", values.name_1380821614);
      formdata.append("contactNo", values.name_8946578421);
      formdata.append("address", values.name_9392361282);
      formdata.append("position", values.name_5459613867);
      formdata.append("salery", values.name_6331645617);

      mutate(formdata);
    } else {
      alert("Please select a Image");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1 w-full  py-5"
      >
        <FormField
          control={form.control}
          name="name_9544990989"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  {files?.length !== 1 && (
                    <FileInput
                      id="fileInput"
                      className="outline-dashed outline-1 outline-slate-500"
                    >
                      <div className="flex items-center justify-center flex-col p-8 w-full ">
                        <CloudUpload className="text-gray-500 w-10 h-10" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </FileInput>
                  )}
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Select a image of the employee</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="">
          <div>
            <FormField
              control={form.control}
              name="name_9960351393"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter full name of the employee
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name_1380821614"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father Name</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormDescription>
                Enter father name of the employee
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_8946578421"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact No.</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>
              <FormDescription>
                Contact number for farther communication.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_9392361282"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>The address of the employee</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_5459613867"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companyPositonInfo.map((item, i) => {
                    return (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                The position of the employee that you are offering
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_6331645617"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>
              <FormDescription>
                The initial salary that you are offering
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isPending} type="submit">
            {isPending ? "Submiting" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
