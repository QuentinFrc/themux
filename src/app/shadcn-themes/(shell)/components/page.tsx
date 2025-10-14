import type { Metadata } from "next";
import type { ComponentProps, ReactNode } from "react";

import { AccordionDemo } from "@/components/demos/components-demo/accordion-demo";
import { AlertDemo } from "@/components/demos/components-demo/alert-demo";
import { AlertDialogDemo } from "@/components/demos/components-demo/alert-dialog-demo";
import { AspectRatioDemo } from "@/components/demos/components-demo/aspect-ratio-demo";
import { AvatarDemo } from "@/components/demos/components-demo/avatar-demo";
import { BadgeDemo } from "@/components/demos/components-demo/badge-demo";
import { BreadcrumbDemo } from "@/components/demos/components-demo/breadcrumb-demo";
import { ButtonDemo } from "@/components/demos/components-demo/button-demo";
import { ButtonGroupDemo } from "@/components/demos/components-demo/button-group-demo";
import { CalendarDemo } from "@/components/demos/components-demo/calendar-demo";
import { CardDemo } from "@/components/demos/components-demo/card-demo";
import { CarouselDemo } from "@/components/demos/components-demo/carousel-demo";
import { ChartDemo } from "@/components/demos/components-demo/chart-demo";
import { CheckboxDemo } from "@/components/demos/components-demo/checkbox-demo";
import { CollapsibleDemo } from "@/components/demos/components-demo/collapsible-demo";
import { ComboboxDemo } from "@/components/demos/components-demo/combobox-demo";
import { CommandDemo } from "@/components/demos/components-demo/command-demo";
import { ComponentWrapper } from "@/components/demos/components-demo/component-wrapper";
import { ContextMenuDemo } from "@/components/demos/components-demo/context-menu-demo";
import { DatePickerDemo } from "@/components/demos/components-demo/date-picker-demo";
import { DialogDemo } from "@/components/demos/components-demo/dialog-demo";
import { DrawerDemo } from "@/components/demos/components-demo/drawer-demo";
import { DropdownMenuDemo } from "@/components/demos/components-demo/dropdown-menu-demo";
import { EmptyDemo } from "@/components/demos/components-demo/empty-demo";
import { FieldDemo } from "@/components/demos/components-demo/field-demo";
import { FormDemo } from "@/components/demos/components-demo/form-demo";
import { FormsDemo } from "@/components/demos/components-demo/forms-demo";
import { HoverCardDemo } from "@/components/demos/components-demo/hover-card-demo";
import { InputDemo } from "@/components/demos/components-demo/input-demo";
import { InputGroupDemo } from "@/components/demos/components-demo/input-group-demo";
import { InputOTPDemo } from "@/components/demos/components-demo/input-otp-demo";
import { ItemDemo } from "@/components/demos/components-demo/item-demo";
import { KbdDemo } from "@/components/demos/components-demo/kbd-demo";
import { LabelDemo } from "@/components/demos/components-demo/label-demo";
import { MenubarDemo } from "@/components/demos/components-demo/menubar-demo";
import { NavigationMenuDemo } from "@/components/demos/components-demo/navigation-menu-demo";
import { PaginationDemo } from "@/components/demos/components-demo/pagination-demo";
import { PopoverDemo } from "@/components/demos/components-demo/popover-demo";
import { ProgressDemo } from "@/components/demos/components-demo/progress-demo";
import { RadioGroupDemo } from "@/components/demos/components-demo/radio-group-demo";
import { ResizableDemo } from "@/components/demos/components-demo/resizable-demo";
import { ScrollAreaDemo } from "@/components/demos/components-demo/scroll-area-demo";
import { SelectDemo } from "@/components/demos/components-demo/select-demo";
import { SeparatorDemo } from "@/components/demos/components-demo/separator-demo";
import { SheetDemo } from "@/components/demos/components-demo/sheet-demo";
import { SkeletonDemo } from "@/components/demos/components-demo/skeleton-demo";
import { SliderDemo } from "@/components/demos/components-demo/slider-demo";
import { SonnerDemo } from "@/components/demos/components-demo/sonner-demo";
import { SpinnerDemo } from "@/components/demos/components-demo/spinner-demo";
import { SwitchDemo } from "@/components/demos/components-demo/switch-demo";
import { TableDemo } from "@/components/demos/components-demo/table-demo";
import { TabsDemo } from "@/components/demos/components-demo/tabs-demo";
import { TextareaDemo } from "@/components/demos/components-demo/textarea-demo";
import { ToggleDemo } from "@/components/demos/components-demo/toggle-demo";
import { ToggleGroupDemo } from "@/components/demos/components-demo/toggle-group-demo";
import { TooltipDemo } from "@/components/demos/components-demo/tooltip-demo";
import { ExternalLink } from "@/components/external-link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/wrappers";
import { getComponentName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Components",
  description: "A collection of components built with shadcn/ui.",
};

type WrapperProps = Omit<
  ComponentProps<typeof ComponentWrapper>,
  "name" | "children"
