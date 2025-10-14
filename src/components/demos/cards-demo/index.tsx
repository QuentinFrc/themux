import { CardsActivityGoal } from "@/components/demos/cards-demo/activity-goal";
import { CardsCalendar } from "@/components/demos/cards-demo/calendar";
import { CardsChat } from "@/components/demos/cards-demo/chat";
import { CardsCookieSettings } from "@/components/demos/cards-demo/cookie-settings";
import { CardsCreateAccount } from "@/components/demos/cards-demo/create-account";
import { CardsExerciseMinutes } from "@/components/demos/cards-demo/exercise-minutes";
import { CardsForms } from "@/components/demos/cards-demo/forms";
import { CardsPayments } from "@/components/demos/cards-demo/payments";
import { CardsReportIssue } from "@/components/demos/cards-demo/report-issue";
import { CardsShare } from "@/components/demos/cards-demo/share";
import { CardsStats } from "@/components/demos/cards-demo/stats";
import { CardsTeamMembers } from "@/components/demos/cards-demo/team-members";

export function CardsDemo() {
  return (
    <div className="@3xl:grids-col-2 grid @5xl:grid-cols-10 @7xl:grid-cols-11 @3xl:gap-4 p-2 **:data-[slot=card]:shadow-none md:p-4">
      <div className="@5xl:col-span-4 @7xl:col-span-6 grid gap-4">
        <CardsStats />
        <div className="grid @3xl:hidden @2xl:grid-cols-[auto_1fr] gap-1">
          <CardsCalendar />
          <div className="@2xl:pt-0 @2xl:pl-3 @7xl:pl-4">
            <CardsActivityGoal />
          </div>
          <div className="@2xl:col-span-2 @7xl:pt-4 pt-3">
            <CardsExerciseMinutes />
          </div>
        </div>
        <div className="grid @3xl:grid-cols-2 @5xl:grid-cols-1 @7xl:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <CardsForms />
            <CardsTeamMembers />
            <CardsCookieSettings />
          </div>
          <div className="flex flex-col gap-4 pb-4">
            <CardsCreateAccount />
            <CardsChat />
            <div className="@7xl:block hidden">
              <CardsReportIssue />
            </div>
          </div>
        </div>
      </div>
      <div className="@5xl:col-span-6 @7xl:col-span-5 flex flex-col gap-4">
        <div className="@3xl:grid hidden @2xl:grid-cols-[auto_1fr] gap-1">
          <CardsCalendar />
          <div className="@2xl:pt-0 pt-3 @2xl:pl-3 @7xl:pl-4">
            <CardsActivityGoal />
          </div>
          <div className="@2xl:col-span-2 @7xl:pt-3 pt-3">
            <CardsExerciseMinutes />
          </div>
        </div>
        <div className="@3xl:block hidden">
          <CardsPayments />
        </div>
        <CardsShare />
        <div className="@7xl:hidden">
          <CardsReportIssue />
        </div>
      </div>
    </div>
  );
}
