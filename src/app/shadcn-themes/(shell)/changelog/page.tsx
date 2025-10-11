import { Metadata } from "next";
import { format } from "date-fns";

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/wrappers";
import { db } from "@/database/drizzle/client";
import { createThemeVersionRepository } from "@/database/repositories/theme-repository";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Track every commit made to your themes, including authorship and timestamps.",
};

export default async function ChangelogPage() {
  const repository = createThemeVersionRepository(db);
  const commits = await repository.listCommits();

  return (
    <>
      <ContainerWrapper withCane className="@container py-4">
        <SectionWrapper>
          <PageHeader>
            <PageHeaderHeading>Changelog</PageHeaderHeading>
            <PageHeaderDescription>
              Explore the complete history of commits along with their authors and timestamps.
            </PageHeaderDescription>
          </PageHeader>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper withCane className="py-6">
        <div className="space-y-4">
          {commits.length ? (
            <div className="divide-border rounded-lg border">
              {commits.map((commit) => (
                <div
                  key={commit.hash}
                  className="bg-card/50 flex flex-col gap-3 border-b p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold leading-tight">
                        {commit.message}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        #{commit.hash.slice(0, 7)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {commit.author.name}
                      {commit.author.email ? ` · ${commit.author.email}` : ""}
                    </p>
                    {commit.theme ? (
                      <p className="text-muted-foreground text-xs">
                        Theme: <span className="font-medium capitalize">{commit.theme.name}</span>
                      </p>
                    ) : null}
                  </div>

                  <time className="text-muted-foreground text-sm">
                    {format(commit.createdAt, "PPpp")}
                  </time>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-center text-sm">
              No commits have been recorded yet.
            </div>
          )}
        </div>
      </ContainerWrapper>
    </>
  );
}
