"use client"

import { Suspense } from "react"
import Home from "../src/pages/index"

function HomeWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  )
}

export default function SyntheticV0PageForDeployment() {
  return <HomeWithSuspense />
}
