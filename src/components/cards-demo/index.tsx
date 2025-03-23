import { CardsActivityGoal } from "@/components/cards-demo/activity-goal";
import { CardsCalendar } from "@/components/cards-demo/calendar";
import { CardsChat } from "@/components/cards-demo/chat";
import { CardsCookieSettings } from "@/components/cards-demo/cookie-settings";
import { CardsCreateAccount } from "@/components/cards-demo/create-account";
import { CardsDataTable } from "@/components/cards-demo/data-table";
import { CardsMetric } from "@/components/cards-demo/metric";
import { CardsPaymentMethod } from "@/components/cards-demo/payment-method";
import { CardsReportIssue } from "@/components/cards-demo/report-issue";
import { CardsShare } from "@/components/cards-demo/share";
import { CardsStats } from "@/components/cards-demo/stats";
import { CardsTeamMembers } from "@/components/cards-demo/team-members";

export function CardsDemo() {
  return (
    <div className="md:grid-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
      <div className="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
        <CardsStats />
        <div className="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden">
          <CardsCalendar />
          <div className="pt-3 sm:pt-0 sm:pl-2 xl:pl-4">
            <CardsActivityGoal />
          </div>
          <div className="pt-3 sm:col-span-2 xl:pt-4">
            <CardsMetric />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="space-y-4 xl:space-y-4">
            <CardsTeamMembers />
            <CardsCookieSettings />
            <CardsPaymentMethod />
          </div>
          <div className="space-y-4 xl:space-y-4">
            <CardsChat />
            <CardsCreateAccount />
            <div className="hidden xl:block">
              <CardsReportIssue />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
        <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
          <CardsCalendar />
          <div className="pt-3 sm:pt-0 sm:pl-2 xl:pl-3">
            <CardsActivityGoal />
          </div>
          <div className="pt-3 sm:col-span-2 xl:pt-3">
            <CardsMetric />
          </div>
        </div>
        <div className="hidden md:block">
          <CardsDataTable />
        </div>
        <CardsShare />
        <div className="xl:hidden">
          <CardsReportIssue />
        </div>
      </div>
    </div>
  );
}
