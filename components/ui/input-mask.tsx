"use client"

import { IMaskMixin } from "react-imask"

import { Input } from "./input"

export const InputMask = IMaskMixin(({ inputRef, ...props }) => (
  <Input ref={inputRef as any} {...props} />
))
