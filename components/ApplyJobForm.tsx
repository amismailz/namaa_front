"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { z } from "zod"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { Button } from "./ui/button"
import useApplyJob from "@/hooks/useApplyJob"

// schema
const useInputsSchema = () => {
  const t = useTranslations()

  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t("validation.required_field") })
      .max(255, { message: t("validation.max_char_255") }),
    phone: z
      .string()
      .trim()
      .min(1, { message: t("validation.required_field") })
      .refine((phone) => /^(\+201[0-9]{9}|01[0-9]{9})$/.test(phone), {
        message: t("validation.invalid_phone_number")
      }),
    email: z
      //  .string()
      .email({ message: t("validation.invalid_email") })
      .min(1, { message: t("validation.required_field") })
      .max(255, { message: t("validation.max_char_255") }),

    image: z
      .any()
      .refine((file) => {
        // allow no file
        if (!file || file.length === 0) return true
        // ensure it's a FileList
        return file instanceof FileList && file[0] instanceof File
      }, "Invalid file")
      .optional(),

    job_title: z.string()
  })
}

export type JobFormType = z.infer<ReturnType<typeof useInputsSchema>>

const ApplyJobForm = ({
  jobTitle,
  jobSlug,
  onClose,
  onSubmitted
}: {
  jobTitle: string
  jobSlug: string
  onClose: () => void
  onSubmitted: (text: string) => void
}) => {
  const t = useTranslations()
  const inputsSchema = useInputsSchema()
  const [serverError, setServerError] = useState<string | null>(null)

  const { mutate, isPending, isError, error, isSuccess, data } = useApplyJob()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<JobFormType>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      image: null,
      job_title: jobSlug
    },
    resolver: zodResolver(inputsSchema)
  })

  const onSubmit: SubmitHandler<JobFormType> = (data) => {
    mutate(data, {
      onSuccess: (result) => {
        if (result.errors ||result.status === "error") {
          setServerError(result?.message)
          return
        }
        toast(result.text)
        onSubmitted(result.text)
        reset() // ✅ Clear form after successful submit
      }
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className=" rounded-xl flex flex-col gap-5 lg:gap-6"
      >
        <div className="flex flex-col gap-2">
          <Input
            {...register("name")}
            placeholder={t("form.name")}
            className="h-[60px] bg-background rounded-full"
          />
          {errors?.name && (
            <div className="bg-destructive/10 text-destructive py-1 px-3 rounded-full text-sm">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            {...register("phone")}
            type="text"
            placeholder={t("form.phone")}
            className="h-[60px] bg-background rounded-full"
          />
          {errors?.phone && (
            <div className="bg-destructive/10 text-destructive py-2 px-3 rounded-full text-sm">
              {errors.phone?.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            {...register("email")}
            type="email"
            placeholder={t("form.email")}
            className="h-[60px] bg-background rounded-full"
          />
          {errors?.email && (
            <div className="bg-destructive/10 text-destructive py-2 px-3 rounded-full text-sm">
              {errors.email?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            {...register("image")}
            type="file"
            placeholder={t("form.select_cv")}
            className="h-12 py-2 bg-background rounded-full"
          />
        </div>

        {serverError && (
          <div className="flex justify-center items-center p-3 rounded-full bg-destructive">
            <p className="text-background text-sm">{serverError}</p>
          </div>
        )}

        {isError && error && (
          <div className="flex justify-center items-center p-3 rounded-full bg-destructive">
            <p className="text-destructive/5 text-sm">
              {(error as Error).message}
            </p>
          </div>
        )}

        <div className="py-7 flex gap-3 justify-start items-center">
          <Button
            disabled={isPending}
            type="submit"
            className="h-[52px] rounded-full px-6 lg:px-8"
          >
            {t("actions.send_now")}
          </Button>
          <Button
            variant="outline"
            disabled={isPending}
            type="button"
            onClick={onClose}
            className="h-[52px] rounded-full px-6 lg:px-8"
          >
            {t("actions.cancel")}
          </Button>
        </div>
      </form>

      {isPending ? (
        <div className="absolute inset-0 z-10 bg-background/70 flex justify-center items-center">
          <Loader className="animate-spin text-primary size-10" />
        </div>
      ) : null}
    </>
  )
}

export default ApplyJobForm
