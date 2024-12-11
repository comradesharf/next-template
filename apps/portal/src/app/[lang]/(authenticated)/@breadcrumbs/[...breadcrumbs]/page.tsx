import Link from "next/link";
import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "#app/_components/breadcrumb.tsx";

export interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ lang: string; breadcrumbs: string[] }>;
}

export default async function Page(props: PageProps) {
    const {
        breadcrumbs: [_lang, ...breadcrumbs],
    } = await props.params;
    const trunks = breadcrumbs.slice(0, -1);
    const last = breadcrumbs.at(-1);

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {trunks.map((trunk) => (
                    <Fragment key={`${trunk}`}>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="capitalize" asChild>
                                <Link href=".">
                                    {trunk.replaceAll("-", " ")}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </Fragment>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize">
                        {last?.replaceAll("-", " ")}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
