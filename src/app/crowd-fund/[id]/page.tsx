'use client'
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/crowd-fund">Crowd Fund</BreadcrumbItem>
        <BreadcrumbItem>Detail</BreadcrumbItem>
      </Breadcrumbs>
      <div>ID: {params.id}</div>
    </>
  )
}

export default Page