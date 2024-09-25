'use client'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

const Page = () => {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/crowd-fund">Crowd Fund</BreadcrumbItem>
        <BreadcrumbItem>Detail</BreadcrumbItem>
      </Breadcrumbs>
    </>
  )
}

export default Page