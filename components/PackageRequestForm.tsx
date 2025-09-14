"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { AutosizeTextarea } from "@/components/ui/autosize-textarea"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import { GoArrowUpRight } from "react-icons/go"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { z } from "zod"
import { useTranslations } from "next-intl"
import usePackageRequest from "@/hooks/usePackageRequest"
import { toast } from "sonner"
import { Button } from "./ui/button"

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
    message: z
      .string()
      .trim()
      .min(1, { message: t("validation.required_field") }),
    hosting_plan: z.string()
  })
}

export type PackageFormType = z.infer<ReturnType<typeof useInputsSchema>>

const PackageRequestForm = ({
  packageName,
  onSubmitted,
  onClose
}: {
  packageName: string
  onSubmitted: (text: string) => void
  onClose: () => void
}) => {
  const t = useTranslations()
  const inputsSchema = useInputsSchema()

  const { mutate, isPending, isError, error, isSuccess, data } =
    usePackageRequest()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<PackageFormType>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      hosting_plan: packageName
    },
    resolver: zodResolver(inputsSchema)
  })

  const onSubmit: SubmitHandler<PackageFormType> = (data) => {
    mutate(data, {
      onSuccess: (result) => {
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
        className="py-5 rounded-xl flex flex-col gap-5 lg:gap-6"
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
          <AutosizeTextarea
            placeholder={t("form.message")}
            className="rounded-2xl resize-none w-full bg-background focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            minHeight={100}
            maxHeight={200}
            value={watch("message")}
            onChange={(e) => {
              const newValue = e.target.value
              setValue("message", newValue, {
                shouldDirty: true,
                shouldValidate: true
              })
            }}
          />
          {errors?.message && (
            <div className="bg-destructive/10 text-destructive py-2 px-3 rounded-full text-sm">
              {errors.message?.message}
            </div>
          )}
        </div>

        {isError && (
          <div className="flex justify-center items-center p-3 rounded-full bg-destructive">
            <p className="text-destructive/5 text-sm">
              {(error as Error).message}
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="flex justify-center items-center p-3 rounded-full bg-green-700">
            <p className="text-green-200 text-sm">{data.text}</p>
          </div>
        )}

        <div className="py-7 flex gap-3 justify-start items-center">
          <Button
            disabled={isPending}
            type="submit"
            className="h-[52px] rounded-full px-6"
          >
            {t("actions.send_now")}
          </Button>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={onClose}
            type="button"
            className="h-[52px] rounded-full px-6"
          >
            {t("actions.cancel")}
          </Button>
        </div>
      </form>

      {isPending ? (
        <div className="absolute inset-0 z-10 bg-background/70 flex justify-center items-center">
          <Loader className="animate-spin text-primary size-6" />
        </div>
      ) : null}
    </>
  )
}

export default PackageRequestForm
