"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { AutosizeTextarea } from "@/components/ui/autosize-textarea"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useTranslations } from "next-intl"
import useRequestService from "@/hooks/useRequestService"
import { toast } from "sonner"
import { z } from "zod"
import { MultiSelect } from "@/components/ui/mult-select"
import useGetServicesLabels from "@/hooks/useGetServicesLabels"
import { Skeleton } from "@/components/ui/skeleton"
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
    description: z
      .string()
      .trim()
      .min(1, { message: t("validation.required_field") }),
    goal: z
      .array(
        z
          .string()
          .trim()
          .min(1, { message: t("validation.required_goals") })
      )
      .nonempty({ message: t("validation.min_goals") })
  })
}

export type RequestFormType = z.infer<ReturnType<typeof useInputsSchema>>

const ServiceRequestForm = ({
  onSubmitted,
  onClose
}: {
  onSubmitted: (text: string) => void
  onClose: () => void
}) => {
  const t = useTranslations()
  const inputsSchema = useInputsSchema()
  const { mutate, isPending, isError, error } = useRequestService()

  const { data: servicesLabels, isLoading } = useGetServicesLabels()

  const [selected, setSelected] = useState<string[] | undefined>(undefined)

  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<RequestFormType>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      description: "",
      goal: []
    },
    resolver: zodResolver(inputsSchema)
  })

  const onSubmit: SubmitHandler<RequestFormType> = (data) => {
    mutate(data, {
      onSuccess: (result) => {
        if (result.errors) {
          setServerError(result.message)
        } else {
          toast(result.text)
          onSubmitted(result.text || result.mesage)
          reset() // ✅ Clear form after successful submit
        }
      }
    })
  }


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="p-6 rounded-xl flex flex-col gap-5 lg:gap-6"
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
          {isLoading ? (
            <Skeleton className="w-full h-[60px] rounded-full" />
          ) : (
            <MultiSelect
              options={servicesLabels}
              defaultValue={selected}
              onValueChange={(items) => {
                setValue("goal", items, {
                  shouldDirty: true,
                  shouldValidate: true
                })
                setSelected(items)
              }}
              placeholder={t("form.select_services")}
              variant="secondary"
              autoSize={true}
              modalPopover={true}
              maxCount={2}
              className="min-h-[60px] bg-background rounded-full"
            />
          )}

          {errors?.goal && (
            <div className="bg-destructive/10 text-destructive py-2 px-3 rounded-full text-sm">
              {errors.goal?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <AutosizeTextarea
            placeholder={t("form.message")}
            className="rounded-2xl resize-none w-full bg-background focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            minHeight={100}
            maxHeight={200}
            value={watch("description")}
            onChange={(e) => {
              const newValue = e.target.value
              setValue("description", newValue, {
                shouldDirty: true,
                shouldValidate: true
              })
            }}
          />
          {errors?.description && (
            <div className="bg-destructive/10 text-destructive py-2 px-3 rounded-full text-sm">
              {errors.description?.message}
            </div>
          )}
        </div>

        {isError || serverError ? (
          <div className="space-y-5">
            {isError && (
              <div className="flex justify-center items-center p-3 rounded-full bg-destructive/5">
                <p className="text-destructive text-sm">
                  {(error as Error).message}
                </p>
              </div>
            )}

            {serverError && (
              <div className="flex justify-center items-center p-3 rounded-full bg-destructive/5">
                <p className="text-destructive text-sm">{serverError}</p>
              </div>
            )}
          </div>
        ) : null}

        <div className="py-7 flex gap-3 justify-end items-center">
          <Button
            type="button"
            variant="secondary"
            className="h-[52px] rounded-full"
            disabled={isPending}
            data-dismiss="dialog"
            data-role="close dialog"
            onClick={onClose}
          >
            <span className="px-6 inline-block">{t("actions.cancel")}</span>
          </Button>
          <Button
            type="submit"
            className="h-[52px] rounded-full"
            disabled={isPending}
          >
            <span className="px-6 inline-block">{t("actions.send_now")}</span>
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

export default ServiceRequestForm
