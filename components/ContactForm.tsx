"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { AutosizeTextarea } from "@/components/ui/autosize-textarea"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import { GoArrowUpRight } from "react-icons/go"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useContactUs from "@/hooks/useContactUs"
import { Loader } from "lucide-react"
import { useTranslations } from "next-intl"

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
    notes: z
      .string()
      .trim()
      .min(1, { message: t("validation.required_field") })
  })
}

export type ContactUsRecords = z.infer<ReturnType<typeof useInputsSchema>>

const ContactForm = () => {
  const t = useTranslations()
  const inputsSchema = useInputsSchema()
  const { mutate, isPending, isError, error, isSuccess, data } = useContactUs()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ContactUsRecords>({
    resolver: zodResolver(inputsSchema)
  })

  const onSubmit: SubmitHandler<ContactUsRecords> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset() // ✅ Clear form after successful submit
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      className="lg:bg-black lg:px-6 lg:py-10 rounded-xl flex flex-col gap-5 lg:gap-7"
    >
      <div className="flex flex-col gap-2">
        <Input
          {...register("name")}
          placeholder={t("form.name")}
          className="h-[60px] bg-background rounded-full"
        />
        {errors?.name && (
          <div className="bg-destructive/10 text-destructive py-2 px-3 rounded-full text-sm">
            {errors.name?.message}
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
          className="rounded-2xl resize-none w-full bg-background lg:border-0 lg:focus:ring-0 lg:focus:outline-none lg:active:outline-none lg:focus:ring-none lg:focus-visible:outline-none lg:focus-visible:ring-none lg:focus-visible:shadow-0"
          minHeight={100}
          maxHeight={200}
          value={watch("notes")}
          onChange={(e) => {
            const newValue = e.target.value
            setValue("notes", newValue, {
              shouldDirty: true,
              shouldValidate: true
            })
          }}
        />
        {errors?.notes && (
          <div className="bg-destructive/10 text-destructive py-2 px-3 rounded-full text-sm">
            {errors.notes?.message}
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

      <div className="py-7 flex justify-center">
        <ButtonWithIcon
          type="submit"
          disabled={isPending}
          isDisabled={isPending}
          icon={
            isPending ? (
              <Loader className="animate-spin text-primary" />
            ) : (
              <GoArrowUpRight className="text-foreground" />
            )
          }
          iconClass="bg-background"
        >
          <span className="px-6 inline-block">{t("actions.send_now")}</span>
        </ButtonWithIcon>
      </div>
    </form>
  )
}

export default ContactForm