>;

type ComponentSection = {
  name: string;
  element: ReactNode;
  wrapperProps?: WrapperProps;
};

const componentSections: ComponentSection[] = [
  { name: "button", element: <ButtonDemo /> },
  { name: "button-group", element: <ButtonGroupDemo /> },
  {
    name: "form",
    element: (
      <div className="grid gap-6 lg:grid-cols-2">
        <FormsDemo />
        <FormDemo />
      </div>
    ),
  },
  { name: "field", element: <FieldDemo /> },
  { name: "calendar", element: <CalendarDemo /> },
  {
    name: "chart",
    element: <ChartDemo />,
    wrapperProps: { className: "w-full" },
  },
  { name: "input", element: <InputDemo /> },
  { name: "input-group", element: <InputGroupDemo /> },
  { name: "input-otp", element: <InputOTPDemo /> },
  { name: "label", element: <LabelDemo /> },
  { name: "accordion", element: <AccordionDemo /> },
  { name: "alert", element: <AlertDemo /> },
  { name: "alert-dialog", element: <AlertDialogDemo /> },
  { name: "aspect-ratio", element: <AspectRatioDemo /> },
  { name: "avatar", element: <AvatarDemo /> },
  { name: "badge", element: <BadgeDemo /> },
  { name: "breadcrumb", element: <BreadcrumbDemo /> },
  { name: "card", element: <CardDemo /> },
  { name: "carousel", element: <CarouselDemo /> },
  { name: "checkbox", element: <CheckboxDemo /> },
  { name: "collapsible", element: <CollapsibleDemo /> },
  { name: "combobox", element: <ComboboxDemo /> },
  { name: "command", element: <CommandDemo /> },
  { name: "context-menu", element: <ContextMenuDemo /> },
  { name: "date-picker", element: <DatePickerDemo /> },
  { name: "dialog", element: <DialogDemo /> },
  { name: "drawer", element: <DrawerDemo /> },
  { name: "dropdown-menu", element: <DropdownMenuDemo /> },
  { name: "hover-card", element: <HoverCardDemo /> },
  { name: "menubar", element: <MenubarDemo /> },
  { name: "navigation-menu", element: <NavigationMenuDemo /> },
  { name: "pagination", element: <PaginationDemo /> },
  { name: "popover", element: <PopoverDemo /> },
  { name: "progress", element: <ProgressDemo /> },
  { name: "radio-group", element: <RadioGroupDemo /> },
  { name: "resizable", element: <ResizableDemo /> },
  { name: "scroll-area", element: <ScrollAreaDemo /> },
  { name: "select", element: <SelectDemo /> },
  { name: "separator", element: <SeparatorDemo /> },
  { name: "sheet", element: <SheetDemo /> },
  { name: "skeleton", element: <SkeletonDemo /> },
  { name: "slider", element: <SliderDemo /> },
  { name: "sonner", element: <SonnerDemo /> },
  { name: "switch", element: <SwitchDemo /> },
  { name: "table", element: <TableDemo /> },
  { name: "tabs", element: <TabsDemo /> },
  { name: "textarea", element: <TextareaDemo /> },
  { name: "toggle", element: <ToggleDemo /> },
  { name: "toggle-group", element: <ToggleGroupDemo /> },
  { name: "tooltip", element: <TooltipDemo /> },
  { name: "kbd", element: <KbdDemo /> },
  { name: "item", element: <ItemDemo /> },
  { name: "empty", element: <EmptyDemo /> },
  { name: "spinner", element: <SpinnerDemo /> },
];

export default function ComponentsPage() {
  return (
    <>
      <ContainerWrapper className="@container" withCane>
        <SectionWrapper>
          <PageHeader>
            <PageHeaderHeading>Components dump</PageHeaderHeading>
            <PageHeaderDescription>
              <span>
                The <span className="italic">totality</span> of{" "}
                <ExternalLink
                  href="https://ui.shadcn.com/docs/components/accordion"
                  showIcon
                >
                  shadcn/ui
                </ExternalLink>{" "}
                components.
              </span>
            </PageHeaderDescription>
          </PageHeader>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper withCane>
        <nav className="scrollbar-thin -mx-4 overflow-x-auto border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/75 md:mx-0 md:rounded-t-xl">
          <div className="flex items-center gap-2">
            {componentSections.map((section) => (
              <a
                className="whitespace-nowrap rounded-md px-3 py-1 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={`#${section.name}`}
                key={section.name}
              >
                {getComponentName(section.name)}
              </a>
            ))}
          </div>
        </nav>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper withCane>
        <SectionWrapper>
          <div className="@container grid flex-1 gap-4 space-y-8">
            {componentSections.map(({ name, element, wrapperProps }) => (
              <ComponentWrapper key={name} name={name} {...wrapperProps}>
                {element}
              </ComponentWrapper>
            ))}
          </div>
        </SectionWrapper>
      </ContainerWrapper>
    </>
  );
}
